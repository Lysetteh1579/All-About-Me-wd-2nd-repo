export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'tools' | 'creative';
  level: number; // 1 to 5
  description: string;
  iconName: string;
}

export interface FavoriteItem {
  id: string;
  category: 'music' | 'books' | 'hobbies' | 'places';
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  category: 'coding' | 'creative' | 'campus' | 'moments';
  date?: string;
  location?: string;
  likes: number;
  isCustom?: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  badge: string;
  timestamp: string;
}

export interface MediaItem {
  id: string;
  title: string;
  creator: string;
  type: 'music' | 'video' | 'podcast' | 'article';
  coverUrl: string;
  mediaUrl?: string;
  description: string;
  duration?: string;
  tag?: string;
  likes: number;
  isCustom?: boolean;
}

export interface GoalItem {
  id: string;
  title: string;
  category: 'artistry' | 'certification' | 'business' | 'webdev' | 'creative' | 'academic' | 'personal';
  timeframe: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  progress: number; // 0 to 100
  milestones?: string[];
  iconName?: string;
}
