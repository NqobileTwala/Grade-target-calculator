import { Assessment } from "./gradeCalculator";

export interface Module {
  id: string;
  name: string;
  targetGrade: number;
  assessments: Assessment[];
}

const STORAGE_KEY = "grade-target-calculator:modules";

/* Reads saved modules from the browser's localStorage, if any exist. */
export function loadModules(): Module[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Module[]) : [];
  } catch {
    return [];
  }
}

export function saveModules(modules: Module[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}
