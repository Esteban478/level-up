export interface HabitLog {
  _id?: string;
  habitId: string;
  userId: string;
  date: string;
  value: boolean | number;
  notes?: string;
  createdAt?: string;
}