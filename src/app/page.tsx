"use client";

import { useEffect, useState } from "react";
import ModuleCard from "@/components/ModuleCard";
import { Module, loadModules, saveModules, newId } from "@/lib/storage";
import MathDecoration from "@/components/MathDecoration";

export default function Home() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setModules(loadModules());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveModules(modules);
  }, [modules, loaded]);

  function addModule() {
    setModules([
      ...modules,
      { id: newId(), name: "New module", targetGrade: 50, assessments: [] },
    ]);
  }

  function updateModule(id: string, updated: Module) {
    setModules(modules.map((m) => (m.id === id ? updated : m)));
  }

  function deleteModule(id: string) {
    setModules(modules.filter((m) => m.id !== id));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--paper)]">
      <MathDecoration />
      <div className="relative mx-auto max-w-2xl px-6 py-14 lg:max-w-3xl">
        <header className="mb-10 border-b border-[var(--rule)] pb-6">
          <p className="font-[family-name:var(--font-sans)] text-xs uppercase tracking-wide text-[var(--ink-muted)]">
            Grade report
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-serif)] text-3xl text-[var(--ink)]">
            Grade Target Calculator
          </h1>
          <p className="mt-2 max-w-md font-[family-name:var(--font-sans)] text-[var(--ink-muted)]">
            Add a module, set a target, and see exactly what average you need on
            what&apos;s left.
          </p>
        </header>

        <div>
          {modules.map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              onChange={(updated) => updateModule(m.id, updated)}
              onDelete={() => deleteModule(m.id)}
            />
          ))}
        </div>

        <button
          onClick={addModule}
          className="mt-6 w-full border border-dashed border-[var(--rule)] py-4 font-[family-name:var(--font-sans)] text-[var(--ink-muted)] hover:border-[var(--navy)] hover:text-[var(--navy)]"
        >
          + Add module
        </button>

        {modules.length === 0 && loaded && (
          <p className="mt-4 text-center font-[family-name:var(--font-sans)] text-sm text-[var(--ink-muted)]">
            No modules yet — add your first one above.
          </p>
        )}
      </div>
    </main>
  );
}
