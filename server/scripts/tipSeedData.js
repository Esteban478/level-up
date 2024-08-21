const tips = [
    {
        content: "Start with small, achievable goals to build momentum",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "Identify clear cues for your habits to make them easier to trigger",
        category: "Habit Loop - Cue",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Create a strong emotional connection to your desired outcome",
        category: "Habit Loop - Craving",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Make the habit action as easy as possible to perform",
        category: "Habit Loop - Response",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "Reward yourself immediately after completing the habit",
        category: "Habit Loop - Reward",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "Use habit stacking: Link a new habit to an existing one",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Track your progress to stay motivated and see improvement",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "Create a supportive environment that makes good habits easier",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Be patient - it takes time for habits to form",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "If you miss a day, don't break the chain. Get back on track immediately",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "For exercise habits, lay out your workout clothes the night before",
        category: "Habit-Specific",
        relatedAreas: ["Fitness", "Health"],
        difficulty: "Beginner"
    },
    {
        content: "When trying to drink more water, always keep a water bottle nearby",
        category: "Habit-Specific",
        relatedAreas: ["Health"],
        difficulty: "Beginner"
    },
    {
        content: "For reading habits, start with just 5 pages a day",
        category: "Habit-Specific",
        relatedAreas: ["Education", "Personal Development"],
        difficulty: "Beginner"
    },
    {
        content: "To improve sleep, establish a relaxing pre-bed routine",
        category: "Habit-Specific",
        relatedAreas: ["Health", "Lifestyle"],
        difficulty: "Intermediate"
    },
    {
        content: "For meditation, start with just 2 minutes a day",
        category: "Habit-Specific",
        relatedAreas: ["Mental Health", "Stress Management"],
        difficulty: "Beginner"
    },
    {
        content: "Make your cues obvious and unavoidable",
        category: "Habit Loop - Cue",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Visualize yourself successfully performing the habit",
        category: "Habit Loop - Craving",
        relatedAreas: ["All"],
        difficulty: "Advanced"
    },
    {
        content: "Break down complex habits into smaller, manageable steps",
        category: "Habit Loop - Response",
        relatedAreas: ["All"],
        difficulty: "Intermediate"
    },
    {
        content: "Celebrate your wins, no matter how small",
        category: "Habit Loop - Reward",
        relatedAreas: ["All"],
        difficulty: "Beginner"
    },
    {
        content: "Use implementation intentions: \"When X happens, I will do Y\"",
        category: "General",
        relatedAreas: ["All"],
        difficulty: "Advanced"
    },
    {
        content: "For strength training, focus on proper form before increasing weights",
        category: "Habit-Specific",
        relatedAreas: ["Fitness", "Health"],
        difficulty: "Intermediate"
    },
    {
        content: "When developing a writing habit, try freewriting for 10 minutes without stopping",
        category: "Habit-Specific",
        relatedAreas: ["Creativity", "Skill Development"],
        difficulty: "Beginner"
    },
    {
        content: "To improve productivity, use the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break",
        category: "Habit-Specific",
        relatedAreas: ["Productivity", "Professional Development"],
        difficulty: "Intermediate"
    },
    {
        content: "For better financial health, review your expenses weekly and categorize them",
        category: "Habit-Specific",
        relatedAreas: ["Financial Health"],
        difficulty: "Intermediate"
    },
    {
        content: "To enhance social connections, schedule regular check-ins with friends and family",
        category: "Habit-Specific",
        relatedAreas: ["Social Connection", "Personal Development"],
        difficulty: "Beginner"
    },
    {
        content: "For environmental consciousness, start by eliminating one single-use plastic item from your routine",
        category: "Habit-Specific",
        relatedAreas: ["Environmental Consciousness", "Lifestyle"],
        difficulty: "Beginner"
    },
    {
        content: "To improve digital wellbeing, set specific times for checking emails and social media",
        category: "Habit-Specific",
        relatedAreas: ["Digital Wellbeing", "Mental Health"],
        difficulty: "Intermediate"
    },
    {
        content: "For stress management, practice deep breathing for 5 minutes when you feel overwhelmed",
        category: "Habit-Specific",
        relatedAreas: ["Stress Management", "Mental Health"],
        difficulty: "Beginner"
    },
    {
        content: "To advance your career, set aside time each week to learn a new skill relevant to your field",
        category: "Habit-Specific",
        relatedAreas: ["Career Development", "Professional Development"],
        difficulty: "Intermediate"
    },
    {
        content: "For better home management, assign a specific task to each day of the week",
        category: "Habit-Specific",
        relatedAreas: ["Home Management", "Productivity"],
        difficulty: "Beginner"
    },
    {
        content: "To improve your diet, meal prep healthy snacks at the beginning of each week",
        category: "Habit-Specific",
        relatedAreas: ["Health", "Lifestyle"],
        difficulty: "Intermediate"
    },
    {
        content: "For language learning, use spaced repetition techniques to review vocabulary",
        category: "Habit-Specific",
        relatedAreas: ["Education", "Skill Development"],
        difficulty: "Advanced"
    },
    {
        content: "To boost creativity, try a new hobby or activity outside your comfort zone",
        category: "Habit-Specific",
        relatedAreas: ["Creativity", "Personal Development"],
        difficulty: "Intermediate"
    },
    {
        content: "For better sleep hygiene, avoid screens for at least an hour before bedtime",
        category: "Habit-Specific",
        relatedAreas: ["Health", "Lifestyle"],
        difficulty: "Intermediate"
    },
    {
        content: "To improve focus, practice mindfulness meditation for 10 minutes daily",
        category: "Habit-Specific",
        relatedAreas: ["Mental Health", "Productivity"],
        difficulty: "Intermediate"
    },
    {
        content: "For networking, aim to make one new professional connection each week",
        category: "Habit-Specific",
        relatedAreas: ["Career Development", "Social Connection"],
        difficulty: "Intermediate"
    },
    {
        content: "To reduce stress, incorporate a 15-minute walk into your daily routine",
        category: "Habit-Specific",
        relatedAreas: ["Stress Management", "Health", "Fitness"],
        difficulty: "Beginner"
    },
    {
        content: "For personal finance, automate your savings by setting up automatic transfers on payday",
        category: "Habit-Specific",
        relatedAreas: ["Financial Health"],
        difficulty: "Beginner"
    },
    {
        content: "To improve public speaking skills, practice in front of a mirror for 5 minutes daily",
        category: "Habit-Specific",
        relatedAreas: ["Skill Development", "Career Development"],
        difficulty: "Intermediate"
    },
    {
        content: "For better time management, use a digital calendar to schedule all your tasks and commitments",
        category: "Habit-Specific",
        relatedAreas: ["Productivity", "Professional Development"],
        difficulty: "Intermediate"
    }
];

export default tips;