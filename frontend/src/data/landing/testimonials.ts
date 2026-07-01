import type { TestimonialsSection } from "../types";

export const testimonialsSection: TestimonialsSection = {
  header: "What Our Customers Think of Kanbex",
  description:
    "Organizations appreciate how Kanbex keeps them structured, enables smooth synergy, and completes projects faster — free from clutter.",
  testimonials: [
    {
      id: "octavia",
      name: "Ojasvi Kapoor",
      role: "People Operations",
      company: "Craftwise",
      quote:
        "Kanbex has transformed our operational workflow entirely. Previously, coordinating my group's duties meant shuffling between several applications, but Kanbex has unified everything in one painless space. From task delegation to progress updates, the system is seamless.",
    },
    {
      id: "ravi",
      name: "Rohan Mehra",
      role: "Engineering Manager",
      company: "Hexware",
      quote:
        "As a high-velocity development squad, we sought a light but robust solution. Kanbex exceeded our expectations. Tagging features, urgency tiers, and target dates are highly flexible and tailored for practical team needs.",
    },
    {
      id: "daniel",
      name: "Devansh Harish",
      role: "Product Manager",
      company: "NovaTech",
      quote:
        "The visibility offered by Kanbex is unparalleled. A quick look at the dashboard lets me immediately spot active tasks, bottlenecks, and team members requiring support. Switching over has reclaimed countless hours for us each week.",
    },
    {
      id: "zainab",
      name: "Zoya Saxena",
      role: "Head of Projects",
      company: "Lumenly",
      quote: "",
      isVideo: true,
      videoThumbnail: "/images/testimonials/video-bg.png",
    },
    {
      id: "layla",
      name: "Lata Mishra",
      role: "UX Design Lead",
      company: "Loop Studio",
      quote:
        "Having experimented with alternative project tools, we found none as sleek and responsive as this one. The user interface is highly intuitive, setup is frictionless, and shifting between Kanban boards and lists simplifies task tracking immensely.",
    },
    {
      id: "areeba",
      name: "Anjali Joshi",
      role: "Senior Designer",
      company: "BrightGrid",
      quote:
        "Frankly, we never anticipated that a management system could refine our design pipeline so significantly. Kanbex keeps our entire studio aligned, even across different divisions. The cooperative features are seamless and reliable.",
    },
  ],
};
