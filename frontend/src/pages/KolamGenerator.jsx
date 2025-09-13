import React from "react";

const KolamGenerator = () => {
  return (
    <div>
      <div class="grid flex-1 grid-cols-1 gap-8 p-8 lg:grid-cols-3 xl:grid-cols-4">
        <div class="flex flex-col gap-8 lg:col-span-1 xl:col-span-1">
          {/* Sidebar */}
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold tracking-tight">Kolam Generator</h1>
            <p class="text-base text-[var(--subtle-text-color)]">
              Create unique Kolam designs with AI. Adjust parameters to explore
              different patterns.
            </p>
          </div>
          {/* Parameters */}
          <div
            class="flex flex-col gap-6 rounded-lg border border-[var(--secondary-color)] bg-black/20 p-6"
          >
            <h3 class="text-xl font-bold">Parameters</h3>
            <div class="flex flex-col gap-4">
              <label class="flex flex-col gap-2">
                <span class="text-sm font-medium">Grid Size</span>
                <input
                  class="form-input w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                  type="number"
                  value="10"
                />
              </label>
              <label class="flex flex-col gap-2">
                <span class="text-sm font-medium">Dot Density</span>
                <input
                  class="form-input w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                  type="number"
                  value="5"
                />
              </label>
              <label class="flex flex-col gap-2">
                <span class="text-sm font-medium">Symmetry Type</span>
                <select
                  class="form-select w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                >
                  <option>Rotational</option>
                  <option>Reflective</option>
                  <option>Translational</option>
                </select>
              </label>
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">Randomness Level</span>
                  <span class="text-sm text-[var(--subtle-text-color)]"
                    >50%</span>
                </div>
                <input class="w-full" type="range" value="50" />
              </div>
            </div>
          </div>
          {/* Generate New */}
          <div class="flex flex-col gap-2">
            <button
              class="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold transition-transform hover:scale-105"
            >
              <span class="material-symbols-outlined">shuffle</span>
              <span>Generate New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolamGenerator;
