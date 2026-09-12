import { ModuleResult } from "./gradeCalculator";

export const statusConfig: Record<
  ModuleResult["status"],
  { label: string; description: string; textVar: string; tintVar: string }
> = {
  "already-safe": {
    label: "Already safe",
    description: "You've already locked in your target, even with 0 on what's left.",
    textVar: "var(--safe-text)",
    tintVar: "var(--safe-tint)",
  },
  "on-track": {
    label: "On track",
    description: "A comfortable, realistic average to aim for.",
    textVar: "var(--safe-text)",
    tintVar: "var(--safe-tint)",
  },
  tight: {
    label: "Tight",
    description: "Doable, but you'll need to focus on what's left.",
    textVar: "var(--tight-text)",
    tintVar: "var(--tight-tint)",
  },
  "at-risk": {
    label: "At risk",
    description: "A high average is needed — this module needs real attention.",
    textVar: "var(--risk-text)",
    tintVar: "var(--risk-tint)",
  },
  impossible: {
    label: "Not achievable",
    description: "Even 100% on everything left wouldn't reach this target.",
    textVar: "var(--danger-text)",
    tintVar: "var(--danger-tint)",
  },
  "no-remaining-assessments": {
    label: "Target missed",
    description: "Nothing left to write, and the target wasn't reached.",
    textVar: "var(--danger-text)",
    tintVar: "var(--danger-tint)",
  },
};
