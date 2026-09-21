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

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  badge: string;
  timestamp: string;
}

export interface GoalItem {
  id: string;
  title: string;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
}
