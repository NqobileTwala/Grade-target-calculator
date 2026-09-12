export interface Assessment {
  name: string;
  weight: number; 
  mark: number | null; 
}

export interface ModuleResult {
  currentWeightedMark: number; 
  completedWeight: number;
  remainingWeight: number; 
  requiredAverageOnRemaining: number | null; 
  status: "already-safe" | "on-track" | "tight" | "at-risk" | "impossible" | "no-remaining-assessments";
}

export function calculateRequiredAverage(
  assessments: Assessment[],
  targetGrade: number
): ModuleResult {
  const completed = assessments.filter((a) => a.mark !== null);
  const remaining = assessments.filter((a) => a.mark === null);

  const completedWeight = completed.reduce((sum, a) => sum + a.weight, 0);
  const remainingWeight = remaining.reduce((sum, a) => sum + a.weight, 0);
  const currentWeightedMark = completed.reduce(
    (sum, a) => sum + (a.weight * (a.mark as number)) / 100,
    0
  );

  if (remainingWeight === 0) {
    return {
      currentWeightedMark,
      completedWeight,
      remainingWeight,
      requiredAverageOnRemaining: null,
      status:
        currentWeightedMark >= targetGrade ? "already-safe" : "no-remaining-assessments",
    };
  }

  const pointsStillNeeded = targetGrade - currentWeightedMark;
  // Spread across the remaining weight to get a required average (0-100).
  const requiredAverageOnRemaining = (pointsStillNeeded / remainingWeight) * 100;

  let status: ModuleResult["status"];
  if (requiredAverageOnRemaining <= 0) status = "already-safe";
  else if (requiredAverageOnRemaining > 100) status = "impossible";
  else if (requiredAverageOnRemaining > 75) status = "at-risk";
  else if (requiredAverageOnRemaining > 55) status = "tight";
  else status = "on-track";

  return {
    currentWeightedMark,
    completedWeight,
    remainingWeight,
    requiredAverageOnRemaining,
    status,
  };
}
