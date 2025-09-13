import { InputSection } from "../components/RecognizedPattern";
import StyleControls from "../components/StyleControls";

const RedrawKolam = () => {
  return (
    <div className="min-h-screen bg-[#111122] text-white font-spaceGrotesk flex gap-6 p-6">
      {/* Left: Input */}
      <div className="flex-1">
        <InputSection />
      </div>

      {/* Right: Style Controls */}
      <div className="w-[360px]">
        <StyleControls />
      </div>
    </div>
  );
};

export default RedrawKolam;
