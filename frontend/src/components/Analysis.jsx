import { useState } from "react";
import { kolam_Analysis } from "../assets/Assets";
import { Download, ArrowUpward } from "../assets/Icons";
import TransitionButtons from "./TransitionButtons";


export   function AnalysisConsole() {
  const data = [
    { label: "Symmetry Group", value: "D4 (Dihedral group of order 8)" },
    { label: "Repetition Factor", value: "4" },
    { label: "Stroke Count", value: "128" },
    { label: "Fractal Depth", value: "3" },
    { label: "Equations", value: "x^2 + y^2 = 1", fullWidth: true },
  ];

  return (
    <section className="rounded-xl border border-[#242447] bg-[#1a1a33]/50 p-8">
      <h2 className="mb-6 text-2xl font-bold">Analysis Console</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between border-t border-t-[#343465] pt-4 ${
              item.fullWidth ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-gray-400">{item.label}</p>
            <p className="font-mono rounded-md bg-[#242447] px-2 py-1 text-sm">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}




export   function GraphVisualizations() {
  const [activeTab, setActiveTab] = useState("Repeating Motifs");

  const tabs = ["Repeating Motifs", "Stroke Density"];
  const images = {
    "Repeating Motifs": kolam_Analysis,
    "Stroke Density":
      "https://dummyimage.com/600x400/242447/fff.png&text=Stroke+Density+Graph",
  };

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Graph Visualizations</h2>
      <div className="border-b border-[#343465]">
        <div className="flex gap-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-bold transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-white border-[var(--primary-color)]"
                  : "text-gray-400 border-transparent hover:text-white hover:border-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 aspect-[3/2] w-full overflow-hidden rounded-xl bg-[#1a1a33]/50 ring-1 ring-[#242447]">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[activeTab]})` }}
        />
      </div>
    </section>
  );
}

export  function ChartsPanel() {
  const bars = [50, 80, 30, 60, 90];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Charts Panel</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Symmetry Ratio */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#242447] bg-[#1a1a33]/50 p-6">
          <p className="font-medium">Symmetry Ratio</p>
          <p className="text-4xl font-bold tracking-tight">75%</p>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray-400">vs Average</p>
            <p className="font-medium text-green-400 flex items-center">
              <span className="material-symbols-outlined text-base"><ArrowUpward/></span>
              +5%
            </p>
          </div>
          <div className="h-[180px] w-full pt-4 relative">
            <div className="absolute bottom-0 left-0 right-0 h-3/4 rounded-t-md bg-[var(--primary-color)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-full rounded-t-md bg-[var(--primary-color)]/20"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <p>Symmetric</p>
            <p>Asymmetric</p>
          </div>
        </div>

        {/* Complexity vs Dot Count */}
        <div className="flex flex-col gap-4 rounded-xl border border-[#242447] bg-[#1a1a33]/50 p-6">
          <p className="font-medium">Complexity vs. Dot Count</p>
          <p className="text-4xl font-bold tracking-tight">High</p>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray-400">vs Average</p>
            <p className="font-medium text-green-400 flex items-center">
              <span className="material-symbols-outlined text-base"><ArrowUpward/></span>
              +10%
            </p>
          </div>
          <div className="grid h-[180px] grid-flow-col items-end gap-4 px-3 pt-4">
            {bars.map((h, idx) => (
              <div
                key={idx}
                className="chart-bar w-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="grid grid-flow-col gap-4 px-3 text-center text-xs text-gray-400">
            <p>1-20</p>
            <p>21-40</p>
            <p>41-60</p>
            <p>61-80</p>
            <p>81+</p>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ExportButton() {
  const handleExport = () => {
    alert("Report exported as PDF! (mock functionality)");
  };

  return (
    <TransitionButtons onClick={handleExport} className="h-12 px-6">
      <Download className="text-lg" />
      <span>Export Report (PDF)</span>
    </TransitionButtons>
  );
}

