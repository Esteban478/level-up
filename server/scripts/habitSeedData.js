export const habits = [
    {
        name: "Daily Exercise",
        description: "Engage in light physical activity",
        area: "Health",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 30 }
    },
    {
        name: "Meditation",
        description: "Practice mindfulness to reduce stress",
        area: "Mental Health",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 25 }
    },
    {
        name: "Reading",
        description: "Read to expand knowledge",
        area: "Personal Development",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 30 }
    },
    {
        name: "Sleep Schedule",
        description: "Maintain a consistent sleep schedule",
        area: "Health",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "exactly", value: true, direction: "maintain" },
        xpReward: { base: 20, max: 20 }
    },
    {
        name: "Healthy Eating",
        description: "Eat a nutritious meal",
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 1, unit: "meal", direction: "increase" },
        xpReward: { base: 15, max: 45 }
    },
    {
        name: "Floss",
        description: "Floss teeth for better oral hygiene",
        area: "Health",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "exactly", value: true, direction: "maintain" },
        xpReward: { base: 10, max: 10 }
    },
    {
        name: "Make Bed",
        description: "Start the day with a small accomplishment",
        area: "Personal Development",
        type: "Boolean",
        frequency: { type: "Daily" },
        goal: { type: "exactly", value: true, direction: "maintain" },
        xpReward: { base: 5, max: 5 }
    },
    {
        name: "Water Intake",
        description: "Stay hydrated throughout the day",
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 4, unit: "glasses", direction: "increase" },
        xpReward: { base: 5, max: 20 }
    },
    {
        name: "Steps",
        description: "Increase daily physical activity",
        area: "Fitness",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 5000, unit: "steps", direction: "increase" },
        xpReward: { base: 5, max: 15 }
    },
    {
        name: "Gratitude Journal",
        description: "Write down things you're grateful for",
        area: "Mental Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 1, unit: "item", direction: "increase" },
        xpReward: { base: 10, max: 10 }
    },
    {
        name: "Deep Work",
        description: "Engage in focused, distraction-free work",
        area: "Productivity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 30, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        name: "Practice Musical Instrument",
        description: "Improve musical skills",
        area: "Skill Development",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 30 }
    },
    {
        name: "Language Learning",
        description: "Study a new language",
        area: "Education",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 30 }
    },
    {
        name: "Morning Routine",
        description: "Complete morning tasks",
        area: "Personal Development",
        type: "Checklist",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 5, max: 10 }
    },
    {
        name: "Skincare Routine",
        description: "Basic skincare",
        area: "Health",
        type: "Checklist",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 5, max: 10 }
    },
    {
        name: "Weekly Home Cleaning",
        description: "Basic home cleaning",
        area: "Home Management",
        type: "Checklist",
        frequency: { type: "Weekly" },
        goal: { type: "atLeast", value: 2, unit: "items", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        name: "Budget Review",
        description: "Quick budget check",
        area: "Financial Health",
        type: "Boolean",
        frequency: { type: "Weekly" },
        goal: { type: "exactly", value: true, direction: "maintain" },
        xpReward: { base: 20, max: 20 }
    },
    {
        name: "Reach Out to a Friend",
        description: "Maintain social connections",
        area: "Social Connection",
        type: "Numeric",
        frequency: { type: "Weekly" },
        goal: { type: "atLeast", value: 1, unit: "contact", direction: "increase" },
        xpReward: { base: 15, max: 15 }
    },
    {
        name: "Daily Sketching",
        description: "Quick creative sketch",
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        name: "Reduce Plastic Use",
        description: "Minimize single-use plastic",
        area: "Environmental Consciousness",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 3, unit: "items", direction: "decrease" },
        xpReward: { base: 5, max: 15 }
    },
    {
        name: "Learn New Skill",
        description: "Learn something new for your career",
        area: "Professional Development",
        type: "Duration",
        frequency: { type: "Weekly" },
        goal: { type: "atLeast", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        name: "Journaling",
        description: "Write in your journal",
        area: "Mental Health",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 10, unit: "minutes", direction: "increase" },
        xpReward: { base: 15, max: 25 }
    },
    {
        name: "Daily Writing",
        description: "Work on your novel/article/book",
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 35 }
    },
    {
        name: "Music Production",
        description: "Create or edit music",
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 20, unit: "minutes", direction: "increase" },
        xpReward: { base: 25, max: 40 }
    },
    {
        name: "Video Creation",
        description: "Work on video projects",
        area: "Creativity",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 15, unit: "minutes", direction: "increase" },
        xpReward: { base: 20, max: 35 }
    },
    {
        name: "Reduce Screen Time",
        description: "Decrease non-essential screen time",
        area: "Digital Wellbeing",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 120, unit: "minutes", direction: "decrease" },
        xpReward: { base: 10, max: 40 }
    },
    {
        name: "Limit Social Media",
        description: "Reduce social media usage",
        area: "Digital Wellbeing",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 30, unit: "minutes", direction: "decrease" },
        xpReward: { base: 15, max: 30 }
    },
    {
        name: "Reduce TV Watching",
        description: "Decrease TV viewing time",
        area: "Lifestyle",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 60, unit: "minutes", direction: "decrease" },
        xpReward: { base: 10, max: 30 }
    },
    {
        name: "Tobacco Reduction",
        description: "Reduce tobacco consumption",
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 5, unit: "uses", direction: "decrease" },
        xpReward: { base: 10, max: 50 }
    },
    {
        name: "Alcohol Moderation",
        description: "Moderate alcohol intake",
        area: "Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atMost", value: 1, unit: "drink", direction: "decrease" },
        xpReward: { base: 20, max: 20 }
    },
    {
        name: "Mindful Breathing",
        description: "Practice deep, mindful breathing",
        area: "Stress Management",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 2, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        name: "Daily Affirmations",
        description: "Repeat positive affirmations",
        area: "Mental Health",
        type: "Numeric",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 3, unit: "affirmations", direction: "increase" },
        xpReward: { base: 5, max: 15 }
    },
    {
        name: "Declutter",
        description: "Remove unnecessary items",
        area: "Home Management",
        type: "Duration",
        frequency: { type: "Daily" },
        goal: { type: "atLeast", value: 5, unit: "minutes", direction: "increase" },
        xpReward: { base: 10, max: 20 }
    },
    {
        name: "Networking",
        description: "Expand professional network",
        area: "Career Development",
        type: "Numeric",
        frequency: { type: "Weekly" },
        goal: { type: "atLeast", value: 1, unit: "connection", direction: "increase" },
        xpReward: { base: 20, max: 40 }
    },
    {
        name: "Meal Planning",
        description: "Plan meals for the week",
        area: "Health",
        type: "Boolean",
        frequency: { type: "Weekly" },
        goal: { type: "exactly", value: true, direction: "maintain" },
        xpReward: { base: 25, max: 25 }
    }
];