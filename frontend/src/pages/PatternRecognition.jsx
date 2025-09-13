import React from "react";
import {InputSection, ProcessingSection, ResultSection} from "../components/RecognizedPattern"
const PatternRecognition = () => {
  return (
    <div
      class="relative flex size-full min-h-screen flex-col bg-[#111122] dark group/design-root overflow-x-hidden"
      >
      <div class="layout-container flex h-full grow flex-col">
        <div class="flex flex-1 justify-center py-16 px-4">
          <div class="flex w-full max-w-5xl flex-col gap-8">
            <InputSection/>
            <ProcessingSection/>
            <ResultSection/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternRecognition;
