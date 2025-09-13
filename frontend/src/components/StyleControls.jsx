import React, { useState } from "react";

export default function StyleControls() {
  const [lineThickness, setLineThickness] = useState(2);
  const [dotStyle, setDotStyle] = useState("Solid");
  const [color, setColor] = useState("white");
  const [strokeTexture, setStrokeTexture] = useState("Solid");

  return (
    <aside className="flex flex-col w-[360px] bg-[#1a1a32] rounded-lg p-6 gap-6">
      <h3 className="text-xl font-bold">Style Controls</h3>

      {/* Line Thickness */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Line Thickness</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="10"
            value={lineThickness}
            onChange={(e) => setLineThickness(e.target.value)}
            className="w-full h-2 bg-[#343465] rounded-lg appearance-none cursor-pointer accent-[var(--primary-color)]"
          />
          <span className="text-sm font-mono p-2 rounded-md bg-[#111122]">
            {lineThickness}px
          </span>
        </div>
      </div>

      {/* Dot Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="dot-style">
          Dot Style
        </label>
        <select
          id="dot-style"
          value={dotStyle}
          onChange={(e) => setDotStyle(e.target.value)}
          className="form-select w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
        >
          <option>Solid</option>
          <option>Hollow</option>
          <option>Square</option>
        </select>
      </div>

      {/* Color */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Color</p>
        <div className="flex flex-wrap gap-3">
          {[
            { val: "white", hex: "#ffffff" },
            { val: "red", hex: "#ff4d4d" },
            { val: "blue", hex: "#4da6ff" },
            { val: "green", hex: "#4dff88" },
            { val: "yellow", hex: "#ffff4d" },
          ].map((c) => (
            <label
              key={c.val}
              className={`relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all ${
                color === c.val ? "ring-[var(--primary-color)]" : ""
              }`}
              style={{ backgroundColor: c.hex }}
            >
              <input
                type="radio"
                name="color"
                value={c.val}
                checked={color === c.val}
                onChange={() => setColor(c.val)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Stroke Texture */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="stroke-texture">
          Stroke Texture
        </label>
        <select
          id="stroke-texture"
          value={strokeTexture}
          onChange={(e) => setStrokeTexture(e.target.value)}
          className="form-select w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
        >
          <option>Solid</option>
          <option>Chalk</option>
          <option>Rice Flour</option>
          <option>Charcoal</option>
        </select>
      </div>

      {/* Export Options */}
      <div className="mt-auto space-y-4">
        <h4 className="text-sm font-medium">Export Options</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
            PNG
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
            SVG
          </button>
          <button className="col-span-2 flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
            Animated GIF
          </button>
        </div>
      </div>
    </aside>
  );
}
