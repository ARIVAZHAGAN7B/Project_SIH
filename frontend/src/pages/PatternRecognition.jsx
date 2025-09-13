import React, { useState } from 'react';
import { FileUpload, FileDownload, IosShare } from "../assets/Icons";

const PatternRecognition = () => {
  const [processingProgress, setProcessingProgress] = useState(50);
  const [symmetryDetection, setSymmetryDetection] = useState('Enabled');
  const [motifRecognition, setMotifRecognition] = useState('Enabled');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleProcessing = () => {
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111122] text-white font-['Space_Grotesk'] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">

        {/* Main Content */}
        <main className="flex flex-1 justify-center py-16 px-4">
          <div className="flex w-full max-w-5xl flex-col gap-8">
            {/* Hero Section */}
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-white text-4xl font-bold leading-tight tracking-tighter font-['Space_Grotesk']">
                Upload and Detect Kolam Patterns
              </h1>
              <p className="text-white/80 max-w-2xl text-lg font-['Noto_Sans']">
                Our AI-powered tool helps you analyze Kolam designs. Upload an
                image to identify patterns, symmetry, and motifs within seconds.
              </p>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#343465] px-6 py-16 hover:border-[#1919e6] transition-colors">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#242447]">
                  <span className="material-symbols-outlined text-5xl text-white mb-2">
                    <FileUpload fontSize='14' />
                  </span>
                </div>
                <p className="text-white text-xl font-bold leading-tight tracking-[-0.015em] font-['Space_Grotesk']">
                  Drag and drop an image here, or click to browse
                </p>
                <p className="text-white/70 text-base font-['Noto_Sans']">
                  Supported formats: JPG, PNG, WEBP
                </p>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#242447] text-white text-base font-bold hover:bg-[#2a2a50] transition-colors font-['Noto_Sans']"
              >
                Browse Files
              </label>
              {uploadedFile && (
                <p className="text-[#1919e6] text-sm font-medium font-['Noto_Sans']">
                  Selected: {uploadedFile.name}
                </p>
              )}
            </div>

            {/* Processing and Settings */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Processing */}
              <div className="flex flex-col gap-4 rounded-lg bg-[#1a1a32] p-6">
                <h3 className="text-white text-xl font-bold font-['Space_Grotesk']">Processing</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 text-base font-medium font-['Noto_Sans']">
                      Processing Image
                    </p>
                    <p className="text-[#9393c8] text-base font-medium font-['Noto_Sans']">
                      {processingProgress}%
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#343465]">
                    <div 
                      className="h-full rounded-full bg-[#1919e6] transition-all duration-300" 
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="flex flex-col gap-4 rounded-lg bg-[#1a1a32] p-6">
                <h3 className="text-white text-xl font-bold font-['Space_Grotesk']">Advanced Settings</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-white text-base font-medium font-['Noto_Sans']">Symmetry Detection</span>
                    <select 
                      className="form-select w-full rounded-lg border border-[#343465] bg-[#111122] p-3 text-white focus:border-[#1919e6] focus:ring-[#1919e6] font-['Noto_Sans']"
                      value={symmetryDetection}
                      onChange={(e) => setSymmetryDetection(e.target.value)}
                    >
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-white text-base font-medium font-['Noto_Sans']">Motif Recognition</span>
                    <select 
                      className="form-select w-full rounded-lg border border-[#343465] bg-[#111122] p-3 text-white focus:border-[#1919e6] focus:ring-[#1919e6] font-['Noto_Sans']"
                      value={motifRecognition}
                      onChange={(e) => setMotifRecognition(e.target.value)}
                    >
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </label>
                </div>
                <button 
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-[#1919e6] text-white text-base font-bold hover:bg-[#1515cc] transition-colors font-['Noto_Sans']"
                  onClick={handleProcessing}
                >
                  Start Processing
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex flex-col gap-8">
              <h2 className="text-center text-3xl font-bold text-white font-['Space_Grotesk']">Results</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">Original Image</h3>
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <img 
                      alt="Original Kolam" 
                      className="h-full w-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB7lihYTln6MmxKs-K_Ned0W0idfNIhkXOgOmeUZzw-TqEyyGeabEH4BP4lXt26Q2XLucUWSIvAfH_QvnDJRsMmo60HlxLKT0QhA6SXc0rs5TPjOCSOQLrRbCCZ_4yOr-CdK8wAoNfUfoaERB5l2aasJCsT_GHoyTfFljWMIQuOIYIvkfdN19Vh0Pb-yNBddjNsJutOMG_d29WYXBo32aPKrzo8x-gK2knOx1V2LUvQRqpGEcFZ7Ry589QzMM4xUSuieH77A8_FeM"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">Recognized Pattern</h3>
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <img 
                      alt="Recognized Kolam Pattern" 
                      className="h-full w-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKLXA-rKYEOTfrrVLlTcDZAtxMxBrHTw8mbU_GEWGr6g7qxhmtorQxMd9qOJJt6U_2vobifMMNyqnVlmJ31x6n_SaVF42qx175i-OKLTiD_o7Tn9bE86yHi-3SbSqysAW5XtMzA3Wj5CTXJjByA2iBo5V4TSFrdkadjB91Xxyc_sES29AkqUgFp1RL7QMOuh0yTGsKz9PXTxVjL_z8RCPH_qdXXqRF34t4EWx1Ad1mFsP-sz3azt3d3RJDO_QjnmTN2jkndsEwMNg"
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-11 bg-[#242447] px-6 text-base font-bold text-white hover:bg-[#2a2a50] transition-colors font-['Noto_Sans']">
                  <span className="material-symbols-outlined"><FileDownload /></span>
                  <span className="truncate">Download</span>
                </button>
                <button className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-11 bg-[#1919e6] px-6 text-base font-bold text-white hover:bg-[#1515cc] transition-colors font-['Noto_Sans']">
                  <span className="material-symbols-outlined"><IosShare /></span>
                  <span className="truncate">Share</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatternRecognition;
