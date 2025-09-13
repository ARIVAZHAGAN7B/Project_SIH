
import React from "react";
=======
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Kolam_Gen1,
  Kolam_Gen2,
  Kolam_Gen3,
  Kolam_Gen4,
  Kolam_Gen5,
  Kolam_Gen6,
  Kolam_Gen7,
} from '../assets/Assets';


const KolamAIGenerator = () => {
  const [gridSize, setGridSize] = useState(10);
  const [dotDensity, setDotDensity] = useState(5);
  const [symmetryType, setSymmetryType] = useState('Rotational');
  const [randomnessLevel, setRandomnessLevel] = useState(50);

  const handleGenerate = () => {
    // Generate new kolam logic would go here
    console.log('Generating new kolam with parameters:', {
      gridSize,
      dotDensity,
      symmetryType,
      randomnessLevel
    });
  };
  
const kolamVariations = [
  Kolam_Gen2,
  Kolam_Gen3,
  Kolam_Gen4,
  Kolam_Gen5,
  Kolam_Gen6,
  Kolam_Gen7,
];
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

    <div 
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
      style={{
        '--primary-color': '#1919e6',
        '--secondary-color': '#242447',
        '--background-color': '#111122',
        '--text-color': '#ffffff',
        '--subtle-text-color': '#9393c8'
      }}
    >
      {/* Header */}
       

      {/* Main Content */}
      <main className="grid flex-1 grid-cols-1 gap-8 p-8 lg:grid-cols-3 xl:grid-cols-4 bg-[var(--background-color)] text-[var(--text-color)]">
        {/* Left Sidebar - Parameters */}
        <div className="flex flex-col gap-8 lg:col-span-1 xl:col-span-1">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Kolam Generator</h1>
            <p className="text-base text-[var(--subtle-text-color)]">
              Create unique Kolam designs with AI. Adjust parameters to explore different patterns.
            </p>
          </div>
          
          {/* Parameters Panel */}
          <div className="flex flex-col gap-6 rounded-lg border border-[var(--secondary-color)] bg-black/20 p-6">
            <h3 className="text-xl font-bold">Parameters</h3>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Grid Size</span>
                <input 
                  className="w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-[var(--text-color)]" 
                  type="number" 
                  value={gridSize}
                  onChange={(e) => setGridSize(parseInt(e.target.value))}
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Dot Density</span>
                <input 
                  className="w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-[var(--text-color)]" 
                  type="number" 
                  value={dotDensity}
                  onChange={(e) => setDotDensity(parseInt(e.target.value))}
                />
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Symmetry Type</span>
                <select 
                  className="w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-[var(--text-color)]"
                  value={symmetryType}
                  onChange={(e) => setSymmetryType(e.target.value)}

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

              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Randomness Level</span>
                  <span className="text-sm text-[var(--subtle-text-color)]">{randomnessLevel}%</span>
                </div>
                <input 
                  className="w-full" 
                  type="range" 
                  value={randomnessLevel}
                  onChange={(e) => setRandomnessLevel(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          {/* Generate Button */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleGenerate}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold transition-transform hover:scale-105"
            >
              <span className="text-lg">🎲</span>

              <span>Generate New</span>
            </button>
          </div>
        </div>

      </div>


        {/* Right Side - Main Display and Variations */}
        <div className="flex flex-col gap-8 lg:col-span-2 xl:col-span-3">
          {/* Main Kolam Display */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--secondary-color)] bg-black/20">
            <img 
              alt="Generated Kolam design" 
              className="size-full object-cover" 
              src={Kolam_Gen1} 
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)]">
                <span className="text-lg">♡</span>
                <span>Favorite</span>
              </button>
              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)]">
                <span className="text-lg">⬇</span>
                <span>Export</span>
              </button>
              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold backdrop-blur-sm transition-transform hover:scale-105">
                <span className="text-lg">🖼</span>
                <span>Add to Gallery</span>
              </button>
            </div>
          </div>

          {/* Variations Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Variations</h3>
           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
  {kolamVariations.map((img, index) => (
    <div
      key={index}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
    >
      <img
        alt={`Kolam variation ${index + 1}`}
        className="size-full object-cover transition-transform group-hover:scale-110"
        src={img}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"></div>
    </div>
  ))}
</div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default KolamAIGenerator;
