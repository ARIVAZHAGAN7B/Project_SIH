import React from "react";

const KolamSketchInput = () => {
  return (
    <div className="flex">
      {/* Canvas */}
      <div ref={sketchRef} className="flex-1" />

      {/* React Control Panel */}
      <div className="w-64 p-4 bg-gray-900 text-white">
        <h2 className="text-lg font-bold mb-4">Controls</h2>

        <label className="block mb-2">
          Size: {kolam.tsize}
          <input
            type="range"
            min="30"
            max="60"
            value={kolam.tsize}
            onChange={(e) => handleChange("tsize", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Margin: {kolam.margin}
          <input
            type="range"
            min="2"
            max="200"
            value={kolam.margin}
            onChange={(e) => handleChange("margin", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Tiles: {kolam.tnumber}
          <input
            type="number"
            min="3"
            max="20"
            value={kolam.tnumber}
            onChange={(e) => handleChange("tnumber", +e.target.value)}
            className="w-full text-black"
          />
        </label>

        <label className="block mb-2">
          Rotation: {kolam.rotation.toFixed(2)}
          <input
            type="range"
            min="0"
            max={Math.PI * 2}
            step={Math.PI / 16}
            value={kolam.rotation}
            onChange={(e) => handleChange("rotation", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Refresh Rate: {kolam.refreshRate}
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={kolam.refreshRate}
            onChange={(e) => handleChange("refreshRate", +e.target.value)}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default KolamSketchInput;
