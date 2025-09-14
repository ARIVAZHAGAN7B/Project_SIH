import React from "react";

const KolamControls = ({ kolam, handleChange }) => {
  return (
    <div className="flex gap-30 bg-[#1a1a32] text-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Title */}
      <h2 className="text-xl font-semibold">Controls</h2>

      {/* Tile Size */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tile Size <span className="text-gray-400">({kolam.tsize})</span>
        </label>
        <input
          type="range"
          min="30"
          max="60"
          value={kolam.tsize}
          onChange={(e) => handleChange("tsize", +e.target.value)}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Margin <span className="text-gray-400">({kolam.margin})</span>
        </label>
        <input
          type="range"
          min="2"
          max="200"
          value={kolam.margin}
          onChange={(e) => handleChange("margin", +e.target.value)}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Number of Tiles */}
      <div>
        <label className="block text-sm font-medium mb-1">Tiles</label>
        <input
          type="number"
          min="3"
          max="20"
          value={kolam.tnumber}
          onChange={(e) => handleChange("tnumber", +e.target.value)}
          className="w-full rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Rotation */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Rotation <span className="text-gray-400">({kolam.rotation.toFixed(2)})</span>
        </label>
        <input
          type="range"
          min="0"
          max={Math.PI * 2}
          step={Math.PI / 16}
          value={kolam.rotation}
          onChange={(e) => handleChange("rotation", +e.target.value)}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Refresh Rate */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Refresh Rate <span className="text-gray-400">({kolam.refreshRate})</span>
        </label>
        <input
          type="range"
          min="10"
          max="200"
          step="10"
          value={kolam.refreshRate}
          onChange={(e) => handleChange("refreshRate", +e.target.value)}
          className="w-full accent-indigo-500"
        />
      </div>
    </div>
  );
};

export default KolamControls;
