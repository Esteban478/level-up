import { UserAvatar } from './userAvatar';

export interface UserProfile {
  username: string;
  email: string;
  password?: string;
  avatar: UserAvatar;
  bio?: string;
  level: number;
  xp: number;
  totalXp: number;
  streakDays: number;
  lastLoginDate?: Date;
  friends?: string[];
  achievements?: string[];
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'friends' | 'private';
      activityVisibility: 'public' | 'friends' | 'private';
    };
  };
  createdAt: string;
  updatedAt?: string;
}