export interface Habit {
  _id: string;
  userId: string;
  habitId: number;
  name: string;
  description: string;
  area: string;
  type: 'Boolean' | 'Numeric' | 'Duration' | 'Checklist';
  frequency: {
    type: 'Daily' | 'Weekly' | 'Monthly';
    daysOfWeek?: number[];
    daysOfMonth?: number[];
  };
  isTemplate: boolean;
  templateId?: string;
  customizations?: {
    goal?: {
      type: 'At least' | 'At most' | 'Exactly';
      value: number;
      unit?: string;
      direction: 'increase' | 'decrease' | 'maintain';
    };
    frequency?: {
      type: 'Daily' | 'Weekly' | 'Monthly';
      daysOfWeek?: number[];
      daysOfMonth?: number[];
    };
    isPublic?: boolean;
  };
  goal: {
    type: 'At least' | 'At most' | 'Exactly';
    value: number;
    unit?: string;
    direction: 'increase' | 'decrease' | 'maintain';
  };
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
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
}