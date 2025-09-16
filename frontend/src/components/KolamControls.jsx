import React from "react";

const KolamControls = ({ kolam, handleChange }) => {
  return (
    <div className="ml-40 flex w-[500px] flex-col gap-10 bg-[#1a1a32] text-white p-6 rounded-lg shadow-lg space-y-2">
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
          min="1"
          max="7"
          value={kolam.tnumber}
          onChange={(e) => {
            const val = e.target.value;
            // allow empty string while typing
            if (val === "") {
              handleChange("tnumber", "");
              return;
            }

            const num = +val;
            // allow 1-7 without blocking
            if (num >= 1 && num <= 7) {
              handleChange("tnumber", num);
            }
          }}
          onBlur={(e) => {
            let val = +e.target.value;
            if (isNaN(val) || val < 1) val = 1;
            if (val > 7) val = 7;
            handleChange("tnumber", val);
          }}
          className="w-full rounded-md px-3 py-2 text-black focus:ring-2 bg-yellow-50 focus:ring-indigo-500"
        />
      </div>

      {/* Rotation */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Rotation
        </label>
        <input
          type="range"
          min={-15 * Math.PI}   // -360 degrees
          max={15 * Math.PI}    // +360 degrees
          step={Math.PI / 36}  // 5° steps
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
