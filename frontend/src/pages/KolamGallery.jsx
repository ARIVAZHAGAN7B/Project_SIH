import React from "react";
import {
  kolgal10,
  kolgal11,
  kolgal12,
  kolan_gallery1,
  kolgal2,
  kolgal3,
  kolgal4,
  kolgal5,
  kolgal6,
  kolgal7,
  kolgal8,
  kolgal9,
} from "../assets/Assets";

const KolamGallery = () => {
  // Put all gallery images into an array for easy mapping
  const galleryImages = [
    kolan_gallery1,
    kolgal2,
    kolgal3,
    kolgal4,
    kolgal5,
    kolgal6,
    kolgal7,
    kolgal8,
    kolgal9,
    kolgal10,
    kolgal11,
    kolgal12,
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gray-950 text-white font-sans antialiased"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Kolam Gallery
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Explore a diverse collection of traditional and AI-generated Kolam
              designs. Filter and sort to find your inspiration.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="mb-8 p-4 bg-gray-900 rounded-lg flex flex-wrap items-center justify-center gap-4">
            {["Symmetry", "Size", "Color", "Complexity"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 rounded-md bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <span>{filter}</span>
                <span className="material-symbols-outlined text-base">
                  expand_more
                </span>
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  alt={`Kolam design ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={img}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-white">
                    <span className="material-symbols-outlined text-4xl">
                      zoom_in
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center">
            <nav className="flex items-center space-x-1">
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">{"<"}</span>
              </a>
              {[1, 2, 3, 4, 5].map((num) => (
                <a
                  key={num}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
                    num === 1
                      ? "font-bold text-white bg-[var(--primary-color)]"
                      : "font-normal text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  href="#"
                >
                  {num}
                </a>
              ))}
              <a
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">{">"}</span>
              </a>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KolamGallery;
