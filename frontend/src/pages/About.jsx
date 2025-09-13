import React from "react";
import AboutCard from "../components/AboutCard";

const About = () => {
  return (
    <div
      style={{ fontFamily: "'Space Grotesk', 'Noto Sans', sans-serif" }}
      className="relative flex size-full min-h-screen flex-col bg-[#111122] dark group/design-root overflow-x-hidden"
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 px-4 sm:px-10 md:px-20 lg:px-40 py-10 sm:py-16">
          <div className="layout-content-container flex flex-col max-w-[960px] mx-auto w-full">
            <section>
              <div className="w-full">
                <div className="p-4 sm:p-0">
                  <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-6 text-center shadow-2xl">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">
                        Unveiling the Art of Kolam with AI
                      </h1>
                      <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                        Explore the rich heritage of Kolam, a traditional South
                        Indian art form, through the lens of artificial
                        intelligence. Our project aims to preserve, understand,
                        and innovate within this beautiful cultural practice.
                      </p>
                    </div>
                    <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-indigo-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-indigo-700 transition-colors mt-4">
                      <span className="truncate">Learn More</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-16 sm:py-24">
              <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em] text-center mb-12">
                History of Kolam
              </h2>
              <AboutCard />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
