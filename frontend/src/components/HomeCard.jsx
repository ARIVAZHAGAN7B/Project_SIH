import React, { useState } from "react";
import ServicesCard from "./ServicesCard";

const HomeCard = () => {
  const [showMore, setShowMore] = useState(false);
 

  return (
    <div className="px-6 py-10 max-w-5xl  mx-auto space-y-8">
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
      <div className="p-6 rounded-2xl shadow-md bg-[#1a1a32] hover:shadow-xl transition duration-300">
        <p className="leading-relaxed text-[var(--subtle-text-color)]">
          Kolam is a traditional line art drawn with dots, symbolizing harmony
          and geometry. Our project uses algorithms to identify design
          principles and recreate Kolams digitally, bridging culture and
          computation.
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
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
   
    </div>
  );
};

export default HomeCard;
