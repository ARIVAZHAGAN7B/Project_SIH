import React from 'react'
import { AddGallery, FileDownload, Favorite, Analysis, PlayArrow} from "../assets/Icons";
import TransitionButtons from "./TransitionButtons";
const ServiceButton = () => {
  return (
    <div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)] cursor-pointer hover:scale-105 transition-transform">
          <span className="text-lg"><Favorite /></span>
          <span>Favorite</span>
        </button>
        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--secondary-color)]/80 px-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[var(--secondary-color)] cursor-pointer hover:scale-105 transition-transform">
          <span className="text-lg"><FileDownload sx={{ height: 25 }} /></span>
          <span>Export</span>
        </button>
         <TransitionButtons className="bg-[var(--primary-color)] hover:scale-105 transition-transform">
          <span className="text-lg"><Analysis /></span>
          <span>Analysis</span>
        </TransitionButtons>
        <TransitionButtons className="bg-[var(--primary-color)] hover:scale-105 transition-transform">
          <span className="text-lg"><PlayArrow /></span>
          <span>Animation</span>
        </TransitionButtons>
        <TransitionButtons className="bg-[var(--primary-color)] hover:scale-105 transition-transform">
          <span className="text-lg"><AddGallery /></span>
          <span>Add to Gallery</span>
        </TransitionButtons>
      </div>
    </div>
  )
}

export default ServiceButton
