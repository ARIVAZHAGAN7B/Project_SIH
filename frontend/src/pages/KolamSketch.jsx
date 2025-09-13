import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";

const KolamSketch = () => {

   const sketchRef = useRef();

  // State for GUI values
  const [kolam, setKolam] = useState({
    tsize: 45,
    margin: 5,
    tnumber: 5,
    refreshRate: 100,
    rotation: Math.PI / 4,
  });

  useEffect(() => {
    let myp5;
    let link, nlink, idx, pg, bgcolor;

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        bgcolor = p.color(p.random(50), p.random(50), p.random(50));
        setupTiles();
        configTiles();
      };

      p.draw = () => {
        if (idx <= 1) drawTile();
        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(kolam.rotation);
        p.imageMode(p.CENTER);
        p.image(pg, 0, 0);
        p.pop();
        if (p.frameCount % kolam.refreshRate === 0) {
          configTiles();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setupTiles();
      };

      function setupTiles() {
        p.background(bgcolor);
        pg = p.createGraphics(
          kolam.tsize * kolam.tnumber + 2 * kolam.margin,
          kolam.tsize * kolam.tnumber + 2 * kolam.margin
        );
        link = [];
        nlink = [];
        for (let i = 0; i < kolam.tnumber + 1; i++) {
          let pushThis = [];
          for (let j = 0; j < kolam.tnumber + 1; j++) {
            pushThis.push(1);
          }
          link.push(pushThis);
          nlink.push(pushThis);
        }
      }

      function configTiles() {
        idx = 0;
        for (let i = 0; i < link.length; i++) {
          for (let j = 0; j < link[0].length; j++) {
            link[i][j] = nlink[i][j];
          }
        }
        let limit = p.random(0.4, 0.7);
        for (let i = 0; i < nlink.length; i++) {
          for (let j = 0; j < nlink.length / 2; j++) {
            let l = 0;
            if (p.random(1) > limit) l = 1;
            nlink[i][j] = l;
            nlink[i][nlink.length - j - 1] = l;
            nlink[j][i] = l;
            nlink[nlink.length - j - 1][i] = l;
            nlink[nlink.length - 1 - i][j] = l;
            nlink[nlink.length - 1 - i][nlink.length - j - 1] = l;
            nlink[j][nlink.length - 1 - i] = l;
            nlink[nlink.length - 1 - j][nlink.length - 1 - i] = l;
          }
        }
      }

      function drawTile() {
        pg.background(bgcolor);
        pg.noFill();
        pg.stroke(255);
        pg.strokeWeight(5);
        for (let i = 0; i < kolam.tnumber; i++) {
          for (let j = 0; j < kolam.tnumber; j++) {
            if ((i + j) % 2 === 0) {
              let top_left = (kolam.tsize / 2) * p.lerp(link[i][j], nlink[i][j], idx);
              let top_right = (kolam.tsize / 2) * p.lerp(link[i + 1][j], nlink[i + 1][j], idx);
              let bottom_right = (kolam.tsize / 2) * p.lerp(link[i + 1][j + 1], nlink[i + 1][j + 1], idx);
              let bottom_left = (kolam.tsize / 2) * p.lerp(link[i][j + 1], nlink[i][j + 1], idx);
              pg.rect(
                i * kolam.tsize + kolam.margin,
                j * kolam.tsize + kolam.margin,
                kolam.tsize,
                kolam.tsize,
                top_left,
                top_right,
                bottom_right,
                bottom_left
              );
              pg.point(
                i * kolam.tsize + kolam.tsize / 2 + kolam.margin,
                j * kolam.tsize + kolam.tsize / 2 + kolam.margin
              );
            }
          }
        }
        idx += 0.02;
        idx = p.constrain(idx, 0, 1);
      }
    };

    myp5 = new p5(sketch, sketchRef.current);

    return () => {
      if (myp5) {
        myp5.remove();
      }
    };
  }, [kolam]); // re-run p5 when kolam state changes

  // Update handler
  const handleChange = (key, value) => {
    setKolam((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex">
      {/* Canvas */}
      <div ref={sketchRef} className="flex-1" />

      {/* React Control Panel */}
      <div className="w-64 p-4 bg-gray-900 text-white">
        <h2 className="text-lg font-bold mb-4">Controls</h2>

        <label className="block mb-2">
          Size: {kolam.tsize}
          <input
            type="range"
            min="30"
            max="60"
            value={kolam.tsize}
            onChange={(e) => handleChange("tsize", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Margin: {kolam.margin}
          <input
            type="range"
            min="2"
            max="200"
            value={kolam.margin}
            onChange={(e) => handleChange("margin", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Tiles: {kolam.tnumber}
          <input
            type="number"
            min="3"
            max="20"
            value={kolam.tnumber}
            onChange={(e) => handleChange("tnumber", +e.target.value)}
            className="w-full text-black"
          />
        </label>

        <label className="block mb-2">
          Rotation: {kolam.rotation.toFixed(2)}
          <input
            type="range"
            min="0"
            max={Math.PI * 2}
            step={Math.PI / 16}
            value={kolam.rotation}
            onChange={(e) => handleChange("rotation", +e.target.value)}
            className="w-full"
          />
        </label>

        <label className="block mb-2">
          Refresh Rate: {kolam.refreshRate}
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={kolam.refreshRate}
            onChange={(e) => handleChange("refreshRate", +e.target.value)}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );

  
};

export default KolamSketch;
