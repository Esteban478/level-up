export const habits = [
    {
        habitId: 1,
        name: "Daily Exercise",
        description: "Engage in light physical activity",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 30 }
    },
    {
        habitId: 2,
        name: "Meditation",
        description: "Practice mindfulness to reduce stress",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 25 }
    },
    {
        habitId: 3,
        name: "Reading",
        description: "Read to expand knowledge",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 30 }
    },
    {
        habitId: 4,
        name: "Sleep Schedule",
        description: "Maintain a consistent sleep schedule",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "Exactly", value: true, direction: "maintain" },
        xpReward: { base: 20, max: 20 }
    },
    {
        habitId: 5,
        name: "Healthy Eating",
        description: "Eat a nutritious meal",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 1, unit: "meal", direction: "increase" },
        xpReward: { base: 15, max: 45 }
    },
    {
        habitId: 6,
        name: "Floss",
        description: "Floss teeth for better oral hygiene",
        isTemplate: true,
        isPublic: true,
        area: "Health",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "Exactly", value: true, direction: "maintain" },
        xpReward: { base: 10, max: 10 }
    },
    {
        habitId: 7,
        name: "Make Bed",
        description: "Start the day with a small accomplishment",
        isTemplate: true,
        isPublic: true,
        area: "Personal Development",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "Exactly", value: true, direction: "maintain" },
        xpReward: { base: 5, max: 5 }
    },
    {
        habitId: 8,
        name: "Drinking Water",
        description: "Stay hydrated throughout the day",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 4, unit: "glasses", direction: "increase" },
        xpReward: { base: 5, max: 20 }
    },
    {
        habitId: 9,
        name: "Steps",
        description: "Increase daily physical activity",
        isTemplate: true,
        isPublic: true,
        area: "Fitness",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 5000, unit: "steps", direction: "increase" },
        xpReward: { base: 5, max: 15 }
    },
    {
        habitId: 10,
        name: "Gratitude Practice",
        description: "Write down things you're grateful for",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 1, unit: "item", direction: "increase" },
        xpReward: { base: 10, max: 10 }
    },
    {
        habitId: 11,
        name: "Deep Work",
        description: "Engage in focused, distraction-free work",
        isTemplate: true,
        isPublic: true,
        area: "Productivity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 30, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        habitId: 12,
        name: "Practice Musical Instrument",
        description: "Improve musical skills",
        isTemplate: true,
        isPublic: true,
        area: "Skill Development",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 30 }
    },
    {
        habitId: 13,
        name: "Language Learning",
        description: "Study a new language",
        isTemplate: true,
        isPublic: true,
        area: "Education",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 30 }
    },
    {
        habitId: 14,
        name: "Morning Routine",
        description: "Complete morning tasks",
        isTemplate: true,
        isPublic: true,
        area: "Personal Development",
        type: "Checklist",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 5, max: 10 }
    },
    {
        habitId: 15,
        name: "Skincare Routine",
        description: "Basic skincare",
        isTemplate: true,
        isPublic: true,
        area: "Health",
        type: "Checklist",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 5, max: 10 }
    },
    {
        habitId: 16,
        name: "Weekly Home Cleaning",
        description: "Basic home cleaning",
        isTemplate: true,
        isPublic: true,
        area: "Home Management",
        type: "Checklist",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "At least", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        habitId: 17,
        name: "Budget Review",
        description: "Quick budget check",
        isTemplate: true,
        isPublic: true,
        area: "Finance",
        type: "Boolean",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "Exactly", value: true, direction: "maintain" },
        xpReward: { base: 20, max: 20 }
    },
    {
        habitId: 18,
        name: "Reach Out to a Friend",
        description: "Maintain social connections",
        isTemplate: true,
        isPublic: true,
        area: "Social",
        type: "Numeric",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "At least", value: 1, unit: "contact", direction: "increase" },
        xpReward: { base: 15, max: 15 }
    },
    {
        habitId: 19,
        name: "Daily Sketching",
        description: "Quick creative sketch",
        isTemplate: true,
        isPublic: true,
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        habitId: 20,
        name: "Reduce Plastic Use",
        description: "Minimize single-use plastic",
        isTemplate: true,
        isPublic: true,
        area: "Environmental Consciousness",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 3, unit: "items", direction: "decrease" },
        xpReward: { base: 5, max: 15 }
    },
    {
        habitId: 21,
        name: "Learn New Skill",
        description: "Learn something new for your career",
        isTemplate: true,
        isPublic: true,
        area: "Professional Development",
        type: "Duration",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "At least", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        habitId: 22,
        name: "Journaling",
        description: "Write in your journal",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 25 }
    },
    {
        habitId: 23,
        name: "Daily Writing",
        description: "Work on your novel/article/book",
        isTemplate: true,
        isPublic: true,
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 35 }
    },
    {
        habitId: 24,
        name: "Music Production",
        description: "Create or edit music",
        isTemplate: true,
        isPublic: true,
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 20, unit: "minutes", direction: "increase" },
        xpReward: { base: 25, max: 40 }
    },
    {
        habitId: 25,
        name: "Video Creation",
        description: "Work on video projects",
        isTemplate: true,
        isPublic: true,
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 35 }
    },
    {
        habitId: 26,
        name: "Reduce Screen Time",
        description: "Decrease non-essential screen time",
        isTemplate: true,
        isPublic: true,
        area: "Digital Wellbeing",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 120, unit: "minutes", direction: "decrease" },
        xpReward: { base: 10, max: 40 }
    },
    {
        habitId: 27,
        name: "Limit Social Media",
        description: "Reduce social media usage",
        isTemplate: true,
        isPublic: true,
        area: "Digital Wellbeing",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 30, unit: "minutes", direction: "decrease" },
        xpReward: { base: 15, max: 30 }
    },
    {
        habitId: 28,
        name: "Reduce TV Watching",
        description: "Decrease TV viewing time",
        isTemplate: true,
        isPublic: true,
        area: "Lifestyle",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 60, unit: "minutes", direction: "decrease" },
        xpReward: { base: 10, max: 30 }
    },
    {
        habitId: 29,
        name: "Tobacco Reduction",
        description: "Reduce tobacco consumption",
        isTemplate: true,
        isPublic: true,
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 5, unit: "uses", direction: "decrease" },
        xpReward: { base: 10, max: 50 }
    },
    {
        habitId: 30,
        name: "Alcohol Moderation",
        description: "Moderate alcohol intake",
        isTemplate: true,
        isPublic: true,
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At most", value: 1, unit: "drink", direction: "decrease" },
        xpReward: { base: 20, max: 20 }
    },
    {
        habitId: 31,
        name: "Mindful Breathing",
        description: "Practice deep, mindful breathing",
        isTemplate: true,
        isPublic: true,
        area: "Stress Management",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 2, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        habitId: 32,
        name: "Daily Affirmations",
        description: "Repeat positive affirmations",
        isTemplate: true,
        isPublic: true,
        area: "Mental Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 3, unit: "affirmations", direction: "increase" },
        xpReward: { base: 5, max: 15 }
    },
    {
        habitId: 33,
        name: "Declutter",
        description: "Remove unnecessary items",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        habitId: 34,
        name: "Networking",
        description: "Expand professional network",
        isTemplate: true,
        isPublic: true,
        area: "Career Development",
        type: "Numeric",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "At least", value: 1, unit: "connection", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        habitId: 35,
        name: "Meal Planning",
        description: "Plan meals for the week",
        isTemplate: true,
        isPublic: true,
        area: "Health",
        type: "Boolean",
        frequency: { type: "Weekly", daysOfWeek: 1 },
        goal: { type: "Exactly", value: true, direction: "maintain" },
        xpReward: { base: 25, max: 25 }
    },
    {
        habitId: 36,
        name: "Daily Prioritization",
        description: "Start each day by identifying and prioritizing your most important tasks.",
        isTemplate: true,
        isPublic: true,
        area: "Keystone",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "At least", value: 1, unit: "prioritization", direction: "increase" },
        xpReward: { base: 20, max: 25 }
    }
];

export default habits;