import { habits } from "./habitSeedData";
import { achievements } from "./achievementSeedData";
import { createLevelProgression } from "../services/levelProgressionService";

export const habits = habits;

export const levelThresholds = async () => {
    await createLevelProgression(100);
};

export const achievements = achievements;

export const tips = [
    {
        content: "Start with small, achievable goals to build momentum",
        category: "starting",
        relatedHabitTypes: ["boolean", "numeric"],
        difficulty: "beginner"
    },
    // ... add more tips
];