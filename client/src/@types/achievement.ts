export interface Achievement {
    id: string;
    name: string;
    description: string;
    xpReward: number;
    dateEarned: string;
    icon?: string;
    type: string;
}