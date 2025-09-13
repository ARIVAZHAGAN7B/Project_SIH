import React from "react";

const KolamGeneratorFilter = () => {
  return (
    <div>
      <div className="flex flex-col gap-8 lg:col-span-1 xl:col-span-1">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Kolam Generator</h1>
          <p className="text-base text-[var(--subtle-text-color)]">
            Create unique Kolam designs with AI. Adjust parameters to explore
            different patterns.
          </p>
        </div>
        <div className="flex flex-col gap-6 rounded-lg border border-[var(--secondary-color)] bg-black/20 p-6">
          <h3 className="text-xl font-bold">Parameters</h3>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Grid Size</span>
              <input
                className="form-input w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                type="number"
                value="10"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Dot Density</span>
              <input
                className="form-input w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                type="number"
                value="5"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Symmetry Type</span>
              <select className="form-select w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]">
                <option>Rotational</option>
                <option>Reflective</option>
                <option>Translational</option>
              </select>
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Randomness Level</span>
                <span className="text-sm text-[var(--subtle-text-color)]">50%</span>
              </div>
              <input className="w-full" type="range" value="50" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold transition-transform hover:scale-105">
            <span className="material-symbols-outlined">shuffle</span>
            <span>Generate New</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KolamGeneratorFilter;
