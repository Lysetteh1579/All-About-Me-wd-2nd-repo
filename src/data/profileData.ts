import { SkillItem, FavoriteItem, TriviaQuestion, GoalItem, PhotoItem, MediaItem } from '../types';

export const PROFILE_INFO = {
  name: 'Lysette Hernandez',
  githubUsername: 'Lysetteh1579',
  email: 'hernandezlysette2@gmail.com',
  tagline: 'Web Development Student, Creative Creator & Digital Explorer',
  bio: "Welcome to my digital corner! I'm Lysette, a curious web development enthusiast passionate about clean design, intuitive user experiences, and bringing imaginative ideas to life through code. When I'm not learning modern frontend tech or debugging CSS layouts, you'll find me curated playlists, reading, exploring photography, or brewing iced lattes.",
  location: 'San Diego, CA',
  dob: '11-17-11',
  birthday: 'November 17, 2011',
  status: 'Exploring Web Dev & Creative Coding',
  highlights: [
    { label: 'Birthday', value: '11-17-11' },
    { label: 'Location', value: 'San Diego, CA' },
    { label: 'Top Goal', value: 'Certified Lash Tech & Entrepreneur' }
  ]
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'html5',
    name: 'Semantic HTML5',
    category: 'frontend',
    level: 5,
    description: 'Clean, accessible page structuring, SEO best practices, and semantic tags.',
    iconName: 'Code2'
  },
  {
    id: 'css3',
    name: 'Modern CSS & Flexbox',
    category: 'frontend',
    level: 4,
    description: 'Responsive media queries, Grid & Flexbox layouts, transitions, and aesthetic styling.',
    iconName: 'Palette'
  },
  {
    id: 'javascript',
    name: 'JavaScript & React',
    category: 'frontend',
    level: 4,
    description: 'DOM manipulation, modern ES6+ features, state management, and component architecture.',
    iconName: 'Cpu'
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'tools',
    level: 4,
    description: 'Version control, managing commits, branching, open-source collaboration, and repo workflows.',
    iconName: 'GitBranch'
  },
  {
    id: 'responsive-design',
    name: 'Responsive UI/UX',
    category: 'creative',
    level: 5,
    description: 'Mobile-first mindset, readable typography hierarchy, and thoughtful whitespace.',
    iconName: 'Smartphone'
  },
  {
    id: 'creative-problem-solving',
    name: 'Creative Problem Solving',
    category: 'creative',
    level: 5,
    description: 'Iterative debugging, user-centered empathy, and turning rough ideas into prototypes.',
    iconName: 'Sparkles'
  }
];

export const FAVORITES_DATA: FavoriteItem[] = [
  {
    id: 'fav-friends',
    category: 'hobbies',
    title: 'Talking to Friends',
    subtitle: 'Heart-to-heart chats, laughing & staying connected',
    description: 'Catching up with best friends, sharing daily stories, giving each other advice, and creating unforgettable memories together.',
    tag: 'Connection'
  },
  {
    id: 'fav-beach',
    category: 'places',
    title: 'Going to the Beach',
    subtitle: 'Ocean waves, coastal sunsets & salty air',
    description: 'Relaxing by the water, listening to the crashing waves, walking along the shoreline at golden hour, and soaking up sunny California beach days.',
    tag: 'Coastal'
  },
  {
    id: 'fav-1',
    category: 'hobbies',
    title: 'Digital Photography',
    subtitle: 'Golden hour & street candid shots',
    description: 'Capturing everyday fleeting moments, warm light, and architectural geometry through visual storytelling.',
    tag: 'Creative'
  },
  {
    id: 'fav-2',
    category: 'music',
    title: 'Indie & Chill Lo-Fi Beats',
    subtitle: 'The essential coding companions',
    description: 'Smooth rhythms, ambient acoustics, and upbeat melodies that keep focus sharp and creativity flowing.',
    tag: 'Soundtrack'
  },
  {
    id: 'fav-3',
    category: 'books',
    title: 'Design Systems & Sci-Fi Novels',
    subtitle: 'From typography principles to world-building',
    description: 'Exploring how technology, storytelling, and thoughtful craft influence how humans interact with the world.',
    tag: 'Reading'
  },
  {
    id: 'fav-4',
    category: 'places',
    title: 'Sunlit Coffee Shops & Coastal Trails',
    subtitle: 'Where inspiration strikes best',
    description: 'Cozy spots with natural light, good espresso, notebook sketches, and ocean breeze.',
    tag: 'Exploration'
  }
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 'q1',
    question: 'What is Lysette’s favorite part of building web applications?',
    options: [
      'Seeing interactive visual designs come to life from code',
      'Configuring complex compiler terminal scripts',
      'Memorizing DNS records',
      'Closing 50 open browser tabs'
    ],
    correctIndex: 0,
    explanation: 'Lysette loves the magic of turning a creative visual concept into a responsive, tangible webpage that people can touch and explore!'
  },
  {
    id: 'q2',
    question: 'Which tool does Lysette use for tracking repository versions?',
    options: ['FTP upload', 'Git & GitHub', 'Emailing zip files', 'Floppy disks'],
    correctIndex: 1,
    explanation: 'Git & GitHub provide version history, clean branches, and seamless collaboration for all web dev assignments.'
  },
  {
    id: 'q3',
    question: 'What is Lysette’s go-to fuel for a coding and design session?',
    options: ['Hot water with ice cubes', 'Iced coffee / Matcha latte', 'Energy drinks only', 'Lemon soda'],
    correctIndex: 1,
    explanation: 'A balanced iced coffee or calming matcha latte is the ultimate creative fuel!'
  },
  {
    id: 'q4',
    question: 'In modern web design, what does a "mobile-first" approach mean?',
    options: [
      'Only allowing mobile phones to visit the site',
      'Designing for smaller handheld screens first, then expanding to desktop',
      'Calling friends first before coding',
      'Using phone emulators only'
    ],
    correctIndex: 1,
    explanation: 'Mobile-first ensures the foundational content and ergonomics work seamlessly on phones before scaling up to larger desktop viewports!'
  }
];

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    caption: 'Late night coding sessions & frontend layout experiments',
    category: 'coding',
    date: 'Fall 2026',
    location: 'Study Desk',
    likes: 18
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    caption: 'My vintage camera setup for capturing golden hour moments',
    category: 'creative',
    date: 'October 2026',
    location: 'Outdoor Walk',
    likes: 24
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Weekend music inspiration & favorite acoustic playlists',
    category: 'moments',
    date: 'September 2026',
    location: 'Vinyl Cafe',
    likes: 15
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Collaborating on class web development lab assignments',
    category: 'campus',
    date: 'August 2026',
    location: 'Campus Commons',
    likes: 21
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Wireframing UI components, color palettes, and typography',
    category: 'creative',
    date: 'November 2026',
    location: 'Design Studio',
    likes: 19
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Iced latte break between code commits and debugging',
    category: 'moments',
    date: 'September 2026',
    location: 'Favorite Cafe',
    likes: 27
  }
];

export const GOALS_DATA: GoalItem[] = [
  {
    id: 'g1',
    title: 'Earn State Lash Technician Certification',
    category: 'certification',
    timeframe: 'Primary Milestone',
    status: 'in-progress',
    progress: 85,
    description: 'Completing accredited professional lash extension coursework covering ocular anatomy, strict sanitation, precision isolation, and state licensing.',
    milestones: [
      'Complete accredited 100+ hour lash artistry curriculum & practical hours',
      'Master medical-grade adhesive chemistry, isolation, and eye safety protocols',
      'Pass practical, sanitation, and theory examinations with honors',
      'Obtain official State Board Lash Technician Certification & License'
    ],
    iconName: 'Award'
  },
  {
    id: 'g2',
    title: 'Master All Lash Sets & Custom Eye Mapping',
    category: 'artistry',
    timeframe: 'Core Artistry',
    status: 'in-progress',
    progress: 75,
    description: 'Perfecting flawless application for Classic 1:1, Hybrid, Russian Volume, Mega Volume, and bespoke styling (Cat Eye, Doll Eye, Wispy Kim K effect).',
    milestones: [
      'Perfect 1:1 seamless Classic lash placement with zero stickies',
      'Handcraft lightweight, symmetrical 3D-6D Volume bouquets and fans',
      'Design custom lash maps tailored to diverse eye shapes and bone structures',
      'Incorporate specialty curls (C, CC, D, L) and lash lift & tint certifications'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'g3',
    title: 'Launch Boutique Lash Studio in San Diego',
    category: 'business',
    timeframe: 'Studio Launch',
    status: 'in-progress',
    progress: 55,
    description: 'Setting up an aesthetic, hygienic, and relaxing private beauty suite with luxury memory foam lash beds, daylight ring lighting, and seamless booking.',
    milestones: [
      'Secure private boutique studio suite location in San Diego',
      'Furnish aesthetic studio space with ergonomic memory foam bed & glam ring lights',
      'Launch 24/7 online client booking platform, intake forms, and automated reminders',
      'Stock hospital-grade Barbicide sanitizers, autoclave tools, and premium lash trays'
    ],
    iconName: 'Briefcase'
  },
  {
    id: 'g4',
    title: 'Curate Social Media Portfolio & Client Growth',
    category: 'business',
    timeframe: 'Active Growth',
    status: 'in-progress',
    progress: 60,
    description: 'Building an aesthetic social presence on Instagram and TikTok highlighting macro lash details, 4-week retention checks, and lash care tips.',
    milestones: [
      'Capture high-definition macro photography of fresh sets and retention',
      'Publish weekly lash education, aftercare guides, and styling tips',
      'Build client loyalty membership and referral rewards program',
      'Reach full weekly appointment books with satisfied recurring clientele'
    ],
    iconName: 'Users'
  },
  {
    id: 'g5',
    title: 'Salon Sanitation & Client Care Excellence',
    category: 'certification',
    timeframe: 'Highest Standard',
    status: 'completed',
    progress: 100,
    description: 'Enforcing the highest hospital-grade sanitation protocols, allergy patch testing, and a pampering lash nap experience for every client.',
    milestones: [
      'Obtain Barbicide and Bloodborne Pathogens Sanitation Certifications',
      'Enforce 100% single-use disposables, sanitized tweezers, and clean air filters',
      'Provide comprehensive client allergy screenings and custom consultations',
      'Curate a serene experience with plush fleece blankets, soft aromatherapy, and lash naps'
    ],
    iconName: 'ShieldCheck'
  },
  {
    id: 'g6',
    title: 'Launch Signature Lash Brand & Supply Line',
    category: 'business',
    timeframe: 'Future Enterprise',
    status: 'upcoming',
    progress: 25,
    description: 'Expanding into beauty entrepreneurship with a branded product line including luxury cashmere lash trays, precision tweezer sets, and training workshops.',
    milestones: [
      'Formulate signature ultra-matte luxury lash trays and fast-drying adhesives',
      'Design chic branded pink & gold packaging, aftercare foam kits, and cleansing brushes',
      'Launch dedicated e-commerce storefront for beauty professionals and clients',
      'Host 1-on-1 private lash training masterclasses for aspiring lash technicians'
    ],
    iconName: 'TrendingUp'
  }
];

export const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Sunset Lo-Fi Study Beats',
    creator: 'Lofi Records & ChillHop',
    type: 'music',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Mellow Rhodes piano, vinyl dust cracks, and steady gentle kick drums for uninterrupted focus.',
    duration: '3:45',
    tag: 'Focus Playlist',
    likes: 38
  },
  {
    id: 'media-2',
    title: 'Midnight Coding Flow & Ambient Synth',
    creator: 'RetroWave Dreams',
    type: 'music',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Dreamy analog arpeggios and deep atmospheric basslines for late night CSS & JS breakthroughs.',
    duration: '4:12',
    tag: 'Coding Soundtrack',
    likes: 42
  },
  {
    id: 'media-3',
    title: 'Golden Hour Acoustic Guitar',
    creator: 'Indie Folk Collective',
    type: 'music',
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Warm fingerpicked acoustics and gentle harmonies reminiscent of California coastal sunsets.',
    duration: '3:18',
    tag: 'Unwind',
    likes: 29
  },
  {
    id: 'media-4',
    title: 'The Art of Frontend Micro-Interactions',
    creator: 'Frontend Masters & Creative Dev',
    type: 'video',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Exploring spring animations, tactile hover responses, and visual polish that make websites feel alive.',
    duration: '18 min',
    tag: 'UI/UX Masterclass',
    likes: 34
  },
  {
    id: 'media-5',
    title: 'Syntax: Tasty Web Development Talks',
    creator: 'Wes Bos & Scott Tolinski',
    type: 'podcast',
    coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://syntax.fm',
    description: 'Deep dives into modern CSS layouts, JavaScript frameworks, developer tooling, and workflow hacks.',
    duration: '45 min',
    tag: 'Tech Podcast',
    likes: 27
  },
  {
    id: 'media-6',
    title: 'Designing with Intentional Whitespace & Type',
    creator: 'Smashing Magazine & A List Apart',
    type: 'article',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.smashingmagazine.com',
    description: 'An inspiring breakdown on optical sizing, proportional scales, and designing without clutter.',
    duration: '7 min read',
    tag: 'Design Philosophy',
    likes: 31
  },
  {
    id: 'media-7',
    title: 'Street Photography: Framing Real Moments',
    creator: 'Candid Visions Gallery',
    type: 'video',
    coverUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.youtube.com',
    description: 'A visual journey exploring geometric shadows, street reflections, and golden hour portrait techniques.',
    duration: '12 min',
    tag: 'Visual Arts',
    likes: 25
  },
  {
    id: 'media-8',
    title: 'Design Matters with Debbie Millman',
    creator: 'Debbie Millman',
    type: 'podcast',
    coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.designmattersmedia.com',
    description: 'In-depth conversations with designers, typographers, writers, and cultural thinkers on creative craft.',
    duration: '52 min',
    tag: 'Creative Conversations',
    likes: 22
  }
];

export const INITIAL_GUESTBOOK: Array<{ id: string; name: string; message: string; badge: string; timestamp: string }> = [
  {
    id: 'guest-1',
    name: 'Classmate Alex',
    message: 'Awesome portfolio Lysette! Loved the interactive layout and clean typography.',
    badge: 'Peer',
    timestamp: '2 hours ago'
  },
  {
    id: 'guest-2',
    name: 'Mr. Davis (Web Dev Instructor)',
    message: 'Terrific execution on the "All About Me" repo project. Great semantic structure and responsiveness!',
    badge: 'Teacher',
    timestamp: 'Yesterday'
  }
];
