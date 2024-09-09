export type FrequencyType = 'Daily' | 'Weekly' | 'Monthly';

export interface Frequency {
  type: FrequencyType;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
}

export type GoalType = 'At least' | 'At most' | 'Exactly';
export type GoalDirection = 'increase' | 'decrease' | 'maintain';

export interface Goal {
  type: GoalType;
  value: number;
  unit?: string;
  direction: GoalDirection;
}

export interface Habit {
  _id: string;
  userId: string;
  habitId: number;
  name: string;
  description: string;
  area: string;
  type: 'Boolean' | 'Numeric' | 'Duration' | 'Checklist';
  frequency: Frequency;
  isTemplate: boolean;
  templateId?: string;
  customizations?: {
    goal?: Goal;
    frequency?: Frequency;
    isPublic?: boolean;
  };
  goal: Goal;
  xpReward: {
    base: number;
    max?: number;
  };
  isPublic: boolean;
  isArchived: boolean;
  streak: {
    current: number;
    longest: number;
  };
  isTrackedToday: boolean;
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
}