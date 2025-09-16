import React, { useState } from "react";
import ServicesCard from "./ServicesCard";

const HomeCard = () => {
  const [showMore, setShowMore] = useState(false);
  const [activePoint, setActivePoint] = useState(null);

  const culturalPoints = [
    "Preserves traditional Kolam art digitally.",
    "Acts as an educational tool for geometry, symmetry, and algorithms.",
    "Promotes cultural heritage among younger generations.",
    "Encourages creative expression by blending art with technology.",
  ];

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-color)]">
          Reviving Tradition with Tech
        </h1>
        <p className="text-lg md:text-xl text-[var(--subtle-text-color)]">
          Explore the beauty of South Indian Kolam patterns, recreated with AI & Algorithms
        </p>
      </div>

      {/* Description */}
      <div className="p-6 rounded-2xl shadow-md bg-[var(--secondary-color)] hover:shadow-xl transition duration-300">
        <p className="leading-relaxed text-[var(--subtle-text-color)]">
          Kolam is a traditional line art drawn with dots, symbolizing harmony
          and geometry. Our project uses algorithms to identify design
          principles and recreate Kolams digitally, bridging culture and
          computation.
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          {showMore ? "Show Less" : "Learn More"}
        </button>
        {showMore && (
          <div className="mt-4 space-y-2 text-[var(--subtle-text-color)]">
            <p>
              This project blends <b>mathematical precision</b> with{" "}
              <b>aesthetic tradition</b>, creating interactive designs that can
              be used for learning and cultural exploration.
            </p>
            <p>
              Users can generate, redraw, and customize Kolams to appreciate
              both the art and the algorithms behind it.
            </p>
          </div>
        )}
      </div>

      {/* Services */}
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
          Our Services
        </h2>
        <ServicesCard />
      </div>

      {/* Cultural & Educational Value */}
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
          Cultural & Educational Value
        </h2>
        <ul className="space-y-3">
          {culturalPoints.map((point, idx) => (
            <li
              key={idx}
              onClick={() =>
                setActivePoint(activePoint === idx ? null : idx)
              }
              className={`cursor-pointer p-3 rounded-xl border transition ${
                activePoint === idx
                  ? "bg-indigo-900/40 border-indigo-400 shadow-md"
                  : "bg-[var(--secondary-color)] border-gray-700 hover:bg-gray-800"
              }`}
            >
              <span className="font-medium text-[var(--text-color)]">{point}</span>
              {activePoint === idx && (
                <p className="text-sm mt-2 text-[var(--subtle-text-color)]">
                  More insight: This aspect highlights how Kolam can inspire
                  digital creativity while keeping cultural roots alive.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeCard;
