import React from "react";
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import redraw_kolam from '../assets/redraw_kolam.png';
import {IosShare,PlayArrow } from "../assets/Icons"
const RedrawKolam = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#111122] font-spaceGrotesk text-white">
    

      <main className="flex flex-1 gap-6 p-6">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Redraw Kolam</h2>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
                <span className="material-symbols-outlined"><IosShare /></span>
                Export
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center rounded-lg bg-black/20 overflow-hidden">
           <img
  alt="Kolam design"
  className="w-full h-full object-contain"
  src={redraw_kolam}   // ✅ use imported image here
/>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 rounded-full bg-black/50 backdrop-blur-sm">
              <button className="flex items-center justify-center  align-bottom rounded-full size-12 text-white hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-4xl mb-2 ">
                 <FastRewindIcon  />
                </span>
              </button>
              <button className="flex items-center justify-center rounded-full size-16 bg-[var(--primary-color)] text-white hover:bg-opacity-90 transition-colors">
                <span className="material-symbols-outlined text-5xl mb-2 ">
                  <PlayArrow  fontSize="10" />
                </span>
              </button>
              <button className="flex items-center justify-center rounded-full size-12 text-white hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined text-4xl mb-2 ">
                 <FastForwardIcon  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <aside className="flex flex-col w-[360px] bg-[#1a1a32] rounded-lg p-6 gap-6">
          <h3 className="text-xl font-bold">Style Controls</h3>

          <div className="space-y-4">
            <label className="text-sm font-medium">Line Thickness</label>
            <div className="flex items-center gap-4">
              <input
                className="w-full h-2 bg-[#343465] rounded-lg appearance-none cursor-pointer accent-[var(--primary-color)]"
                type="range"
                min="1"
                max="10"
                value="2"
              />
              <span className="text-sm font-mono p-2 rounded-md bg-[#111122]">
                2px
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="dot-style">
              Dot Style
            </label>
            <select
              id="dot-style"
              className="form-select w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
            >
              <option>Solid</option>
              <option>Hollow</option>
              <option>Square</option>
            </select>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Color</p>
            <div className="flex flex-wrap gap-3">
              <label
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: "#ffffff" }}
              >
                <input
                  className="sr-only"
                  name="color"
                  type="radio"
                  value="white"
                  defaultChecked
                />
              </label>
              <label
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: "#ff4d4d" }}
              >
                <input className="sr-only" name="color" type="radio" value="red" />
              </label>
              <label
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: "#4da6ff" }}
              >
                <input className="sr-only" name="color" type="radio" value="blue" />
              </label>
              <label
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: "#4dff88" }}
              >
                <input
                  className="sr-only"
                  name="color"
                  type="radio"
                  value="green"
                />
              </label>
              <label
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: "#ffff4d" }}
              >
                <input
                  className="sr-only"
                  name="color"
                  type="radio"
                  value="yellow"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="stroke-texture">
              Stroke Texture
            </label>
            <select
              id="stroke-texture"
              className="form-select w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
            >
              <option>Solid</option>
              <option>Chalk</option>
              <option>Rice Flour</option>
              <option>Charcoal</option>
            </select>
          </div>

          <div className="mt-auto space-y-4">
            <h4 className="text-sm font-medium">Export Options</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
                <span>PNG</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
                <span>SVG</span>
              </button>
              <button className="col-span-2 flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
                <span>Animated GIF</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RedrawKolam;
