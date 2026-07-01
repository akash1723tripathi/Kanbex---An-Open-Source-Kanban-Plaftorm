import type { HeroContent } from "../types";

export const heroContent: HeroContent = {
  badge: {
    label: "Freshly",
    text: "Crafted for Smart Teams",
  },
  headline: {
    line1: "Your Everyday Workload",
    line2: "Structured Seamlessly",
  },
  subheadline:
    "Kanbex empowers you to coordinate everyday workflows, delegate roles to colleagues, and monitor milestones — all inside an intuitive, swift, and highly visual environment.",
  cta: {
    primary: { text: "Get Started", href: "/login" },
    secondary: { text: "View Demo", href: "#product-showcase" },
  },
  floatingElements: {
    taskCard: {
      title: "Overhaul Interface",
      date: "July 6, 2025",
      description:
        "Enhance navigation using a clean layout, clickable controls, and expanded margins.",
      tags: ["Product Design", "Creative", "Critical", "Draft", "Demo"],
      fileCount: "5 Documents",
    },
    memberDialog: {
      header: "Invite Collaborator",
      label: "Project Member",
      members: [
        { name: "Rahul Sharma", role: "UI Designer", avatar: "/images/hero/avatar-robert.png" },
        { name: "Harish Hegde", role: "Lead Creative", avatar: "/images/hero/avatar-henry.png" },
      ],
      buttonText: "Invite",
      searchPlaceholder: "Find",
    },
  },
};
