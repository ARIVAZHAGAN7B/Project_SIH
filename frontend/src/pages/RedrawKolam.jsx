import React from "react";
import { KolamCanvas, StyleControls } from "../components/Redraw";
import { IosShare } from "../assets/Icons";

const RedrawKolam = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#111122] font-spaceGrotesk text-white">
      <main className="flex flex-1 gap-6 p-6">
        {/* Left side (Canvas + header) */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Redraw Kolam</h2>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
                <IosShare /> Export
              </button>
            </div>
          </div>
          <KolamCanvas />
        </div>

        {/* Right side (Style Controls) */}
        <StyleControls />
      </main>
    </div>
  );
};

export default RedrawKolam;
