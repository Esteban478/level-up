import { Achievement } from '../@types/achievement';

export interface XPTransactionResponse {
  xpGained: number;
  totalXp: number;
  currentXp: number;
  newLevel?: number;
  earnedAchievements: Achievement[];
}