export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  coverImage: string;
  genre: string;
  rating: number;
  ratingCount: number;
  totalPages: number;
  readTime: string;
  publishedYear: number;
  publisher: string;
  progressPercent: number;
  currentChapter: number;
  synopsis: string;
  curatorNote: string;
  chapters: Chapter[];
  savedQuotes: SavedQuote[];
  audioNarrator: string;
  audioDuration: string;
  audioSampleUrl?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  isCompleted: boolean;
  isCurrent: boolean;
  content: string[];
}

export interface SavedQuote {
  id: string;
  text: string;
  chapter: string;
  page: number;
  note: string;
  color: 'amber' | 'ink' | 'sage';
  timestamp: string;
}

export const NOVEL_BOOKS: Book[] = [
  {
    id: 'solitude-by-the-sea',
    title: 'Solitude by the Sea',
    subtitle: 'A meditation on silence, granite, and the northern tides',
    author: 'Elena Vance',
    authorBio: 'Elena Vance is an architectural essayist and novelist based in the Lofoten archipelago. Winner of the 2024 Nordic Literary Prize.',
    coverImage: '/src/assets/images/novel_cover_solitude_1791115043477.jpg',
    genre: 'Nordic Fiction',
    rating: 4.9,
    ratingCount: 1840,
    totalPages: 342,
    readTime: '7h 15m',
    publishedYear: 2026,
    publisher: 'Atelier Editions · Copenhagen',
    progressPercent: 68,
    currentChapter: 3,
    audioNarrator: 'Clara Sterling (Studio Unabridged)',
    audioDuration: '8h 42m',
    synopsis: 'Perched upon the salt-scoured cliffs of Cape Lindesnes, an architect retreats to an unfinished concrete sanctuary after thirty years in metropolitan exile. As the autumn tides surge against the bedrock, she discovers a sequence of unsent letters hidden within the foundational mortar—written by the lighthouse keeper who vanished half a century earlier. A quiet masterpiece of minimalist prose and sensory stillness.',
    curatorNote: 'Selected as the Atelier Monograph of the Season for its extraordinary economy of language and reverence for negative space.',
    chapters: [
      {
        id: 1,
        title: 'The Horizon Line',
        subtitle: 'Arrival at Cape Lindesnes',
        readTime: '18 min',
        isCompleted: true,
        isCurrent: false,
        content: [
          'The road ceased where the salt began. Behind me lay six hundred miles of tarmac and the murmur of Stockholm; before me, nothing but the gray swell of the Skagerrak, folding upon itself like heavy linen.',
          'The house had no eaves. It was a single poured slab of limestone concrete, cast thirty winters ago and weathered to the color of dry bone. When the wind turned from the northwest, the glass in the southern transom hummed at forty-four hertz—the exact frequency of a cello’s lowest open string.',
          'I unloaded two crates: one of drafting ink and vellum, the other of dried oats, salt cod, and tea. In the silence of that first afternoon, even the tearing of shipping tape sounded like a gunshot across the tundra.'
        ]
      },
      {
        id: 2,
        title: 'Whispers in Granite',
        subtitle: 'Foundations and forgotten ledgers',
        readTime: '24 min',
        isCompleted: true,
        isCurrent: false,
        content: [
          'Granite does not absorb sorrow; it merely conducts cold. In the basement chamber beneath the hearth, the bedrock formed three walls, sweating mineral dampness in thin crystal veins.',
          'Between the third and fourth vertical joints of the southern pier, the mortar was soft. When I brushed it with a stiff horsehair brush, a zinc cylinder dropped into my palm with the hollow clink of old coinage.',
          'Inside lay five sheets of onionskin paper, penned in iron gall ink that had turned the shade of dried plum skin: “If the light does not sweep the water by five past the hour, do not seek me on the reefs.”'
        ]
      },
      {
        id: 3,
        title: 'Salt and Shadow',
        subtitle: 'The third storm of the equinox',
        readTime: '19 min',
        isCompleted: false,
        isCurrent: true,
        content: [
          'Dawn brought no illumination, only a lightening of the gray. The barometer in the vestibule had dropped twelve millibars between midnight and five, its brass needle shivering against the glass like a trapped moth.',
          'The sea was no longer blue or green; it was the color of lead fresh from the crucible. Each wave rose not with violence, but with the measured, terrifying weight of displaced continents.',
          '“The shoreline does not end,” I wrote in the margin of my sketchbook. “It merely yields to the swell, surrendering its edges until the tide decides what may remain.”',
          'I sat by the iron stove with a mug of chicory tea. Through the eight-millimeter pane, I watched the spray leap forty meters up the granite face, freezing into beads of crystalline brine against the glass before sliding downward like mercury.'
        ]
      },
      {
        id: 4,
        title: 'The Tides of Memory',
        subtitle: 'Reflections on what remains unsaid',
        readTime: '22 min',
        isCompleted: false,
        isCurrent: false,
        content: [
          'Memory in extreme latitudes behaves like drift ice: vast sheets that appear stationary until a thermal current splits them with the sound of snapping bone.',
          'I thought of the studio in Gamla Stan. The smell of linseed oil, the blueprints rolled in zinc tubes, the sound of rain on the copper roofs while the world hurried into the twenty-first century.',
          'Here, time was stripped of its modern scaffolding. There were only tides, wind directions, and the measured burning of birch logs in the grate.'
        ]
      },
      {
        id: 5,
        title: 'The Keeper’s Ledger',
        subtitle: 'Decoding the cipher of 1974',
        readTime: '28 min',
        isCompleted: false,
        isCurrent: false,
        content: [
          'The dates in the zinc tube were precise to the minute. October 14, 1974: wind WSW Beaufort 8; visibility half a cable; kerosene consumption four liters.',
          'And then, in the margin, a second hand had penciled three musical staves. Not notes, but coordinates expressed as intervals.'
        ]
      },
      {
        id: 6,
        title: 'Resonance of Alabaster',
        subtitle: 'Light penetrating the void',
        readTime: '20 min',
        isCompleted: false,
        isCurrent: false,
        content: [
          'On the eighth morning, the storm broke with theatrical suddenness. The cloud ceiling tore open like silk, revealing a sky of such intense ultramarine that looking at it made the temples ache.'
        ]
      },
      {
        id: 7,
        title: 'The Return to Silence',
        subtitle: 'Coda for a solitary coast',
        readTime: '16 min',
        isCompleted: false,
        isCurrent: false,
        content: [
          'To leave the coast is not to depart from the water, but to carry its rhythm within the blood until the next arrival.'
        ]
      }
    ],
    savedQuotes: [
      {
        id: 'q1',
        text: 'The shoreline does not end; it merely yields to the swell, surrendering its edges until the tide decides what may remain.',
        chapter: 'Chapter 3 · Salt and Shadow',
        page: 114,
        note: 'Stunning metaphor on impermanence and grief.',
        color: 'amber',
        timestamp: 'Today at 07:42'
      },
      {
        id: 'q2',
        text: 'When the wind turned from the northwest, the glass in the southern transom hummed at forty-four hertz—the exact frequency of a cello’s lowest open string.',
        chapter: 'Chapter 1 · The Horizon Line',
        page: 24,
        note: 'Sensory architecture. Note to self for ambient music project.',
        color: 'sage',
        timestamp: 'Yesterday'
      },
      {
        id: 'q3',
        text: 'Memory in extreme latitudes behaves like drift ice: vast sheets that appear stationary until a thermal current splits them.',
        chapter: 'Chapter 4 · The Tides of Memory',
        page: 148,
        note: 'Psychological depth of isolation.',
        color: 'ink',
        timestamp: '3 days ago'
      }
    ]
  },
  {
    id: 'the-neon-archive',
    title: 'The Neon Archive',
    subtitle: 'A speculative chronicle of rain and synthetic memory',
    author: 'Kaito Tanaka',
    authorBio: 'Kaito Tanaka writes speculative fiction and philosophical essays between Kyoto and Shinjuku.',
    coverImage: '/src/assets/images/novel_cover_cyberpunk_1791115064122.jpg',
    genre: 'Neo-Noir',
    rating: 4.8,
    ratingCount: 1420,
    totalPages: 388,
    readTime: '8h 30m',
    publishedYear: 2026,
    publisher: 'Komorebi Press · Tokyo',
    progressPercent: 32,
    currentChapter: 4,
    audioNarrator: 'Kenji Sato & Rei Aoi',
    audioDuration: '9h 15m',
    synopsis: 'In a rain-drowned Neo-Tokyo where personal memories can be pawned for digital currency, an archivist at the Ministry of Retrieval is tasked with cataloging the erased recollections of a deceased poet. What he uncovers is a clandestine rebellion written in water reflections and sub-bass resonance.',
    curatorNote: 'A visually breathtaking noir novel combining tactile Japanese aesthetic restraint with high-concept cybernetics.',
    chapters: [
      { id: 1, title: 'The Puddle Mirror', subtitle: 'Reflections in Shinjuku alleys', readTime: '21 min', isCompleted: true, isCurrent: false, content: ['The rain never struck the asphalt directly; it filtered through eight tiers of magnetic monorail tracks first.'] },
      { id: 2, title: 'Baudelaire in Silicon', subtitle: 'Retrieving the poet’s ghost', readTime: '26 min', isCompleted: true, isCurrent: false, content: ['Memory feels like warm oil when it first decodes from the phosphor canister.'] },
      { id: 3, title: 'The Frequency of Ash', subtitle: 'Sub-bass frequencies in the subway', readTime: '18 min', isCompleted: false, isCurrent: true, content: ['Underground line 14 was carved through black shale that still vibrated with the 1923 tremors.'] }
    ],
    savedQuotes: [
      {
        id: 'q4',
        text: 'To remember everything is a curse of machines; the human mind survives solely by the grace of forgetting.',
        chapter: 'Chapter 1 · The Puddle Mirror',
        page: 38,
        note: 'The fundamental thesis of Tanaka’s philosophy.',
        color: 'amber',
        timestamp: '5 days ago'
      }
    ]
  },
  {
    id: 'winter-at-fjord-station',
    title: 'Winter at Fjord Station',
    subtitle: 'Letters from the meteorological outpost at 68° North',
    author: 'Astrid Lindqvist',
    authorBio: 'Astrid Lindqvist spent three winters at the Abisko Research Station before publishing her acclaimed debut.',
    coverImage: '/src/assets/images/novel_cover_nordic_1791115078241.jpg',
    genre: 'Nordic Fiction',
    rating: 4.9,
    ratingCount: 2210,
    totalPages: 290,
    readTime: '6h 10m',
    publishedYear: 2025,
    publisher: 'Nordic Folio · Oslo',
    progressPercent: 92,
    currentChapter: 8,
    audioNarrator: 'Freja Møller',
    audioDuration: '6h 50m',
    synopsis: 'Stationed alone through the four months of polar night at an arctic weather outpost, meteorologist Sigrid Holm keeps two records: the official atmospheric readings for the meteorological bureau, and an intimate journal detailing the subtle companionship of raven cries and shifting ice pack dynamics.',
    curatorNote: 'Sublime, e-ink quietude. One of the most tranquil reading experiences of modern Scandinavian literature.',
    chapters: [
      { id: 1, title: 'The Sun’s Departure', subtitle: 'November 22nd, noon', readTime: '15 min', isCompleted: true, isCurrent: false, content: ['The sun dipped below the southern ridge at 11:47 AM and did not return.'] },
      { id: 2, title: 'Forty Shades of Frost', subtitle: 'Hoarfrost crystals on birch branches', readTime: '19 min', isCompleted: true, isCurrent: false, content: ['Rime frost forms differently depending on wind velocity: feathery at three knots, needle-sharp at twelve.'] }
    ],
    savedQuotes: [
      {
        id: 'q5',
        text: 'In the dark, sight ceases to be dominant, and the ear inherits the entire geography of the fjord.',
        chapter: 'Chapter 2 · Forty Shades of Frost',
        page: 62,
        note: 'Beautiful sensory transformation.',
        color: 'sage',
        timestamp: 'Last week'
      }
    ]
  },
  {
    id: 'the-secret-greenhouse',
    title: 'The Secret Greenhouse',
    subtitle: 'Botany, solitude, and celestial alignments in Kyoto',
    author: 'Ren Murasawa',
    authorBio: 'Ren Murasawa is a botanist and essayist tending the historic botanical greenhouse in northern Kyoto.',
    coverImage: '/src/assets/images/novel_cover_botanical_1791115095106.jpg',
    genre: 'Japanese Modern',
    rating: 4.7,
    ratingCount: 960,
    totalPages: 310,
    readTime: '6h 40m',
    publishedYear: 2026,
    publisher: 'Washi House · Kyoto',
    progressPercent: 15,
    currentChapter: 2,
    audioNarrator: 'Haruto Takahashi',
    audioDuration: '7h 20m',
    synopsis: 'Inside a glass pavilion built in the Meiji era on the slopes of Mount Hiei, an elderly botanist cultivates specimens that bloom exclusively under the lunar phase of the autumn equinox. When an architectural apprentice arrives to restore the iron framework, an unspoken generational bond blooms among rare ferns and steamed humidity.',
    curatorNote: 'A masterclass in wabi-sabi aesthetics, botanical poetry, and human tenderness.',
    chapters: [
      { id: 1, title: 'The Glass Pavilion at Dusk', subtitle: 'Mount Hiei foothills', readTime: '17 min', isCompleted: true, isCurrent: false, content: ['The temperature inside the glass dome was always five degrees warmer than the autumn mountain air outside.'] },
      { id: 2, title: 'Night-Blooming Jasmine', subtitle: 'Under the waxing crescent', readTime: '23 min', isCompleted: false, isCurrent: true, content: ['Some flowers do not waste their perfume on daylight creatures.'] }
    ],
    savedQuotes: [
      {
        id: 'q6',
        text: 'A plant does not hurry to blossom; it simply waits for the light to agree with its nature.',
        chapter: 'Chapter 1 · The Glass Pavilion',
        page: 19,
        note: 'Patience and presence.',
        color: 'amber',
        timestamp: '2 weeks ago'
      }
    ]
  },
  {
    id: 'the-architecture-of-silence',
    title: 'The Architecture of Silence',
    subtitle: 'Monastic spaces and the acoustics of pure stone',
    author: 'Maya Linnea',
    authorBio: 'Maya Linnea is a Finnish architectural historian and writer specializing in minimalist spaces.',
    coverImage: '/src/assets/images/novel_cover_nordic_1791115078241.jpg',
    genre: 'Nordic Fiction',
    rating: 4.9,
    ratingCount: 1530,
    totalPages: 278,
    readTime: '5h 45m',
    publishedYear: 2026,
    publisher: 'Suomi Folio · Helsinki',
    progressPercent: 45,
    currentChapter: 3,
    audioNarrator: 'Eeva Laakso',
    audioDuration: '6h 10m',
    synopsis: 'A deep, lyrical reflection on structural quietude, following an architect who restores an abandoned stone abbey in central Finland. She discovers how deliberate masonry proportions shape human contemplation.',
    curatorNote: 'A profound exploration of soundlessness and stone geometry.',
    chapters: [
      { id: 1, title: 'Vaulted Limestone', subtitle: 'The first acoustic survey', readTime: '16 min', isCompleted: true, isCurrent: false, content: ['Sound behaves differently in limestone than in granite; it lingers like smoke against curved ribbing.'] },
      { id: 2, title: 'Echoes of the Climax', subtitle: 'Measuring residual resonance', readTime: '20 min', isCompleted: true, isCurrent: false, content: ['A solitary footstep in the cloister takes four seconds to dissipate into dust.'] },
      { id: 3, title: 'The Silent Arch', subtitle: 'Restoring the northern nave', readTime: '19 min', isCompleted: false, isCurrent: true, content: ['Stone does not remember words, but it remembers weight and stillness.'] }
    ],
    savedQuotes: []
  },
  {
    id: 'the-tea-masters-ledger',
    title: 'The Tea Master’s Ledger',
    subtitle: 'Wabi-sabi aesthetics and seventeenth-century secrets',
    author: 'Soseki Endo',
    authorBio: 'Soseki Endo studies traditional tea aesthetics and classical calligraphy in Uji.',
    coverImage: '/src/assets/images/novel_cover_botanical_1791115095106.jpg',
    genre: 'Japanese Modern',
    rating: 4.8,
    ratingCount: 1120,
    totalPages: 320,
    readTime: '7h 00m',
    publishedYear: 2025,
    publisher: 'Kiyomizu Editions · Kyoto',
    progressPercent: 78,
    currentChapter: 5,
    audioNarrator: 'Tatsuya Mori',
    audioDuration: '7h 40m',
    synopsis: 'Discovered inside a charcoal brazier in an old tearoom, a handwritten ledger from 1684 describes the exact rituals of seven masters who met during times of political turmoil to converse entirely through tea bowls.',
    curatorNote: 'Tactile and mesmerizingly calm.',
    chapters: [
      { id: 1, title: 'The Sound of Iron Kettle Water', subtitle: 'Wind in the pines', readTime: '14 min', isCompleted: true, isCurrent: false, content: ['In the tea ceremony, the sound of water heating in the釜 resembles wind moving through cedar branches.'] },
      { id: 2, title: 'Rough Clay and Gold Leaf', subtitle: 'Kintsugi meditations', readTime: '18 min', isCompleted: true, isCurrent: false, content: ['The fracture is not concealed; it is illuminated with lacquer and powdered gold.'] }
    ],
    savedQuotes: []
  },
  {
    id: 'pale-blue-geometry',
    title: 'Pale Blue Geometry',
    subtitle: 'A neo-noir inquiry into forgotten blueprints',
    author: 'Julian Vance',
    authorBio: 'Julian Vance is a speculative fiction writer and former sound designer.',
    coverImage: '/src/assets/images/novel_cover_cyberpunk_1791115064122.jpg',
    genre: 'Neo-Noir',
    rating: 4.7,
    ratingCount: 890,
    totalPages: 360,
    readTime: '7h 50m',
    publishedYear: 2026,
    publisher: 'Monolith Press · Berlin',
    progressPercent: 20,
    currentChapter: 2,
    audioNarrator: 'Marcus Holt',
    audioDuration: '8h 15m',
    synopsis: 'In an alternate 1980s metropolis where brutalist towers house automated drafting computers, a retired cartographer tracks down the elusive architect of a building that exists on municipal plans but cannot be found on any street.',
    curatorNote: 'Intriguing, moody, and conceptually sharp.',
    chapters: [
      { id: 1, title: 'The Missing Parcel', subtitle: 'Municipal archive sub-basement', readTime: '22 min', isCompleted: true, isCurrent: false, content: ['Every blueprint was inked in indigo on heavy vellum that smelled of ammonia and cold tea.'] },
      { id: 2, title: 'Vector Grid 09', subtitle: 'Walking the phantom coordinates', readTime: '25 min', isCompleted: false, isCurrent: true, content: ['Where the map showed a twelve-story tower of fluted concrete, there was only a paved vacant lot.'] }
    ],
    savedQuotes: []
  },
  {
    id: 'the-paper-cartographer',
    title: 'The Paper Cartographer',
    subtitle: 'Fjord maps, compass rose engravings, and lost islands',
    author: 'Hannele Lind',
    authorBio: 'Hannele Lind is an essayist and printmaker living in Tromsø.',
    coverImage: '/src/assets/images/novel_cover_solitude_1791115043477.jpg',
    genre: 'Nordic Fiction',
    rating: 4.9,
    ratingCount: 1670,
    totalPages: 298,
    readTime: '6h 20m',
    publishedYear: 2026,
    publisher: 'Boreal Print · Tromsø',
    progressPercent: 55,
    currentChapter: 3,
    audioNarrator: 'Signe Berggren',
    audioDuration: '6h 45m',
    synopsis: 'A mesmerizing tale of copperplate engraving in the Norwegian arctic, where a family of cartographers dedicated four generations to mapping shifting coastlines and vanishing ice reefs.',
    curatorNote: 'Delicate sensory prose and cartographic fascination.',
    chapters: [
      { id: 1, title: 'Copper and Acid', subtitle: 'The printmaker’s workshop', readTime: '17 min', isCompleted: true, isCurrent: false, content: ['Engraving an arctic fjord into polished copper requires a steady wrist and the patient breath of a diver.'] },
      { id: 2, title: 'Tidal Drift at Sørøya', subtitle: 'Sounding the shallow waters', readTime: '21 min', isCompleted: true, isCurrent: false, content: ['The lead line splashed into the black sea, its hemp rope knotted every fathom.'] }
    ],
    savedQuotes: []
  },
  {
    id: 'the-obsidian-monograph',
    title: 'The Obsidian Monograph',
    subtitle: 'Notes on volcanic glass, silence, and memory',
    author: 'Erik Thorsen',
    authorBio: 'Erik Thorsen is an Icelandic geologist and philosopher.',
    coverImage: '/src/assets/images/novel_cover_nordic_1791115078241.jpg',
    genre: 'Nordic Fiction',
    rating: 4.8,
    ratingCount: 1340,
    totalPages: 312,
    readTime: '6h 30m',
    publishedYear: 2025,
    publisher: 'Reykjavik Folio · Reykjavik',
    progressPercent: 88,
    currentChapter: 6,
    audioNarrator: 'Jon Arnalds',
    audioDuration: '7h 10m',
    synopsis: 'Following the 2024 volcanic fissure in Reykjanes, a solitary thinker examines how obsidian mirrors human interiority when polished by volcanic dust and freezing rain.',
    curatorNote: 'A poetic fusion of earth sciences and introspective philosophy.',
    chapters: [
      { id: 1, title: 'Black Glass Plains', subtitle: 'The edge of the cooling flow', readTime: '15 min', isCompleted: true, isCurrent: false, content: ['Obsidian cools so quickly that mineral crystals have no time to form; it is liquid frozen in instantaneous panic.'] },
      { id: 2, title: 'Vitreous Luster', subtitle: 'Reflections under winter skies', readTime: '18 min', isCompleted: true, isCurrent: false, content: ['Looking into a fractured edge of black basalt is like peering into a pool of black ink that never dries.'] }
    ],
    savedQuotes: []
  }
];

export interface ReaderTheme {
  id: 'alabaster' | 'oled' | 'sepia' | 'forest';
  name: string;
  bgClass: string;
  textClass: string;
  secondaryTextClass: string;
  borderClass: string;
  accentClass: string;
  activeIndicator: string;
  hexBg: string;
  hexText: string;
}

export const READER_THEMES: Record<string, ReaderTheme> = {
  alabaster: {
    id: 'alabaster',
    name: 'Alabaster Paper',
    bgClass: 'bg-[#FBF9F5]',
    textClass: 'text-[#1C1917]',
    secondaryTextClass: 'text-[#78716C]',
    borderClass: 'border-[#E7E5E4]',
    accentClass: 'text-[#9A3412]',
    activeIndicator: 'bg-[#1C1917]',
    hexBg: '#FBF9F5',
    hexText: '#1C1917'
  },
  oled: {
    id: 'oled',
    name: 'Tokyo Night OLED',
    bgClass: 'bg-[#08080A]',
    textClass: 'text-[#E5E5E7]',
    secondaryTextClass: 'text-[#8E8E93]',
    borderClass: 'border-[#26262B]',
    accentClass: 'text-[#F97316]',
    activeIndicator: 'bg-[#F5F5F7]',
    hexBg: '#08080A',
    hexText: '#E5E5E7'
  },
  sepia: {
    id: 'sepia',
    name: 'Archival Sepia Linen',
    bgClass: 'bg-[#F4EEDD]',
    textClass: 'text-[#2B2620]',
    secondaryTextClass: 'text-[#7D7566]',
    borderClass: 'border-[#DECDB2]',
    accentClass: 'text-[#854D0E]',
    activeIndicator: 'bg-[#2B2620]',
    hexBg: '#F4EEDD',
    hexText: '#2B2620'
  },
  forest: {
    id: 'forest',
    name: 'Forest Dusk',
    bgClass: 'bg-[#0E1715]',
    textClass: 'text-[#DDE7E4]',
    secondaryTextClass: 'text-[#7D918B]',
    borderClass: 'border-[#1E2D29]',
    accentClass: 'text-[#34D399]',
    activeIndicator: 'bg-[#DDE7E4]',
    hexBg: '#0E1715',
    hexText: '#DDE7E4'
  }
};
