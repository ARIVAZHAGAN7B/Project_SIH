import {
  Kolam_Gen1,
  Kolam_Gen2,
  Kolam_Gen3,
  Kolam_Gen4,
  Kolam_Gen5,
  Kolam_Gen6,
  Kolam_Gen7,
  kolgal10,
} from "../assets/Assets";
import Button from "./Button";
import TransitionButtons from "./TransitionButtons";
import { generateSVGPath } from "../utils/svgPathGenerator";
import ServiceButton from "./ServiceButton";
/* -------------------- Inputs Component -------------------- */

const KolamGeneratorInputs = ({
  gridSize,
  setGridSize,
  animationSpeed,
  setAnimationSpeed,
  animationDuration,
  animationState,
  setAnimationState,
  currentPattern,
  onGenerate,
}) => {
  return (
    <div className="flex flex-col gap-8 lg:col-span-1 xl:col-span-1">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Kolam Generator</h1>
        <p className="text-base text-[var(--subtle-text-color)]">
          Create unique Kolam designs. Adjust parameters to explore
          different patterns.
        </p>
      </div>

      {/* Parameters Panel */}
      <div className="flex flex-col gap-6 rounded-lg border border-[var(--secondary-color)] bg-black/20 p-6">
        <h3 className="text-xl font-bold">Parameters</h3>
        <div className="flex flex-col gap-4">
          {/* Grid Size */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Grid Size</span>
            <input
              className="w-full rounded-lg border-[var(--secondary-color)] bg-[var(--secondary-color)]/50 p-3 text-sm 
                         focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] text-[var(--text-color)]"
              type="number"
              min="3"
              max="15"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
            />
            <span className="text-xs text-[var(--subtle-text-color)]">
              Creates a {gridSize}x{gridSize} pattern grid
            </span>
          </label>

          {/* Animation Duration */}
          <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Animation Duration</span>
              <span className="text-sm text-[var(--subtle-text-color)]">
                {(animationDuration / 1000).toFixed(1)}s
              </span>
            </div>
            <input
              className="w-full"
              type="range"
              min="1"
              max="10"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {currentPattern && (
          <Button
            props={
              animationState === "playing" ? "⏹️ Stop Animation" : "▶️ Play Animation"
            }
            onClick={() =>
              setAnimationState(animationState === "playing" ? "stopped" : "playing")
            }
            className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-transform hover:scale-105 ${
              animationState === "playing"
                ? "bg-yellow-400 text-amber-900"
                : "bg-amber-900 text-white"
            }`}
          />
        )}

        <button
          onClick={onGenerate}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 text-sm font-bold transition-transform hover:scale-105"
        >Generate New</button>
      </div>
    </div>
  );
};

export default KolamGeneratorInputs;


/* -------------------- Display Component -------------------- */

const KolamDisplay = ({
  pattern = { dimensions: { width: 400, height: 300 }, dots: [], curves: [] },
  animate = false,
  animationState = "stopped",
  animationTiming = 150,
  className = "",
}) => {
  const { dimensions, dots, curves } = pattern;
  const handleAnalysis = () => {
    alert("Analysis feature coming soon!");
  }
  const calculatePathLength = (curvePoints) => {
    if (!curvePoints || curvePoints.length < 2) return 100;
    let length = 0;
    for (let i = 1; i < curvePoints.length; i++) {
      const dx = curvePoints[i].x - curvePoints[i - 1].x;
      const dy = curvePoints[i].y - curvePoints[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return Math.max(length, 50);
  };

  const calculateLineLength = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--secondary-color)] bg-black/20 ${className}`}>
      {/* SVG Kolam Display */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="absolute inset-0 w-full h-full"
        style={{ "--animation-duration": `${animationTiming}ms` }}
      >
        {dots.map((dot, index) => (
          <circle
            key={dot.id}
            cx={dot.center.x}
            cy={dot.center.y}
            r={dot.radius || 3}
            fill={dot.filled ? dot.color || "white" : "none"}
            stroke={dot.color || "white"}
            strokeWidth={dot.filled ? 0 : 1}
            className={animate ? "kolam-dot-animated" : "kolam-dot"}
            style={
              animate
                ? {
                    animationDelay: `${(index / dots.length) * animationTiming * 0.9}ms`,
                    animationDuration: `${animationTiming / dots.length}ms`,
                    opacity: 0,
                    animationPlayState: animationState === "paused" ? "paused" : "running",
                  }
                : animationState === "stopped"
                ? { opacity: 1 }
                : {}
            }
          />
        ))}

        {curves.map((curve, index) => {
          const lineAnimTime = (animationTiming / curves.length) * 3;
          const curveDelay = lineAnimTime * 0.33 * index;

          if (curve.curvePoints && curve.curvePoints.length > 1) {
            const pathLength = calculatePathLength(curve.curvePoints);
            return (
              <path
                key={curve.id}
                d={generateSVGPath(curve.curvePoints)}
                stroke={curve.color || "white"}
                strokeWidth={curve.strokeWidth || 2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={animate ? "kolam-path-animated" : "kolam-path"}
                style={
                  animate
                    ? {
                        animationDelay: `${curveDelay}ms`,
                        animationDuration: `${lineAnimTime}ms`,
                        strokeDasharray: `${pathLength}`,
                        strokeDashoffset: `${pathLength}`,
                        animationPlayState: animationState === "paused" ? "paused" : "running",
                      }
                    : animationState === "stopped"
                    ? { strokeDasharray: "none", strokeDashoffset: "0", opacity: 1 }
                    : {}
                }
              />
            );
          } else {
            const lineLength = calculateLineLength(curve.start.x, curve.start.y, curve.end.x, curve.end.y);
            return (
              <line
                key={curve.id}
                x1={curve.start.x}
                y1={curve.start.y}
                x2={curve.end.x}
                y2={curve.end.y}
                stroke={curve.color || "white"}
                strokeWidth={curve.strokeWidth || 2}
                strokeLinecap="round"
                className={animate ? "kolam-line-animated" : "kolam-line"}
                style={
                  animate
                    ? {
                        animationDelay: `${curveDelay}ms`,
                        animationDuration: `${lineAnimTime}ms`,
                        strokeDasharray: `${lineLength}`,
                        strokeDashoffset: `${lineLength}`,
                        animationPlayState: animationState === "paused" ? "paused" : "running",
                      }
                    : animationState === "stopped"
                    ? { strokeDasharray: "none", strokeDashoffset: "0", opacity: 1 }
                    : { opacity: 0 }
                }
              />
            );
          }
        })}
      </svg>

      {/* Bottom-right buttons */}
      <ServiceButton/>

      {/* CSS Animations */}
      <style jsx>{`
        .kolam-dot-animated {
          animation: fadeIn ease-in-out forwards;
        }
        .kolam-line-animated,
        .kolam-path-animated {
          animation: drawPath ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        .kolam-svg {
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
        }
        .kolam-path,
        .kolam-line { transition: stroke-width 0.2s ease; }
        .kolam-path:hover,
        .kolam-line:hover { stroke-width: 3; }
      `}</style>
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
