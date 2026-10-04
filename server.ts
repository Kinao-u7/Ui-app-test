import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Route 1: Generate Novel Scene or Book Cover Image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, style = 'editorial', aspectRatio = '3:4' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const enhancedPrompt = `${prompt}. Art style: ${style} aesthetic, fine art book illustration, minimalist, tactile paper grain texture, high editorial print quality, museum catalog standard.`;

    if (!ai) {
      // In case no API key is set in local environment, provide a graceful styled result
      return res.status(200).json({
        imageUrl: null,
        note: 'AI image generation requires GEMINI_API_KEY. Using preset catalog imagery.',
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: enhancedPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any || '3:4',
            imageSize: '1K',
          },
        },
      });

      let generatedImageUrl = '';
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (generatedImageUrl) {
        return res.json({ imageUrl: generatedImageUrl, prompt: enhancedPrompt });
      }

      // If text response only or no image part
      return res.json({
        imageUrl: null,
        message: 'Model returned text guidance instead of direct image raster.',
      });
    } catch (modelErr: any) {
      console.warn('Gemini 3.1 flash image failed or requires key permissions:', modelErr?.message);
      return res.status(200).json({
        imageUrl: null,
        error: modelErr?.message || 'Image generation unavailable with current model tier.',
      });
    }
  } catch (err: any) {
    console.error('API generate-image error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Route 2: Edit Existing Novel Illustration / Cover
app.post('/api/edit-image', async (req, res) => {
  try {
    const { prompt, base64Image, mimeType = 'image/png' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      return res.status(200).json({
        imageUrl: null,
        note: 'AI editing requires GEMINI_API_KEY. Using fallback editor.',
      });
    }

    try {
      const cleanBase64 = base64Image ? base64Image.replace(/^data:image\/[a-z]+;base64,/, '') : '';
      const parts: any[] = [];
      if (cleanBase64) {
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType,
          },
        });
      }
      parts.push({
        text: `Edit this artwork according to this instruction: ${prompt}. Preserve the minimalist editorial book atmosphere, elegant lighting, and fine print resolution.`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: { parts },
      });

      let editedImageUrl = '';
      const responseParts = response.candidates?.[0]?.content?.parts || [];
      for (const part of responseParts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          editedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }

      return res.json({
        imageUrl: editedImageUrl || null,
        feedback: 'Artwork refined successfully.',
      });
    } catch (err: any) {
      console.warn('Edit image error:', err?.message);
      return res.json({
        imageUrl: null,
        error: err?.message,
      });
    }
  } catch (err: any) {
    console.error('API edit-image error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Route 3: Generate scene visualization prompt from book passage
app.post('/api/scene-prompt', async (req, res) => {
  try {
    const { passage, bookTitle, author } = req.body;
    if (!passage) {
      return res.status(400).json({ error: 'Passage is required' });
    }

    if (!ai) {
      return res.json({
        visualPrompt: `A solitary wanderer on a misty Nordic shoreline, granite rocks and subtle tidal foam, muted charcoal and alabaster palette, minimalist book illustration.`,
        palette: ['#FAF8F5', '#8C827A', '#1C1917', '#9A3412'],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an editorial art director for luxury novel monographs. Given this passage from "${bookTitle || 'Novel'}" by ${author || 'Author'}:
"${passage}"
Generate a concise, evocative image generation prompt (max 35 words) suitable for an editorial book illustration in minimalist woodcut, Japanese ink wash, or 35mm neo-noir aesthetic. Return ONLY JSON: {"visualPrompt": "...", "palette": ["#hex1", "#hex2", "#hex3", "#hex4"]}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('API scene-prompt error:', err);
    return res.json({
      visualPrompt: `Minimalist architectural ocean horizon at dusk, solitary figure, high editorial contrast, fine tactile paper texture.`,
      palette: ['#FAF8F5', '#8C827A', '#1C1917', '#9A3412'],
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Folio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
