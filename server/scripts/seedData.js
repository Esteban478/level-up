import { habits } from "./habitSeedData";
import { achievements } from "./achievementSeedData";
import { tips } from "./tipSeedData";
import { createLevelProgression } from "../services/levelProgressionService";

export const habits = habits;

export const achievements = achievements;

export const tips = tips;

export const levelThresholds = async () => {
    await createLevelProgression(100);
};