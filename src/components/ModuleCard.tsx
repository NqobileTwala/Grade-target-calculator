"use client";

import { Assessment, calculateRequiredAverage } from "@/lib/gradeCalculator";
import { Module } from "@/lib/storage";
import { statusConfig } from "@/lib/statusConfig";

interface Props {
  module: Module;
  onChange: (updated: Module) => void;
  onDelete: () => void;
}

export default function ModuleCard({ module, onChange, onDelete }: Props) {
  const result = calculateRequiredAverage(module.assessments, module.targetGrade);
  const config = statusConfig[result.status];

  function updateAssessment(index: number, patch: Partial<Assessment>) {
    const assessments = module.assessments.map((a, i) =>
      i === index ? { ...a, ...patch } : a
    );
    onChange({ ...module, assessments });
  }

  function addAssessment() {
    onChange({
      ...module,
      assessments: [...module.assessments, { name: "", weight: 0, mark: null }],
    });
  }

  function removeAssessment(index: number) {
    onChange({
      ...module,
      assessments: module.assessments.filter((_, i) => i !== index),
    });
  }

  const totalWeight = module.assessments.reduce((sum, a) => sum + (a.weight || 0), 0);

  return (
    <section className="border-t border-[var(--rule)] py-6 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <input
            className="w-full bg-transparent font-[family-name:var(--font-serif)] text-xl text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
            value={module.name}
            placeholder="Module name"
            data-testid="module-name"
            onChange={(e) => onChange({ ...module, name: e.target.value })}
          />
          <div className="mt-1 flex items-baseline gap-1.5 font-[family-name:var(--font-sans)] text-sm text-[var(--ink-muted)]">
            <span>Target</span>
            <input
              type="number"
              className="w-12 border-b border-[var(--rule)] bg-transparent text-center font-[family-name:var(--font-mono)] text-[var(--navy)] outline-none"
              value={module.targetGrade}
              data-testid="target-grade"
              onChange={(e) =>
                onChange({ ...module, targetGrade: Number(e.target.value) })
              }
            />
            <span>%</span>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-sm text-[var(--ink-muted)] hover:text-[var(--danger-text)]"
          aria-label="Delete module"
        >
          Remove
        </button>
      </div>

      <div className="mt-4" data-testid="assessment-list">
        {module.assessments.length > 0 && (
          <div className="grid grid-cols-[1fr_5rem_5rem_2rem] gap-2 pb-1 font-[family-name:var(--font-sans)] text-xs uppercase tracking-wide text-[var(--ink-muted)]">
            <span>Assessment</span>
            <span className="text-right">Weight</span>
            <span className="text-right">Mark</span>
            <span></span>
          </div>
        )}
        {module.assessments.map((a, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_5rem_5rem_2rem] items-center gap-2 border-t border-[var(--rule)] py-1.5"
            data-testid="assessment-row"
          >
            <input
              className="bg-transparent text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
              placeholder="Untitled"
              value={a.name}
              data-testid="assessment-name"
              onChange={(e) => updateAssessment(i, { name: e.target.value })}
            />
            <div className="flex items-center justify-end gap-1">
              <input
                type="number"
                className="w-12 bg-transparent text-right font-[family-name:var(--font-mono)] text-[var(--ink)] outline-none"
                placeholder="0"
                value={a.weight || ""}
                data-testid="assessment-weight"
                onChange={(e) =>
                  updateAssessment(i, { weight: Number(e.target.value) })
                }
              />
              <span className="text-[var(--ink-muted)]">%</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <input
                type="number"
                className="w-12 bg-transparent text-right font-[family-name:var(--font-mono)] text-[var(--ink)] outline-none"
                placeholder="—"
                value={a.mark ?? ""}
                data-testid="assessment-mark"
                onChange={(e) =>
                  updateAssessment(i, {
                    mark: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
              <span className="text-[var(--ink-muted)]">%</span>
            </div>
            <button
              onClick={() => removeAssessment(i)}
              className="text-right text-[var(--ink-muted)] hover:text-[var(--danger-text)]"
              aria-label="Remove assessment"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addAssessment}
          className="mt-2 font-[family-name:var(--font-sans)] text-sm text-[var(--navy)] hover:underline"
        >
          + Add assessment
        </button>
        {totalWeight !== 100 && module.assessments.length > 0 && (
          <p className="mt-1 font-[family-name:var(--font-sans)] text-xs text-[var(--tight-text)]">
            Weights add up to {totalWeight}%, not 100% — results may be off until this
            is fixed.
          </p>
        )}
      </div>

      <div
        className="mt-4 flex items-center justify-between gap-3 border-l-4 py-2 pl-3 font-[family-name:var(--font-sans)]"
        style={{ borderColor: config.textVar, background: config.tintVar }}
        data-testid="result-box"
      >
        <div>
          <p className="font-semibold" style={{ color: config.textVar }}>
            {config.label}
          </p>
          <p className="text-sm opacity-80" style={{ color: config.textVar }}>
            {config.description}
          </p>
        </div>
        {result.requiredAverageOnRemaining !== null && (
          <p
            className="whitespace-nowrap font-[family-name:var(--font-mono)] text-2xl font-semibold"
            style={{ color: config.textVar }}
          >
            {Math.max(0, result.requiredAverageOnRemaining).toFixed(1)}%
          </p>
        )}
      </div>
    </section>
  );
}
