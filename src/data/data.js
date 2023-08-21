export const quizData = [
  {
    id: 1,
    question: "What is your primary fitness goal?",
    isMultipleChoice: true,
    options: [
      { label: "Build Muscle" },
      { label: "Lose Weight" },
      { label: "Improve Endurance" },
      { label: "Stay Active" },
    ],
    answers: [],
  },
  {
    id: 2,
    question: "Are you looking to target any specific muscle groups?",
    isMultipleChoice: true,
    options: [
      { label: "Upper Body" },
      { label: "Lower Body" },
      { label: "Core" },
      { label: "Full Body" },
      { label: "No Specific Target" },
    ],
    answers: [],
  },
  {
    id: 3,
    question: "How many days a week can you commit to working out?",
    isMultipleChoice: false,
    options: [
      { label: "1-2" },
      { label: "3-4" },
      { label: "5-6" },
      { label: "7" },
    ],
    answers: [],
  },
  {
    id: 4,
    question: "Do you have any current injuries or joint pain? Specify:",
    isMultipleChoice: true,
    options: [
      { label: "Shoulder" },
      { label: "Knee" },
      { label: "Back" },
      { label: "Hip" },
      { label: "None" },
    ],
    answers: [],
  },
  {
    id: 5,
    question: "Do you prefer bodyweight exercises or gym equipment?",
    isMultipleChoice: false,
    options: [
      { label: "Bodyweight" },
      { label: "Gym Equipment" },
      { label: "Both Equally" },
    ],
    answers: [],
  },
  {
    id: 6,
    question: "Do you have any specific exercise preferences?",
    isMultipleChoice: true,
    options: [
      { label: "Free Weights" },
      { label: "Resistance Bands" },
      { label: "Bodyweight" },
      { label: "Machines" },
      { label: "No Preference" },
    ],
    answers: [],
  },
  {
    id: 7,
    question: "How much time can you allocate per workout session?",
    isMultipleChoice: true,
    options: [
      { label: "15-30 minutes" },
      { label: "30-45 minutes" },
      { label: "45-60 minutes" },
      { label: "More than 60 minutes" },
    ],
    answers: [],
  },
  {
    id: 8,
    question: "Do you have any preference for a specific workout style?",
    isMultipleChoice: true,
    options: [
      { label: "Cardio" },
      { label: "Strength Training" },
      { label: "Flexibility" },
      { label: "Functional Training" },
      { label: "No Preference" },
    ],
    answers: [],
  },
  {
    id: 9,
    question: "Select your preferred workout exercises:",
    isMultipleChoice: true,
    options: [
      { label: "Push-Ups", image: "pushups.jpg" },
      { label: "Squats", image: "squats.jpg" },
      { label: "Planks", image: "planks.jpg" },
      { label: "Lunges", image: "lunges.jpg" },
      { label: "Deadlifts", image: "deadlifts.jpg" },
      { label: "Burpees", image: "burpees.jpg" },
      { label: "Pull-Ups", image: "pullups.jpg" },
      { label: "Sit-Ups", image: "situps.jpg" },
      { label: "Leg Press", image: "legpress.jpg" },
      { label: "Bicep Curls", image: "bicepcurls.jpg" },
      { label: "Calf Raises", image: "calfraises.jpg" },
      { label: "Rows", image: "rows.jpg" },
      { label: "Jumping Jacks", image: "jumpingjacks.jpg" },
      { label: "Russian Twists", image: "russiantwists.jpg" },
      { label: "Tricep Dips", image: "tricepdips.jpg" },
      { label: "Mountain Climbers", image: "mountainclimbers.jpg" },
      { label: "Leg Raises", image: "legraises.jpg" },
      { label: "Hammer Curls", image: "hammercurls.jpg" },
      { label: "Chest Press", image: "chestpress.jpg" },
      { label: "Box Jumps", image: "boxjumps.jpg" },
    ],
    answers: [],
  },
];

export const allExercisesData = [
  /* top, without bench*/
  {
    id: 1,
    exercise_name: "dumbbell bicep curls",
    muscle_group: "top",
    main_muscle_group: ["biceps"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 2,
    exercise_name: "dumbbell tricep kickbacks",
    muscle_group: "top",
    main_muscle_group: ["triceps"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 15,
    exercise_name: "v sit",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 3,
    exercise_name: "pull-up",
    muscle_group: "top",
    main_muscle_group: ["upper back/neck"],
    lesser_muscle_group: ["biceps"],
    necessary_equipment: ["pull-up bar"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 4,
    exercise_name: "dumbbell shoulder press",
    muscle_group: "top",
    main_muscle_group: ["shoulders"],
    lesser_muscle_group: ["triceps"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 5,
    exercise_name: "push-up",
    muscle_group: "top",
    main_muscle_group: ["chest"],
    lesser_muscle_group: ["shoulders"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 6,
    exercise_name: "dumbbell lateral raises",
    muscle_group: "top",
    main_muscle_group: ["shoulders"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 7,
    exercise_name: "dumbbell bent-over rows",
    muscle_group: "top",
    main_muscle_group: ["upper back/neck"],
    lesser_muscle_group: ["biceps"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 8,
    exercise_name: "dumbbell hammer curls",
    muscle_group: "top",
    main_muscle_group: ["biceps"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 9,
    exercise_name: "dumbbell shrugs",
    muscle_group: "top",
    main_muscle_group: ["upper back/neck"],
    lesser_muscle_group: ["shoulders"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 10,
    exercise_name: "dumbbell front raises",
    muscle_group: "top",
    main_muscle_group: ["shoulders"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 11,
    exercise_name: "pike push-up",
    muscle_group: "top",
    main_muscle_group: ["shoulders"],
    lesser_muscle_group: ["triceps"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 12,
    exercise_name: "diamond push-up",
    muscle_group: "top",
    main_muscle_group: ["chest"],
    lesser_muscle_group: ["triceps"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 13,
    exercise_name: "skull crushers",
    muscle_group: "top",
    main_muscle_group: ["triceps"],
    lesser_muscle_group: ["forearms"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 14,
    exercise_name: "neutral grip dumbbell bench press",
    muscle_group: "top",
    main_muscle_group: ["triceps"],
    lesser_muscle_group: ["chest"],
    necessary_equipment: ["dumbbell", "bench"],
    image: "image.jpg",
    isTimed: false,
  },
  /* core */
  {
    id: 16,
    exercise_name: "hanging leg raises",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: ["pull-up bar"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 17,
    exercise_name: "plank",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: true,
  },
  {
    id: 18,
    exercise_name: "sit up",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 19,
    exercise_name: "russian twists",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 20,
    exercise_name: "side plank",
    muscle_group: "core",
    main_muscle_group: ["side abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 21,
    exercise_name: "superman",
    muscle_group: "core",
    main_muscle_group: ["middle/lower back"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 22,
    exercise_name: "reverse crunches",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["middle/lower back"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 23,
    exercise_name: "hollow body hold",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["middle/lower back"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: true,
  },
  {
    id: 24,
    exercise_name: "leg raises",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["middle/lower back"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 25,
    exercise_name: "bicycle crunches",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 26,
    exercise_name: "dead bug",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["middle/lower back"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 27,
    exercise_name: "flutter kicks",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["middle/lower back"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 28,
    exercise_name: "woodchoppers",
    muscle_group: "core",
    main_muscle_group: ["side abs"],
    lesser_muscle_group: [],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 29,
    exercise_name: "seated russian twists",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: ["side abs"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 30,
    exercise_name: "tuck crunches",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 31,
    exercise_name: "mountain climbers",
    muscle_group: "core",
    main_muscle_group: ["abs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: true,
  },
  /* legs */
  {
    id: 32,
    exercise_name: "dumbbell deadlift",
    muscle_group: "legs",
    main_muscle_group: ["lower legs"],
    lesser_muscle_group: ["glutes"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 33,
    exercise_name: "bulgarian split squat",
    muscle_group: "legs",
    main_muscle_group: ["upper legs"],
    lesser_muscle_group: ["glutes"],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 34,
    exercise_name: "dumbbell lunges",
    muscle_group: "legs",
    main_muscle_group: ["upper legs"],
    lesser_muscle_group: ["glutes"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 35,
    exercise_name: "sumo dumbbell squat",
    muscle_group: "legs",
    main_muscle_group: ["glutes"],
    lesser_muscle_group: ["upper legs"],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 36,
    exercise_name: "step-ups",
    muscle_group: "legs",
    main_muscle_group: ["upper legs"],
    lesser_muscle_group: ["glutes"],
    necessary_equipment: ["bench"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 37,
    exercise_name: "calf raises",
    muscle_group: "legs",
    main_muscle_group: ["lower legs"],
    lesser_muscle_group: [],
    necessary_equipment: ["dumbbell"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 38,
    exercise_name: "hip thrusts",
    muscle_group: "legs",
    main_muscle_group: ["glutes"],
    lesser_muscle_group: ["lower legs"],
    necessary_equipment: ["bench"],
    image: "image.jpg",
    isTimed: false,
  },
  {
    id: 39,
    exercise_name: "single-leg calf raises",
    muscle_group: "legs",
    main_muscle_group: ["lower legs"],
    lesser_muscle_group: [],
    necessary_equipment: [],
    image: "image.jpg",
    isTimed: false,
  },
];
