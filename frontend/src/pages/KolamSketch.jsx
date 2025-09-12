import React, { useRef, useEffect } from "react";
import p5 from "p5";
import * as dat from "dat.gui";

const KolamSketch = () => {
  const sketchRef = useRef();
  const guiRef = useRef();

  useEffect(() => {
    let myp5;
    let gui;
    let kolam = {
      tsize: 45,
      margin: 5,
      tnumber: 5,
      refreshRate: 100,
      rotation: Math.PI / 4,
    };
    let link, nlink, idx, pg, bgcolor;

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        bgcolor = p.color(p.random(50), p.random(50), p.random(50));
        setupTiles();
        configTiles();

        gui = new dat.GUI();
        gui.add(kolam, "tsize", 30, 60).name("Size").onChange(setupTiles);
        gui.add(kolam, "margin", 2, 200).name("Margin").onChange(setupTiles);
        gui.add(kolam, "tnumber", 3, 20, 1).name("Tiles").onChange(setupTiles);
        gui.add(kolam, "rotation", 0, 2 * Math.PI, Math.PI / 16).name("Rotation").onChange(setupTiles);
        gui.add(kolam, "refreshRate", 10, 200, 10).name("Refresh Rate");
        guiRef.current = gui;
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
        p.rectMode(p.CORNERS);
        p.textSize(32);
        p.fill(255);
        p.text("Kolam", 30, 60);
        p.textSize(12);
        p.text(
          '"Kolam is a form of drawing ..."\n\nTaken as-is from Wikipedia - Kolam',
          30,
          70,
          400,
          200
        );
        p.text(
          "No Rights Reserved; Ported from a Processing Sketch by Bárbara Almeida",
          30,
          p.windowHeight - 30
        );
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
      if (guiRef.current) {
        guiRef.current.destroy();
      }
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default KolamSketch;