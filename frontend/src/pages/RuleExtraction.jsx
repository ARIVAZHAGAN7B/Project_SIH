import React, { useState } from 'react';
import {ContentCopy} from "../assets/Icons"
import { InputSection } from '../components/RecognizedPattern';

const RuleExtraction = () => {
  const [selectedTab, setSelectedTab] = useState('pseudo-code');
  const [selectedKolam, setSelectedKolam] = useState('');
  const [extractedRules, setExtractedRules] = useState('');

  const tabs = [
    { id: 'pseudo-code', label: 'Pseudo-code' },
    { id: 'python', label: 'Python' },
    { id: 'json', label: 'JSON' }
  ];

  const tabContent = {
    'pseudo-code': `function drawLine(start, end) { ... }
function applySymmetry(pattern) { ... }
// ... more pseudo-code`,
    'python': `def draw_line(start, end):
    # Implementation here
    pass

def apply_symmetry(pattern):
    # Implementation here
    pass`,
    'json': `{
  "rules": [
    {
      "type": "line",
      "start": [0, 0],
      "end": [10, 10]
    },
    {
      "type": "symmetry",
      "axis": "vertical"
    }
  ]
}`
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111122] text-white font-['Space_Grotesk']">
    

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-bold tracking-tighter">Convert Pattern to Rules</h2>
            
            {/* Input Section */}
            <div className="bg-[#1a1a32] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Input</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="sr-only" htmlFor="kolam-select">
                    Select a Kolam
                  </label>
                  <select 
                    className="w-full h-12 px-4 rounded-lg bg-[#111122] border border-[#242447] focus:ring-2 focus:ring-[#1919e6] focus:border-[#1919e6] transition"
                    id="kolam-select"
                    value={selectedKolam}
                    onChange={(e) => setSelectedKolam(e.target.value)}
                  >
                    <option value="">Select a Recognized Kolam</option>
                    <option value="kolam1">Kolam 1</option>
                    <option value="kolam2">Kolam 2</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <hr className="w-full border-[#242447]" />
                  <span className="text-[#9393c8] text-sm">OR</span>
                  <hr className="w-full border-[#242447]" />
                </div>
              </div>
              
              <div className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-[#242447] rounded-lg p-12 text-center cursor-pointer hover:border-[#1919e6] hover:bg-[#111122] transition">
    <InputSection/>
              </div>
            </div>

            {/* Extraction Console */}
            <div className="bg-[#1a1a32] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Extraction Console</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="min-h-[200px]">
                  <textarea 
                    className="w-full h-full min-h-[200px] resize-none p-4 rounded-lg bg-[#111122] border border-[#242447] focus:ring-2 focus:ring-[#1919e6] focus:border-[#1919e6] transition"
                    placeholder="Detected rules will appear here..."
                    value={extractedRules}
                    onChange={(e) => setExtractedRules(e.target.value)}
                  />
                </div>
                <div 
                  className="min-h-[200px] bg-center bg-no-repeat bg-cover rounded-lg border border-[#242447]"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkfg8TNCV5h1YpufvbUekN2yhZblrtQwWP58Mkgx9FB5dFZJYrn4AANOPCL3sp4rd0vYZtM_WGLAW_yacM3bbBXhEj6Unbskm0ZeYHH7LosSsHhctKlKyb7gjl5gLLiyKmzSdGAz2uEDgF2tdDQVzOR43JLn1-G7lTAZl8zWwMEl50JQZuy8meeIg2k7wc_8UsIRgPOnY1EwaSZmULPaq95HrfovYoli2igFOx5m4QR14zpj0PHlApxZq96R74E_ndBooEs0_vRps")'
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full bg-black/20">
                    <span className="text-white font-bold">Flowchart Diagram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Preview */}
            <div className="bg-[#1a1a32] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3FtG8zxh1Ek6Lk9a2ilJgmQj7J4l61L3d1ajo0mcxcJsVxeFMOxDo8rqiHd82Z4KSAJ5JrPOF28Vtbtq0kuM72yuE9tjvU7tESoNc3lkYa7Kc4aPuBEqbBDglzPcBR-9pHaFk3Lb3hFej3IY5Bb_bKIkz8URv1nyIU7zEqyss1SdamKQaA0XmonTH2x97ugKIwmUbjd6hhJP2ZuMZUJzSUjtitXTzJOlFXUHPk8y__Vf1KWWbzHpu2vTzQ1Tf-pz-gIP7lD3gAO4")'
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <span className="material-symbols-outlined text-4xl">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="bg-[#1a1a32] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Export</h3>
              <div>
                <div className="border-b border-[#242447]">
                  <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                          selectedTab === tab.id
                            ? 'border-[#1919e6] text-[#1919e6]'
                            : 'border-transparent text-[#9393c8] hover:text-white hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="mt-4">
                  <textarea
                    className="w-full h-48 resize-none p-4 rounded-lg bg-[#111122] border border-[#242447] focus:ring-2 focus:ring-[#1919e6] focus:border-[#1919e6] transition text-sm"
                    readOnly
                    value={tabContent[selectedTab]}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-[#242447] hover:bg-[#1919e6] text-white font-bold text-sm rounded-lg transition-colors"
                    onClick={() => navigator.clipboard.writeText(tabContent[selectedTab])}
                  >
                    <span className="material-symbols-outlined text-base"><ContentCopy /></span>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RuleExtraction;