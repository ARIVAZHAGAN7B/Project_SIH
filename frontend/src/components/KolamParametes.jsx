import React from "react";

export const KolamParametes = ({
        setSize, 
        size, 
        setAnimationState, 
        animationSpeed, 
        animationDuration, 
        currentPattern,
        animationState,
        setAnimationSpeed,
        generatePattern
    }) => {
  return (
    <div className="bg-black\20 border-1 border-white rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-amber-100 flex items-center">
        {/* <span className="mr-2">⚙️</span> */}
        Kolam Parameters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Size Parameter */}
        <div className="parameter-group">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-amber-100 mb-2"
          >
            Grid Size
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="size"
              type="range"
              min="3"
              max="15"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="flex-1"
              style={{ accentColor: "#f0c75e" }}
            />
            <div className="bg-[#f0c75e] px-3 py-1 rounded text-[#0f172a] min-w-[3rem] text-center">
              {size}
            </div>
          </div>
          <div className="text-xs text-amber-100 mt-1">
            Creates a {size}x{size} pattern grid
          </div>
        </div>

        {/* Animation Speed Parameter */}
        <div className="parameter-group">
          <label
            htmlFor="animationSpeed"
            className="block text-sm font-medium text-amber-100 mb-2"
          >
            Animation Duration
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="animationSpeed"
              type="range"
              min="1"
              max="10"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              className="flex-1"
              style={{ accentColor: "#f0c75e" }}
            />
            <div className="bg-[#f0c75e] px-3 py-1 rounded text-[#0f172a] min-w-[3rem] text-center">
              {animationSpeed}
            </div>
          </div>
          <div className="text-xs text-amber-100 mt-1">
            Total: {(animationDuration / 1000).toFixed(1)}s
          </div>
        </div>

        {/* Auto-animate Parameter */}
        {/* <div className="parameter-group">
							<label htmlFor="autoAnimate" className="block text-sm font-medium text-amber-100 mb-2">
								Auto-animate
							</label>
							<div className="flex items-center space-x-3">
								<label className="flex items-center cursor-pointer">
									<input
										id="autoAnimate"
										type="checkbox"
										checked={initialAutoAnimate}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialAutoAnimate(e.target.checked)}
										className="sr-only"
									/>
									<div className={`relative w-12 h-6 rounded-full transition-colors ${initialAutoAnimate ? 'bg-amber-400' : 'bg-amber-700'}`}>
										<div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${initialAutoAnimate ? 'translate-x-6' : 'translate-x-0'}`}></div>
									</div>
									<span className="ml-3 text-amber-100 font-medium">
										{initialAutoAnimate ? 'On' : 'Off'}
									</span>
								</label>
							</div>
							<div className="text-xs text-amber-100 mt-1">
								Auto-play animation on generate
							</div>
						</div> */}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6">
        {currentPattern && (
          <button
            onClick={() => {
              if (animationState === "playing") {
                setAnimationState("stopped");
              } else {
                setAnimationState("playing");
              }
            }}
            className="px-6 py-3 bg-[#432dd7] border-2 border-white text-white rounded-lg hover:bg-[#f0c75e] transition-colors cursor-pointer font-medium shadow-lg flex items-center gap-2"
            style={{
              backgroundColor:
                animationState === "playing" ? "#f0c75e" : undefined,
              color: animationState === "playing" ? "#92400e" : undefined,
            }}
            title={
              animationState === "playing" ? "Stop Animation" : "Play Animation"
            }
          >
            {/* {animationState === "playing" ? "⏹️" : "▶️"} */}
            {animationState === "playing" ? "Stop Animation" : "Play Animation"}
          </button>
        )}

        <button
          onClick={generatePattern}
          className="px-8 py-3 border-2 border-white text-white rounded-lg hover:opacity-90 transition-colors font-medium shadow-lg cursor-pointer"
          style={{ backgroundColor: "#432dd7" }}
        >
          Generate Kolam
        </button>
      </div>
    </div>
  );
};
