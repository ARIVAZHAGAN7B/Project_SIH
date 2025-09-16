import {React,useState} from "react";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { InputSection } from "./RecognizedPattern";
import Button from "./Button";
import GalleryLayout from "./GalleryLayout"; // import your gallery
import { AddGallery, IosShare } from "../assets/Icons";
import { useDispatch } from "react-redux";
import { addOneImage } from "../store/gallerySlice";
import { kolgal2 } from "../assets/Assets";

const KolamCanvas = () => {
  const [showGallery, setShowGallery] = useState(false);

  const handleClick = () => {
    setShowGallery(true);
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center rounded-lg bg-black/20 overflow-hidden">
      {showGallery ? (
        <GalleryLayout />
      ) : (
        <>
          {/* Kolam Input & Button */}
          <div className="flex items-center gap-3">
            <InputSection />
          </div>
          <div className="mt-10">
            <Button props="Redraw Kolam" onClick={handleClick} />
          </div>
        </>
      )}
    </div>
  );
};

export default KolamCanvas;


const StyleControls = () => {
  const dispatch = useDispatch();
  
  const handleAddGallery = () => {
    dispatch(addOneImage(kolgal2));
  };
  return (
    <aside className="flex flex-col w-[360px] bg-[#1a1a32] rounded-lg p-6 gap-6">
      <h3 className="text-xl font-bold">Style Controls</h3>

      {/* Line Thickness */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Line Thickness</label>
        <div className="flex items-center gap-4">
          <input
            className="w-full h-2 bg-[#343465] rounded-lg appearance-none cursor-pointer accent-[var(--primary-color)]"
            type="range"
            min="1"
            max="10"
            defaultValue="2"
          />
          <span className="text-sm font-mono p-2 rounded-md bg-[#111122]">
            2px
          </span>
        </div>
      </div>

      {/* Dot Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="dot-style">
          Dot Style
        </label>
        <select
          id="dot-style"
          className="w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
        >
          <option>Solid</option>
          <option>Hollow</option>
          <option>Square</option>
        </select>
      </div>

      {/* Color Picker */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Color</p>
        <div className="flex flex-wrap gap-3">
          {["#ffffff", "#ff4d4d", "#4da6ff", "#4dff88", "#ffff4d"].map(
            (color, i) => (
              <label
                key={i}
                className="relative size-8 rounded-full cursor-pointer ring-2 ring-transparent ring-offset-2 ring-offset-[#1a1a32] transition-all"
                style={{ backgroundColor: color }}
              >
                <input
                  className="sr-only"
                  name="color"
                  type="radio"
                  value={color}
                  defaultChecked={i === 0}
                />
              </label>
            )
          )}
        </div>
      </div>

      {/* Stroke Texture */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="stroke-texture">
          Stroke Texture
        </label>
        <select
          id="stroke-texture"
          className="w-full rounded-lg border-0 bg-[#111122] h-12 px-4 text-white placeholder:text-[#9393c8] focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow"
        >
          <option>Solid</option>
          <option>Chalk</option>
          <option>Rice Flour</option>
          <option>Charcoal</option>
        </select>
      </div>

      {/* Export Options (closer to stroke texture now) */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Export Options</h4>
        <div className="grid grid-cols-1 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors">
            <IosShare /> Download
          </button>
          <button 
            onClick={handleAddGallery}
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#242447] text-white text-sm font-bold hover:bg-opacity-80 transition-colors"
            
          >
            <AddGallery /> Add to Gallery
          </button>
        </div>
      </div>
    </aside>
  );
};

export { KolamCanvas, StyleControls };
