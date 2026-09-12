import assert from "assert";
import { calculateRequiredAverage } from "./gradeCalculator";

const result1 = calculateRequiredAverage(
  [
    { name: "Test 1", weight: 20, mark: 70 },
    { name: "Test 2", weight: 20, mark: 70 },
    { name: "Exam", weight: 60, mark: null },
  ],
  65
);
assert.strictEqual(result1.currentWeightedMark, 28);
assert.strictEqual(result1.remainingWeight, 60);
assert.ok(Math.abs((result1.requiredAverageOnRemaining as number) - 61.67) < 0.01);
assert.strictEqual(result1.status, "tight");
console.log("PASS: correctly computes required average for a typical case");

const result2 = calculateRequiredAverage(
  [
    { name: "Test 1", weight: 50, mark: 90 },
    { name: "Exam", weight: 50, mark: null },
  ],
  40
);
assert.strictEqual(result2.status, "already-safe");
console.log("PASS: flags 'already safe' when the target is already locked in");

const result3 = calculateRequiredAverage(
  [
    { name: "Test 1", weight: 80, mark: 30 },
    { name: "Exam", weight: 20, mark: null },
  ],
  90
);
assert.strictEqual(result3.status, "impossible");
console.log("PASS: flags 'impossible' when even 100% on the rest wouldn't be enough");

const result4Pass = calculateRequiredAverage(
  [{ name: "Only assessment", weight: 100, mark: 75 }],
  70
);
assert.strictEqual(result4Pass.status, "already-safe");

const result4Fail = calculateRequiredAverage(
  [{ name: "Only assessment", weight: 100, mark: 60 }],
  70
);
assert.strictEqual(result4Fail.status, "no-remaining-assessments");
console.log("PASS: correctly handles modules with nothing left to write");

const onTrack = calculateRequiredAverage(
  [{ name: "Exam", weight: 100, mark: null }],
  50
);
assert.strictEqual(onTrack.status, "on-track"); // needs exactly 50, comfortable

const atRisk = calculateRequiredAverage(
  [{ name: "Exam", weight: 100, mark: null }],
  80
);
assert.strictEqual(atRisk.status, "at-risk"); // needs 80, genuinely tough
console.log("PASS: status thresholds (on-track / tight / at-risk) behave sensibly");

console.log("\nAll grade calculator tests passed.");
