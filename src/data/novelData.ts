export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  readTime: string;
  isCompleted: boolean;
  isCurrent: boolean;
  content: string[];
  translatorNote?: string;
  wordCount?: number;
  releasedAt?: string;
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

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  coverImage: string;
  genre: string;
  novelType: 'Web Novel' | 'Light Novel';
  status: 'Ongoing' | 'Completed' | 'Hiatus';
  source: string;
  originalLanguage: string;
  translator?: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  totalPages: number;
  totalChapters: number;
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

export const NOVEL_BOOKS: Book[] = [
  {
    id: 'a-dream-through-a-thousand-years',
    title: 'A Dream Through a Thousand Years',
    subtitle: 'He was a vessel kept by the demoness; she was an immortal sword master',
    author: 'Xian Yu Lao Bai',
    authorBio: 'Veteran Xianxia and Eastern Fantasy author with over 150 million online views on Qidian and Wuxiaworld.',
    coverImage: '/src/assets/images/novel_cover_solitude_1791115043477.jpg',
    genre: 'Xianxia & Cultivation',
    novelType: 'Web Novel',
    status: 'Ongoing',
    source: 'WTR-LAB / Wuxiaworld',
    originalLanguage: 'Chinese (CN)',
    translator: 'Immortal Pavilion Translation',
    tags: ['Cultivation', 'Sword Immortal', 'Martial Arts', 'Demoness', 'Transmigration', 'Ancient Sects'],
    rating: 4.9,
    ratingCount: 14280,
    totalPages: 840,
    totalChapters: 266,
    readTime: '38h 45m',
    publishedYear: 2026,
    publisher: 'WTR-LAB Online Serials',
    progressPercent: 42,
    currentChapter: 3,
    audioNarrator: 'Audio Cultivator Studio (Unabridged)',
    audioDuration: '44h 12m',
    synopsis: 'He was a mortal vessel kept within the secluded pavilion of a demonic matriarch, his lifespan hanging by a fragile thread. She was a supreme sword immortal who fell in battle against the heavenly tribulation a thousand years ago, dwelling inside his spirit sea as a dormant soul fragment. When an ancient seal shatters during the blood moon, their mutual survival forces an unprecedented dual-cultivation pact across the realms of mortals, immortals, and nether demons.',
    curatorNote: 'Ranked #1 on Wuxiaworld Weekly Progression chart for its breathtaking sword dao choreography and emotionally grounded cultivation philosophy.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Vessel and the Demoness',
        subtitle: 'Pavilion of Red Lotus',
        readTime: '12 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3120,
        releasedAt: '2026-03-01',
        translatorNote: 'Note: "Vessel" (炉鼎 - Lú Dǐng) refers to a cultivator used as an energetic conduit. The term carries deep daoist alchemical roots.',
        content: [
          'The scent of crimson lotus incense always preceded the mist.',
          'Fang Yuan sat cross-legged upon the cold black jade pedestal. In his meridians, thirty-six drops of spirit dew condensed and dispersed like falling rain, evaporating against the demonic chill that emanated from the grand hall.',
          'Across the gossamer curtain, the demoness tilted her jade flagon. Her voice was like bells chiming in a winter canyon: "Little vessel, do you know how many days remain before your golden core crumbles?"',
          'Fang Yuan kept his eyes closed, feeling the faint, ancient resonance stirring within the deepest crevice of his sea of consciousness.'
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The Whispering Ancient Sword',
        subtitle: 'A thousand years of slumber',
        readTime: '15 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3450,
        releasedAt: '2026-03-03',
        translatorNote: 'Sword Intent (剑意 - Jiàn Yì): The spiritual manifestation of a swordmaster’s comprehension of the heavenly laws.',
        content: [
          'It was not a voice of flesh, but a ripple of cold steel.',
          '“Mortal boy,” the voice echoed from the bottom of his spirit sea, crisp as ice snapping under boot heels. “Your meridian network is constructed like a sieve, yet your soul root has absorbed three thousand strikes of heavenly lightning without shattering.”',
          'Fang Yuan drew a breath of freezing air into his dantian. “And who might Senior be?”',
          'A phantom of pristine white robes materialized within the vortex of his thoughts, eyes reflecting countless falling stars. “A thousand years ago, the nine provinces called me the Autumn Water Immortal. Now, draw your wooden stick. Today, I teach you how to cut the wind.”'
        ]
      },
      {
        id: 3,
        title: 'Chapter 3: Severing the Silver River',
        subtitle: 'First breakthrough of the Nine Heavens',
        readTime: '18 min',
        isCompleted: false,
        isCurrent: true,
        wordCount: 3890,
        releasedAt: '2026-03-05',
        translatorNote: 'Dantian (丹田): The energetic reservoir below the navel where true Qi gathers and refines.',
        content: [
          'The night of the silver moon arrived without warning.',
          'Outside the pavilion, the waterfall roared down the five-thousand-foot precipice of Mount Cangwu. Fang Yuan stood barefoot upon the mossy stone edge, holding only a branch of mountain pine stripped of needles.',
          '“Do not circulate the demonic Qi,” Autumn Water whispered behind his shoulder, her spiritual silhouette glowing like frosted moonlight. “True sword dao does not rely on worldly essence; it relies on the stillness between your heartbeats.”',
          'He closed his eyes. The rushing torrent ceased to sound like water; it sounded like millions of crystal needles striking the earth in harmony.',
          'When he swung the pine branch, not a leaf stirred on the riverbank. Yet fifty paces away, the roaring cataract split cleanly down the center, severed for the span of three breaths.'
        ]
      },
      {
        id: 4,
        title: 'Chapter 4: The Demonic Sect’s Trial',
        subtitle: 'Blood arena beneath Mount Cangwu',
        readTime: '16 min',
        isCompleted: false,
        isCurrent: false,
        wordCount: 3620,
        releasedAt: '2026-03-08',
        content: [
          'Three hundred inner disciples gathered around the Obsidian Cauldron.',
          'The sect elders sat high upon bone-carved thrones, their aura pressing down like granite mountains.',
          'Fang Yuan stepped into the circle. He wore coarse hemp robes, without talismans or spirit stones, but his posture was straight as an unsheathed blade.'
        ]
      },
      {
        id: 5,
        title: 'Chapter 5: Tribulation of the Nine Moons',
        subtitle: 'Awakening the celestial sword spirit',
        readTime: '20 min',
        isCompleted: false,
        isCurrent: false,
        wordCount: 4100,
        releasedAt: '2026-03-12',
        content: [
          'Thunder rolled across the nine peaks without a speck of rain.',
          'Purple lightning snaked across the clouds, illuminating the ancient characters etched into Fang Yuan’s shoulder blades.'
        ]
      }
    ],
    savedQuotes: [
      {
        id: 'q-w1',
        text: 'True sword dao does not rely on worldly essence; it relies on the stillness between your heartbeats.',
        chapter: 'Chapter 3 · Severing the Silver River',
        page: 78,
        note: 'Autumn Water’s foundational sword theory.',
        color: 'amber',
        timestamp: 'Today at 02:14'
      },
      {
        id: 'q-w2',
        text: 'Granite can endure ten thousand years of rain, but a cultivator’s dao heart can split the heavens in a single breath.',
        chapter: 'Chapter 2 · The Whispering Ancient Sword',
        page: 44,
        note: 'The spirit sea awakening dialogue.',
        color: 'sage',
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: 'soul-land-seven-evolutions',
    title: 'Soul Land: Seven Evolutions of the Martial Soul',
    subtitle: 'Awakening the Xuan Tie Spear in a world of spirit masters',
    author: 'Jiu Jie Bi Mo',
    authorBio: 'Prolific web serialist specializing in Douluo and Soul Land fan-continuation novels with millions of reader recommendations.',
    coverImage: '/src/assets/images/novel_cover_cyberpunk_1791115064122.jpg',
    genre: 'Transmigration & Xianxia',
    novelType: 'Web Novel',
    status: 'Ongoing',
    source: 'Qidian Webnovel',
    originalLanguage: 'Chinese (CN)',
    translator: 'Silver Spear Translations',
    tags: ['Transmigration', 'Soul Land', 'Cultivation', 'Male Protagonist', 'Overpowered MC', 'Action'],
    rating: 4.8,
    ratingCount: 11950,
    totalPages: 560,
    totalChapters: 80,
    readTime: '22h 30m',
    publishedYear: 2026,
    publisher: 'Qidian Online Literature',
    progressPercent: 100,
    currentChapter: 80,
    audioNarrator: 'Master Xuan Narrations',
    audioDuration: '28h 15m',
    synopsis: 'Lu Yuan transmigrated into the mythical continent of Soul Land, awakening what was believed to be an ordinary Xuan Tie Spear martial soul with innate half-rank soul power. While the great sects dismissed him as common stock, he unlocked an ancient evolutionary tablet that allowed his martial spirit to absorb divine tribulation metal and undergo seven celestial metamorphoses—starting by rewriting the destiny of the Seraphic Empress Qian Renxue.',
    curatorNote: 'Fast-paced, satisfying martial soul progression with deep tactical spirit ring combinations and loyal party mechanics.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Iron Spear in the Village',
        subtitle: 'Awakening ceremony at the Spirit Hall temple',
        readTime: '14 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3100,
        releasedAt: '2026-02-10',
        content: [
          'The black crystal orb gave off only a faint, flickering glimmer.',
          '“Innate soul power: rank one-half. Martial soul: Xuan Tie Spear,” the Grandmaster sighed, recording the marks onto the parchment with routine indifference.',
          'Lu Yuan gripped the three-foot rod of dark pitted iron in his palm. It was heavy, frigid, and entirely devoid of light. Yet inside his marrow, seven golden runes hummed like war drums.'
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The First Hundred-Year Spirit Beast',
        subtitle: 'Hunting in the Hunting Forest',
        readTime: '17 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3500,
        releasedAt: '2026-02-14',
        content: [
          'The Armored Iron Hog roared, its tusks glistening with yellow soul aura.',
          'Lu Yuan did not evade. He planted his back foot into the loam, leveled the spear, and channeled the first rune.'
        ]
      },
      {
        id: 3,
        title: 'Chapter 3: The First Metamorphosis',
        subtitle: 'Crimson thunder fuses into the spearhead',
        readTime: '19 min',
        isCompleted: true,
        isCurrent: true,
        wordCount: 3820,
        releasedAt: '2026-02-18',
        content: [
          'The yellow spirit ring shattered into liquid sunlight, spiraling up the shaft of the iron spear.',
          'Cracks spider-webbed across the black metal, peeling away slag to reveal a core of gleaming celestial platinum.'
        ]
      }
    ],
    savedQuotes: [
      {
        id: 'q-sl1',
        text: 'There are no trash martial souls in this world, only spirits that have yet to meet their true divine fire.',
        chapter: 'Chapter 1 · The Iron Spear in the Village',
        page: 22,
        note: 'Lu Yuan’s declaration at Spirit Hall.',
        color: 'amber',
        timestamp: '3 days ago'
      }
    ]
  },
  {
    id: 'solo-rebirth-abyssal-monarch',
    title: 'Solo Rebirth: The Abyssal Monarch',
    subtitle: 'Awakened as an F-Rank Porter, crowned sovereign of the undead',
    author: 'Min-Woo Kang',
    authorBio: 'Top Korean webtoon and webnovel writer behind three runaway hits on Munpia and KakaoPage.',
    coverImage: '/src/assets/images/novel_cover_nordic_1791115078241.jpg',
    genre: 'LitRPG & Dungeon System',
    novelType: 'Web Novel',
    status: 'Ongoing',
    source: 'Munpia / Webnovel',
    originalLanguage: 'Korean (KR)',
    translator: 'Hunter Scans Guild',
    tags: ['LitRPG', 'System', 'Dungeon', 'Necromancer', 'Solo Leveling', 'Ranker', 'Monarch'],
    rating: 4.9,
    ratingCount: 19800,
    totalPages: 980,
    totalChapters: 412,
    readTime: '42h 10m',
    publishedYear: 2025,
    publisher: 'Munpia Web Serials · Seoul',
    progressPercent: 55,
    currentChapter: 42,
    audioNarrator: 'David Cho (Dual Voice Edition)',
    audioDuration: '48h 00m',
    synopsis: 'Ten years after the Great Cataclysm opened blue dimensional gates across modern Seoul, Jin-Hyeok was relegated to carrying baggage for elite assault guilds as an unranked F-Class porter. When his raid party betrays him to trigger the boss trap inside a double-dungeon subterranean temple, he receives a glitching system notification: [Conditions met: You have died without renouncing your greed. Hidden Class: "Abyssal Monarch" unlocked].',
    curatorNote: 'Adrenaline-fueled progression with crisp stat screens, tactical shadow legion battles, and satisfying dungeon economics.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Luggage of the Discarded',
        subtitle: 'Seoul Subterranean Gate 04',
        readTime: '15 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3200,
        releasedAt: '2025-11-01',
        content: [
          '[System: Entering Rank-C Dungeon "Temple of the Weeping Monarch".]',
          'The bag weighed fifty kilograms. Mana potions, spare steel bucklers, and emergency rations for the Gold-rank vanguards.',
          'Jin-Hyeok adjusted his canvas straps. Behind him, the raid leader sneered: "Hey, Porter! If you fall behind, we aren’t coming back for you."'
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The Double Dungeon Trap',
        subtitle: 'When the stone statues smile',
        readTime: '18 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3600,
        releasedAt: '2025-11-04',
        content: [
          'The heavy stone doors slammed shut with hydraulic finality.',
          'The torchlight turned from orange to eerie sapphire.',
          '[Warning: High-Tier Entity "Lord of Shadows" has awakened.]',
          'Before the screams began, the Gold-rank leader dashed forward, slamming Jin-Hyeok onto the pressure plate to buy three seconds of escape.'
        ]
      },
      {
        id: 3,
        title: 'Chapter 3: Arise from the Ash',
        subtitle: 'The first shadow soldier',
        readTime: '21 min',
        isCompleted: false,
        isCurrent: true,
        wordCount: 4200,
        releasedAt: '2025-11-08',
        content: [
          '[Status: HP 0 / 120]',
          '[Player is deceased.]',
          '[Error code: Soul core refuses dissolution.]',
          '[Inheritance protocol initiated: The Throne of the Abyss recognizes your defiance.]',
          'Jin-Hyeok opened his eyes. The world was no longer gray stone and blood. It was shrouded in tendrils of violet flame.',
          'He reached out toward the severed corpse of the dungeon beast. A single whisper broke the silence:',
          '“Arise.”'
        ]
      }
    ],
    savedQuotes: [
      {
        id: 'q-kr1',
        text: 'The world gave me an F-Rank certificate; death gave me an empire.',
        chapter: 'Chapter 3 · Arise from the Ash',
        page: 54,
        note: 'The monarch’s awakening line.',
        color: 'ink',
        timestamp: '4 days ago'
      }
    ]
  },
  {
    id: 'reincarnated-alchemist-slow-life',
    title: 'The Reincarnated Alchemist’s Royal Slow Life',
    subtitle: 'Brewing potions, tending greenhouse spirits, and living quietly',
    author: 'Ren Murasawa',
    authorBio: 'Bestselling Japanese light novelist and web novel author on Syosetu (Shousetsuka ni Narou) with multiple anime adaptations.',
    coverImage: '/src/assets/images/novel_cover_botanical_1791115095106.jpg',
    genre: 'Isekai & Slice of Life',
    novelType: 'Light Novel',
    status: 'Ongoing',
    source: 'Syosetu / Baka-Tsuki',
    originalLanguage: 'Japanese (JP)',
    translator: 'Moonlight Novel Guild',
    tags: ['Isekai', 'Crafting', 'Slow Life', 'Alchemy', 'Magic', 'Light Novel', 'Cozy Fantasy'],
    rating: 4.8,
    ratingCount: 8900,
    totalPages: 410,
    totalChapters: 184,
    readTime: '18h 20m',
    publishedYear: 2026,
    publisher: 'Kiyomizu Bunko · Kyoto',
    progressPercent: 30,
    currentChapter: 6,
    audioNarrator: 'Yui Ishikawa & Haruto S.',
    audioDuration: '20h 30m',
    synopsis: 'After collapsing from overwork at an urban chemistry firm, Kenichi awakens in the body of an apprentice alchemist in the tranquil royal province of Lunaria. Blessed with the unique skill [Item Appraisal & Plant Whisperer], he politely declines an invitation to join the Hero’s war party and instead renovates an abandoned greenhouse on the imperial palace outskirts, brewing top-tier restorative teas and befriending shy dryads.',
    curatorNote: 'The ultimate comforting, warm-blanket light novel. Exquisite botanical illustrations and heartwarming culinary alchemy.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Glass Pavilion and Moonlit Thyme',
        subtitle: 'Waking up in Lunaria',
        readTime: '13 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 2800,
        releasedAt: '2026-01-15',
        content: [
          'The first thing Kenichi noticed was that his back didn’t ache from twelve hours in front of spreadsheet monitors.',
          'The second thing was that the air smelled delightfully of dried chamomile, damp cedar, and morning sun.'
        ]
      },
      {
        id: 2,
        title: 'Chapter 2: The High Knight’s Sore Throat',
        subtitle: 'Honey-infused eucalyptus elixir',
        readTime: '16 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3100,
        releasedAt: '2026-01-19',
        content: [
          'The commander of the Royal Guard stood over two meters tall in polished steel plate, yet she was coughing like a distressed sparrow.',
          '“Alchemist,” she growled hoarsely. “Give me whatever draught stops this madness.”'
        ]
      }
    ],
    savedQuotes: [
      {
        id: 'q-ln1',
        text: 'A potion brewed in hurry heals only the flesh; a tea steeped in patience soothes the tired soul.',
        chapter: 'Chapter 1 · The Glass Pavilion',
        page: 32,
        note: 'Kenichi’s golden rule of slow life.',
        color: 'sage',
        timestamp: '1 week ago'
      }
    ]
  },
  {
    id: 'cradle-of-the-primal-wyrm',
    title: 'Cradle of the Primal Wyrm',
    subtitle: 'From a broken core to the pinnacle of dragon-vein cultivation',
    author: 'A. E. Sterling',
    authorBio: 'High fantasy author and Royal Road top-ranked serialist with over 40 million page views.',
    coverImage: '/src/assets/images/novel_cover_solitude_1791115043477.jpg',
    genre: 'Progression Fantasy',
    novelType: 'Web Novel',
    status: 'Ongoing',
    source: 'Royal Road',
    originalLanguage: 'English (EN)',
    translator: 'Original English Serial',
    tags: ['Progression Fantasy', 'Dragon', 'Magic Academy', 'Weak to Strong', 'Hard Magic System', 'Royal Road'],
    rating: 4.9,
    ratingCount: 16500,
    totalPages: 720,
    totalChapters: 350,
    readTime: '34h 15m',
    publishedYear: 2026,
    publisher: 'Royal Road Premium',
    progressPercent: 70,
    currentChapter: 12,
    audioNarrator: 'Travis Baldree (Studio Master)',
    audioDuration: '36h 40m',
    synopsis: 'Born in the outer rim of the Caldera with a fractured mana heart, Nicholas was destined to live as a copper-tier miner. But when an ancient volcanic eruption unearths the dormant fossil of a Primal Wyrm, his broken channels drink the molten dragon marrow. Armed with a hard-magic circulation system and an unyielding will, he enrolls into the Imperial Sky Academy to challenge the aristocratic bloodlines.',
    curatorNote: 'Beloved by Royal Road readers for its intricate mana-vein theory, intense tournament arcs, and genuine dragon lore.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Broken Core of the Caldera',
        subtitle: 'Slag and dreams',
        readTime: '16 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3400,
        releasedAt: '2026-02-01',
        content: [
          'In the Caldera, mana was not a gift of the stars; it was a volcanic fever that either hardened your bones or burned you to cinder.'
        ]
      }
    ],
    savedQuotes: []
  },
  {
    id: 'i-became-the-villainess-clockwork',
    title: 'I Became the Villainess of the Clockwork Empire',
    subtitle: 'Rewriting execution flags with steam engines and political intrigue',
    author: 'Eleanor Saint-Claire',
    authorBio: 'Specializes in historical fantasy, otome isekai webnovels, and Victorian steampunk romance.',
    coverImage: '/src/assets/images/novel_cover_botanical_1791115095106.jpg',
    genre: 'Otome Isekai & Romance',
    novelType: 'Light Novel',
    status: 'Completed',
    source: 'KakaoPage / J-Novel Club',
    originalLanguage: 'Japanese (JP)',
    translator: 'Rose Quartz Translations',
    tags: ['Villainess', 'Otome Game', 'Steampunk', 'Noble Court', 'Romance', 'Completed', 'Strong Female Lead'],
    rating: 4.8,
    ratingCount: 13200,
    totalPages: 480,
    totalChapters: 165,
    readTime: '24h 10m',
    publishedYear: 2025,
    publisher: 'Empress Editions · Tokyo',
    progressPercent: 100,
    currentChapter: 165,
    audioNarrator: 'Laura Bailey & Cast',
    audioDuration: '26h 00m',
    synopsis: 'Waking up inside the otome game "Gears of Versailles" as Lady Vivienne, the notorious aristocratic villainess scheduled for execution by the guillotine in Chapter 5, our reincarnated modern engineer decides to abandon romance altogether. She patents the multi-stage steam condenser, buys half the industrial sector, and makes herself too economically vital for the Crown to ever execute.',
    curatorNote: 'Witty, brilliant, and completely finished! Outstanding political maneuvering and sharp romantic banter.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Execution Date is in Three Months',
        subtitle: 'Lady Vivienne’s tea parlor',
        readTime: '15 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3200,
        releasedAt: '2025-08-01',
        content: [
          'Vivienne looked into the silver mirror, admiring her coiled auburn curls and the terrifying realization that her head was scheduled to part from them by autumn.'
        ]
      }
    ],
    savedQuotes: []
  },
  {
    id: 'lord-of-the-starlight-grimoire',
    title: 'Lord of the Starlight Grimoire',
    subtitle: 'Steampunk mysteries, tarot pathways, and ancient eldritch gods',
    author: 'Cuttlefish That Loves Diving (Tribute)',
    authorBio: 'Legendary web novel creator renowned for Victorian mystery, cosmic horror, and intricate power pathways.',
    coverImage: '/src/assets/images/novel_cover_cyberpunk_1791115064122.jpg',
    genre: 'Eldritch Cultivation & Mystery',
    novelType: 'Web Novel',
    status: 'Ongoing',
    source: 'Qidian / Wuxiaworld',
    originalLanguage: 'Chinese (CN)',
    translator: 'Atlas Studios English',
    tags: ['Eldritch', 'Cultivation', 'Mystery', 'Ancient Gods', 'Grimoire', 'Psychological', 'Victorian'],
    rating: 5.0,
    ratingCount: 38400,
    totalPages: 1420,
    totalChapters: 980,
    readTime: '68h 30m',
    publishedYear: 2025,
    publisher: 'Wuxiaworld Immortal Press',
    progressPercent: 28,
    currentChapter: 15,
    audioNarrator: 'Mark Vance (Dramatic Unabridged)',
    audioDuration: '72h 15m',
    synopsis: 'In an alternate steam-powered continent veiled by crimson smog and gas lamps, a history student transmigrates into the body of an impoverished tutor whose previous self committed suicide after reading a cursed notebook. As he stirs a cup of black tea under the silver moon, he discovers that the stars above are watchful eyes, and the only path to sanity is consuming the potions of the Twenty-Two Pathways of the Fool.',
    curatorNote: 'Universally hailed as one of the greatest web novels ever written. Incomparable worldbuilding, tension, and supernatural depth.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: The Crimson Moon over Backlund',
        subtitle: 'The smell of gunpowder and blood',
        readTime: '18 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 3800,
        releasedAt: '2025-05-10',
        content: [
          'Pain. Searing, pulsing pain split his cranium like a rusty pickaxe.',
          'Zhou Mingrui opened his eyes to see a flickering kerosene lamp casting elongated shadows across Victorian wallpaper peeling with yellow mold.'
        ]
      }
    ],
    savedQuotes: []
  },
  {
    id: 'infinite-level-blacksmith',
    title: 'Infinite Level Blacksmith: God-Tier Equipment Forge',
    subtitle: 'Tapping a rusty hammer to craft planet-cutting artifacts',
    author: 'Kaito Tanaka',
    authorBio: 'Prolific fantasy web novel author known for absurdly satisfying overpowered crafting comedies.',
    coverImage: '/src/assets/images/novel_cover_nordic_1791115078241.jpg',
    genre: 'Fantasy & Comedy',
    novelType: 'Light Novel',
    status: 'Ongoing',
    source: 'Syosetu / J-Novel Club',
    originalLanguage: 'Japanese (JP)',
    translator: 'Anvil Scans',
    tags: ['Overpowered MC', 'Blacksmith', 'Comedy', 'Adventure', 'Fantasy', 'Mythic Gear', 'Light Novel'],
    rating: 4.7,
    ratingCount: 7600,
    totalPages: 360,
    totalChapters: 240,
    readTime: '16h 40m',
    publishedYear: 2026,
    publisher: 'Hobby Japan · Tokyo',
    progressPercent: 18,
    currentChapter: 4,
    audioNarrator: 'Tatsuya Mori',
    audioDuration: '18h 00m',
    synopsis: 'Summoned to another world alongside five hundred high school classmates who received saintly hero classes, Daiki was given the bottom-tier trash class "Village Blacksmith". But due to a system integer overflow error, his [Hammer Tap Mastery] was set to Level 999,999,999—turning every kitchen knife he taps into an SSS-Rank God-Slaying artifact.',
    curatorNote: 'Hilarious, fast, and intensely enjoyable light novel comedy with outrageous weapon stats and exasperated guild masters.',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1: Level 999,999,999 Hammer Strike',
        subtitle: 'The first iron kitchen cleaver',
        readTime: '12 min',
        isCompleted: true,
        isCurrent: false,
        wordCount: 2600,
        releasedAt: '2026-03-01',
        content: [
          '“Clang!” went the rusty hammer.',
          '[System: Divine Cleaver "+999 Star Cleaver of Absolute Void" successfully forged.]',
          'Daiki blinked. He just wanted something to slice onions for dinner.'
        ]
      }
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
  oled: {
    id: 'oled',
    name: 'Midnight OLED (Web Novel Standard)',
    bgClass: 'bg-[#0A0A0C]',
    textClass: 'text-[#E2E2E6]',
    secondaryTextClass: 'text-[#8E8E93]',
    borderClass: 'border-[#222228]',
    accentClass: 'text-[#F59E0B]',
    activeIndicator: 'bg-[#F59E0B]',
    hexBg: '#0A0A0C',
    hexText: '#E2E2E6'
  },
  alabaster: {
    id: 'alabaster',
    name: 'Paper Cream (Light Novel Print)',
    bgClass: 'bg-[#FBF8F1]',
    textClass: 'text-[#1C1917]',
    secondaryTextClass: 'text-[#78716C]',
    borderClass: 'border-[#E7E2D8]',
    accentClass: 'text-[#9A3412]',
    activeIndicator: 'bg-[#1C1917]',
    hexBg: '#FBF8F1',
    hexText: '#1C1917'
  },
  sepia: {
    id: 'sepia',
    name: 'Warm Parchment',
    bgClass: 'bg-[#F4ECD8]',
    textClass: 'text-[#2B241D]',
    secondaryTextClass: 'text-[#7D7162]',
    borderClass: 'border-[#DFD2B8]',
    accentClass: 'text-[#854D0E]',
    activeIndicator: 'bg-[#2B241D]',
    hexBg: '#F4ECD8',
    hexText: '#2B241D'
  },
  forest: {
    id: 'forest',
    name: 'Deep Forest',
    bgClass: 'bg-[#0B1513]',
    textClass: 'text-[#DDEAE6]',
    secondaryTextClass: 'text-[#7C9790]',
    borderClass: 'border-[#1B2F2A]',
    accentClass: 'text-[#10B981]',
    activeIndicator: 'bg-[#10B981]',
    hexBg: '#0B1513',
    hexText: '#DDEAE6'
  }
};
