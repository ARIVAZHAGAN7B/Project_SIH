import React, { useState } from "react";
import {
  Kolam_Gen1,
  Kolam_Gen2,
  Kolam_Gen3,
  Kolam_Gen4,
  Kolam_Gen5,
  Kolam_Gen6,
  Kolam_Gen7,
} from "../assets/Assets";

import {KolamGeneratorInputs, KolamDisplay, KolamVariations} from "../components/Generator";

const KolamAIGenerator = () => {
  const [gridSize, setGridSize] = useState(10);
  const [dotDensity, setDotDensity] = useState(5);
  const [symmetryType, setSymmetryType] = useState("Rotational");
  const [randomnessLevel, setRandomnessLevel] = useState(50);

  const handleGenerate = () => {
    console.log("Generating new kolam with parameters:", {
      gridSize,
      dotDensity,
      symmetryType,
      randomnessLevel,
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
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
      style={{
        "--primary-color": "#1919e6",
        "--secondary-color": "#242447",
        "--background-color": "#111122",
        "--text-color": "#ffffff",
        "--subtle-text-color": "#9393c8",
      }}
    >
      <main className="grid flex-1 grid-cols-1 gap-8 p-8 lg:grid-cols-3 xl:grid-cols-4 bg-[var(--background-color)] text-[var(--text-color)]">
        {/* Left Sidebar */}
        <KolamGeneratorInputs
          gridSize={gridSize}
          setGridSize={setGridSize}
          dotDensity={dotDensity}
          setDotDensity={setDotDensity}
          symmetryType={symmetryType}
          setSymmetryType={setSymmetryType}
          randomnessLevel={randomnessLevel}
          setRandomnessLevel={setRandomnessLevel}
          onGenerate={handleGenerate}
        />

        {/* Right Side */}
        <div className="flex flex-col gap-8 lg:col-span-2 xl:col-span-3">
          <KolamDisplay image={Kolam_Gen1} />
          <KolamVariations variations={kolamVariations} />
        </div>
      </main>
    </div>
  );
};

export default KolamAIGenerator;
