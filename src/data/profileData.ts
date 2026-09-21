import { SkillItem, FavoriteItem, TriviaQuestion, GoalItem } from '../types';

export const PROFILE_INFO = {
  name: 'Lysette Hernandez',
  githubUsername: 'Lysetteh1579',
  email: 'hernandezlysette2@gmail.com',
  tagline: 'Web Development Student, Creative Creator & Digital Explorer',
  bio: "Welcome to my digital corner! I'm Lysette, a curious web development enthusiast passionate about clean design, intuitive user experiences, and bringing imaginative ideas to life through code. When I'm not learning modern frontend tech or debugging CSS layouts, you'll find me curated playlists, reading, exploring photography, or brewing iced lattes.",
  location: 'California, US',
  status: 'Exploring Web Dev & Creative Coding',
  highlights: [
    { label: 'Coding Focus', value: 'Modern Web & UI Design' },
    { label: 'Repository', value: 'All-About-Me-wd' },
    { label: 'Current Quest', value: 'Building Interactive Apps' }
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

export const GOALS_DATA: GoalItem[] = [
  {
    id: 'g1',
    title: 'Master Modern Web Dev Fundamentals',
    timeframe: 'Current Milestone',
    status: 'completed',
    description: 'Solidified core HTML, responsive CSS layouts, and modern frontend component patterns.'
  },
  {
    id: 'g2',
    title: 'Build Interactive Web Apps & Portfolios',
    timeframe: 'In Progress',
    status: 'in-progress',
    description: 'Developing dynamic features, micro-interactions, responsive states, and creative showcases.'
  },
  {
    id: 'g3',
    title: 'Deepen Full-Stack & UI/UX Design Skills',
    timeframe: 'Next Horizon',
    status: 'upcoming',
    description: 'Exploring backend services, API integrations, accessible design systems, and creative web animation.'
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
