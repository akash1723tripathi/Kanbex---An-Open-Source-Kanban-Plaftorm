import type { FeaturesSection } from "../types";

export const featuresSection: FeaturesSection = {
  header: "What Makes Kanbex a Favorite for Teams",
  description:
    "Explore how Kanbex streamlines group synergy, elevates efficiency, and ensures you remain in control of each assignment — day in, day out.",
  features: [
    {
      id: "precision",
      icon: "Target",
      title: "Strategize with Accuracy",
      description:
        "Transform concepts into execution-ready items complete with strict schedules, urgency levels, and dedicated owners.",
    },
    {
      id: "collaborate",
      icon: "Users",
      title: "Team Up Without Confusion",
      description:
        "Seamlessly bring coworkers on board, delegate responsibilities, and remain synchronized — regardless of location.",
    },
    {
      id: "track",
      icon: "BarChart3",
      title: "Oversee Key Metrics",
      description:
        "Maintain full oversight using live updates of task statuses and project development phases.",
    },
  ],
  preview: {
    tags: ["Product Design", "Creative", "Critical", "Draft", "Demo"],
    members: [
      { name: "Devashish Sen", role: "UI Designer", avatar: "/images/hero/avatar-robert.png" },
      { name: "Himanshu Verma", role: "Lead Creative", avatar: "/images/hero/avatar-henry.png" },
    ],
    progress: {
      title: "Project Velocity",
      percentage: 86,
      comparison: "+12% compared to last week",
    },
  },
};
