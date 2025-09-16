import React from "react";
import { KolamCanvas, StyleControls } from "../components/Redraw";
import { IosShare } from "../assets/Icons";

const RedrawKolam = () => {
    const handleClick = () => {
      
  }
  return (
    <div className="flex min-h-screen flex-col bg-[#111122] font-spaceGrotesk text-white">
      <main className="flex flex-1 gap-6 p-6">
        {/* Left side (Canvas + header) */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Redraw Kolam</h2>
          </div>
          <KolamCanvas handleClick={handleClick} />
        </div>

        {/* Right side (Style Controls) */}
        <StyleControls />
      </main>
    </div>
  );
};

export default RedrawKolam;
