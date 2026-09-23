import { SkillItem, FavoriteItem, TriviaQuestion, GoalItem, PhotoItem, MediaItem } from '../types';
import trapsoulCover from '../assets/images/trapsoul_album_cover_1790185130216.jpg';
import drakeCover from '../assets/images/drake_album_cover_1790185534171.jpg';
import jeremihCover from '../assets/images/jeremih_album_cover_1790185546122.jpg';
import pndCover from '../assets/images/partynextdoor_cover_1790185900156.jpg';

export const BRYSON_TILLER_ALBUM_COVER = trapsoulCover;
export const DRAKE_ALBUM_COVER = drakeCover;
export const JEREMIH_ALBUM_COVER = jeremihCover;
export const PND_ALBUM_COVER = pndCover;

export const PROFILE_INFO = {
  name: 'Lysette Hernandez',
  githubUsername: 'Lysetteh1579',
  instagram: 'lysette.hernandez',
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
    id: 'fav-shopping',
    category: 'hobbies',
    title: 'Going Shopping',
    subtitle: 'Boutiques, beauty hauls & finding new styles',
    description: 'Browsing cute local boutiques and malls, checking out the latest fashion trends, stocking up on beauty and skincare essentials, and enjoying retail therapy.',
    tag: 'Lifestyle'
  },
  {
    id: 'fav-fugglers',
    category: 'hobbies',
    title: 'Collecting Fugglers',
    subtitle: 'Quirky, mischievous & funny plush monsters',
    description: 'Hunting down rare Fugglers (Funny Ugly Monsters) with their signature realistic teeth, goofy mismatched expressions, and chaotic plush charm.',
    tag: 'Collection'
  },
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
    id: 'media-bt-exchange',
    title: 'Exchange',
    creator: 'Bryson Tiller',
    type: 'music',
    coverUrl: trapsoulCover,
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Iconic Trapsoul anthem featuring smooth moody production, heartfelt vocals, and late-night nostalgic R&B flow.',
    duration: '3:14',
    tag: 'T R A P S O U L',
    likes: 78
  },
  {
    id: 'media-drake-own-it',
    title: 'Own It',
    creator: 'Drake',
    type: 'music',
    coverUrl: drakeCover,
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Introspective, nocturnal slow jam with moody synths, honest cadence, and late-night nostalgia.',
    duration: '4:11',
    tag: 'Nothing Was the Same / R&B',
    likes: 95
  },
  {
    id: 'media-jeremih-planez',
    title: 'Planez',
    creator: 'Jeremih',
    type: 'music',
    coverUrl: jeremihCover,
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Smooth, seductive R&B anthem featuring hypnotic atmospheric production, infectious melody, and sleek flow.',
    duration: '4:00',
    tag: 'Late Nights / R&B',
    likes: 88
  },
  {
    id: 'media-pnd-break-from-toronto',
    title: 'Break from Toronto',
    creator: 'PARTYNEXTDOOR',
    type: 'music',
    coverUrl: pndCover,
    mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Timeless OVO Sound anthem built around a dreamy acoustic vocal sample, hypnotic 808 bounce, and raw late-night R&B nostalgia.',
    duration: '1:39',
    tag: 'PARTYNEXTDOOR / OVO Sound',
    likes: 96
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
