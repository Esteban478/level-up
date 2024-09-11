import { User } from './user';
import { UserAvatar } from './userAvatar';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar: UserAvatar;
  bio?: string;
  level: number;
  xp: number;
  totalXp: number;
  streakDays: number;
  lastLoginDate?: Date;
  friends: User[];
  achievements: string[];
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
  updatedAt: string;
}