import {
  Kolam_Gen1,
  Kolam_Gen2,
  Kolam_Gen3,
  Kolam_Gen4,
  Kolam_Gen5,
  Kolam_Gen6,
  Kolam_Gen7,
} from "../assets/Assets";
import Button from "./Button";
import TransitionButtons from "./TransitionButtons";
import { AddGallery, FileDownload, Favorite} from "../assets/Icons";
/* -------------------- Inputs Component -------------------- */
const KolamGeneratorInputs = ({
  gridSize,
  setGridSize,
  dotDensity,
  setDotDensity,
  symmetryType,
  setSymmetryType,
  randomnessLevel,
  setRandomnessLevel,
  onGenerate,
}) => {
  return (
    <div className="flex flex-col gap-8 lg:col-span-1 xl:col-span-1">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Kolam Generator</h1>
        <p className="text-base text-[var(--subtle-text-color)]">
          Create unique Kolam designs with AI. Adjust parameters to explore
          different patterns.
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

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Randomness Level</span>
              <span className="text-sm text-[var(--subtle-text-color)]">
                {randomnessLevel}%
              </span>
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
        <Button
          props="Generate New"
          onClick={onGenerate}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold transition-transform hover:scale-105"
        />
      </div>
    </div>
  );
};

/* -------------------- Display Component -------------------- */
const KolamDisplay = ({ image }) => {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--secondary-color)] bg-black/20">
      <img
        alt="Generated Kolam design"
        className="size-full object-cover"
        src={image}
      />

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)] cursor-pointer">
          <span className="text-lg"><Favorite/></span>
          <span>Favorite</span>
        </button>
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)] cursor-pointer">
          <span className="text-lg"><FileDownload sx={{height:25}}/></span>
          <span>Export</span>
        </button>
        <TransitionButtons className="bg-[var(--primary-color)] hover:scale-105 transition-transform">
          <span className="text-lg">
            <AddGallery />
          </span>
          <span>Add to Gallery</span>
        </TransitionButtons>
      </div>
    </div>
  );
};

/* -------------------- Variations Component -------------------- */
const KolamVariations = ({ variations, onSelect }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Variations</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {variations.map((img, index) => (
          <div
            key={index}
            onClick={() => onSelect(img)}
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
  );
};

export { KolamGeneratorInputs, KolamDisplay, KolamVariations };
