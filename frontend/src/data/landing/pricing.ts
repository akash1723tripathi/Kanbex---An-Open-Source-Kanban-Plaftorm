import type { PricingSection } from "../types";

export const pricingSection: PricingSection = {
  header: "Discover the Perfect Plan for Your Group",
  description:
    "Pick from versatile packages engineered to assist squads of any scale to structure, coordinate, and execute tasks productively.",
  featurePrefix: "Includes all previous features, plus",
  plans: [
    {
      id: "starter",
      name: "Lite",
      price: "Free",
      period: "Forever",
      description: "Begin your workflow optimization journey",
      features: [
        "Maximum of 5 collaborators",
        "Full access to standard tools",
        "Kanban, list & tabular layout options",
        "Custom labels, target dates, and urgency tags",
        "Standard email assistance",
      ],
      cta: "Choose Plan",
    },
    {
      id: "pro",
      name: "Growth",
      price: "$19",
      period: "Per Month",
      description: "Engineered for scaling organizations",
      features: [
        "Accommodates up to 25 teammates",
        "Automated repeat tasks & notifications",
        "Collaborative group project boards",
        "Task comments & document uploads",
        "Expedited priority support",
      ],
      cta: "Choose Plan",
      highlighted: true,
      badge: "Recommended",
    },
    {
      id: "enterprise",
      name: "Corporate",
      price: "$99",
      period: "Per Month",
      description: "Tailored for large enterprises & multi-team operations",
      features: [
        "Uncapped users & board creations",
        "Granular permissions & administrative settings",
        "Personal success manager",
        "Bespoke API integrations",
        "SSO/SAML authentication & detailed productivity metrics",
      ],
      cta: "Choose Plan",
    },
  ],
};
