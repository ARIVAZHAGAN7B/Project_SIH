import { FileUpload, FileDownload, IosShare } from "../assets/Icons";
import Button from "./Button";
import TransitionButtons from "./TransitionButtons";
import {patreco1 , patreco2} from "../assets/Assets";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentImage } from "../store/imageSlice";

export function Header(){
  return(
    <>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-white text-4xl font-bold leading-tight tracking-tighter">
          Upload and Detect Kolam Patterns
        </h1>
        <p className="text-white/80 max-w-2xl text-lg">
          Our AI-powered tool helps you analyze Kolam designs. Upload an image
          to identify patterns, symmetry, and motifs within seconds.
        </p>
      </div>
      </>

  )
}



export function InputSection() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
       console.log("Selected image:", url); 
      console.log("File name:", file.name); 
      console.log("File type:", file.type); 
      dispatch(setCurrentImage(url)); // store in Redux
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      console.log("Selected image (drag & drop):", url);
      dispatch(setCurrentImage(url)); 
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="flex flex-col items-center gap-8 rounded-xl border-2 border-dashed border-[#343465] px-6 py-16 cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {!preview ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#242447]">
            <FileUpload sx={{ fontSize: 40, color: "white" }} />
          </div>
          <p className="text-white text-xl font-bold">Drag and drop an image here, or click to browse</p>
          <p className="text-white/70 text-base">Supported formats: JPG, PNG, WEBP</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
          <p className="text-white/80">Image ready for processing</p>
        </div>
      )}

      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleBrowseClick}
        className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-6 bg-[#242447] text-white font-bold"
      >
        Browse Files
      </button>
    </div>
  );
}





// ProcessingSection.jsx
export function ProcessingSection() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Processing Card */}
      <div className="flex flex-col gap-4 rounded-lg bg-[#1a1a32] p-6">
        <h3 className="text-white text-xl font-bold">Processing</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-white/90 text-base font-medium">
              Processing Image
            </p>
            <p className="text-[#9393c8] text-base font-medium">50%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-[#343465]">
            <div
              className="h-full rounded-full bg-[var(--primary-color)]"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Advanced Settings Card */}
      <div className="flex flex-col gap-4 rounded-lg bg-[#1a1a32] p-6">
        <h3 className="text-white text-xl font-bold">Advanced Settings</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-white text-base font-medium">
              Symmetry Detection
            </span>
            <select className="form-select w-full rounded-lg border border-[#343465] bg-[#111122] p-3 text-white focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-white text-base font-medium">
              Motif Recognition
            </span>
            <select className="form-select w-full rounded-lg border border-[#343465] bg-[#111122] p-3 text-white focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </label>
        </div>
        <Button  props="Start Processing" className="flex w-full cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-[var(--primary-color)] text-white text-base font-bold" />
      </div>
    </div>
  );
}

export function ResultSection() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-center text-3xl font-bold text-white">Results</h2>

      {/* Images */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Original Image</h3>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              alt="Original Kolam"
              className="h-full w-full object-cover"
              src={patreco1}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Recognized Pattern</h3>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              alt="Recognized Kolam Pattern"
              className="h-full w-full object-cover"
              src={patreco2}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <TransitionButtons>
  <FileDownload sx={{ fontSize: 24 }} />
  Download
</TransitionButtons>

      <TransitionButtons className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)]">
  <IosShare sx={{ fontSize: 24 }} />
  Share
</TransitionButtons>
      </div>
    </div>
  );
}

