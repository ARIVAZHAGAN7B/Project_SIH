import React, { useState } from "react";
import KolamCanvas from "../components/KolamCanvas";
import KolamControls from "../components/KolamControls";

const KolamSketch = () => {
  const [kolam, setKolam] = useState({
    tsize: 45,
    margin: 5,
    tnumber: 5,
    refreshRate: 100,
    rotation: Math.PI / 4,
  });

  const handleChange = (key, value) => {
    setKolam((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col">
      <KolamCanvas kolam={kolam} />
      <KolamControls kolam={kolam} handleChange={handleChange} />
    </div>
  );
};

export default KolamSketch;
