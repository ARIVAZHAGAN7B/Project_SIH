import React from 'react'
import { AnalysisConsole, GraphVisualizations, ChartsPanel, ExportButton } from '../components/Analysis';
const KolamAnalysis = () =>  {
  return (
    <div className="bg-[#111122] min-h-screen text-white font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <div className="flex flex-col h-full">
        <main className="container mx-auto max-w-5xl flex-1 px-4 py-12">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight">Kolam Analysis</h1>
              <p className="mt-2 text-lg text-gray-400">
                Breaking down your design into its mathematical essence.
              </p>
            </div>

            <AnalysisConsole />
            <GraphVisualizations />
            <ChartsPanel />
            <div className="flex justify-end pt-6">
              <ExportButton />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KolamAnalysis;
