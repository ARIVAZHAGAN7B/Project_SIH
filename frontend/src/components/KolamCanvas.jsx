  import React, { useRef, useEffect } from "react";
  import p5 from "p5";

  const KolamCanvas = ({ kolam }) => {
    const sketchRef = useRef();
    const kolamRef = useRef(kolam);

   
    useEffect(() => {
      kolamRef.current = kolam;
    }, [kolam]);

    useEffect(() => {
      let myp5;

      const sketch = (p) => {
        let link, nlink, idx, pg, bgcolor;
        let prevTnumber, prevTsize, prevMargin; // track old values

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight*0.60);
          bgcolor = p.color(p.random(50), p.random(50), p.random(50));
          setupTiles();
          configTiles();

          prevTnumber = kolamRef.current.tnumber;
          prevTsize = kolamRef.current.tsize;
          prevMargin = kolamRef.current.margin;

          p.currentRotation = kolamRef.current.rotation;
        };

        p.draw = () => {
          const k = kolamRef.current;

          p.currentRotation = p.lerp(p.currentRotation, k.rotation, 0.1);

          if (
            k.tnumber !== prevTnumber ||
            k.tsize !== prevTsize ||
            k.margin !== prevMargin
          ) {
            setupTiles();
            configTiles();
            prevTnumber = k.tnumber;
            prevTsize = k.tsize;
            prevMargin = k.margin;
          }

          p.clear();

          if (idx <= 1) drawTile(k);

          p.push();
  p.translate(p.width / 2 -450, p.height / 2);
          p.rotate(p.radians(p.currentRotation)); 
          p.imageMode(p.CENTER);
          p.image(pg, 0, 0);
          p.pop();

          if (p.frameCount % k.refreshRate === 0) {
            configTiles();
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          setupTiles();
        };

        function setupTiles() {
          const k = kolamRef.current;
          pg = p.createGraphics(
            k.tsize * k.tnumber + 2 * k.margin,
            k.tsize * k.tnumber + 2 * k.margin
          );
          link = [];
          nlink = [];
          for (let i = 0; i < k.tnumber + 1; i++) {
            let row = [];
            for (let j = 0; j < k.tnumber + 1; j++) row.push(1);
            link.push(row);
            nlink.push([...row]);
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
              let l = p.random(1) > limit ? 1 : 0;
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

      function drawTile(k) {
    pg.clear();
    pg.noFill();
    pg.stroke(255);
    pg.strokeWeight(2);

    for (let i = 0; i < k.tnumber; i++) {
      for (let j = 0; j < k.tnumber; j++) {
        if ((i + j) % 2 === 0) {
          let top_left = (k.tsize / 2) * p.lerp(link[i][j], nlink[i][j], idx);
          let top_right = (k.tsize / 2) * p.lerp(link[i + 1][j], nlink[i + 1][j], idx);
          let bottom_right = (k.tsize / 2) * p.lerp(link[i + 1][j + 1], nlink[i + 1][j + 1], idx);
          let bottom_left = (k.tsize / 2) * p.lerp(link[i][j + 1], nlink[i][j + 1], idx);

          pg.rect(
            k.margin + i * k.tsize,
            k.margin + j * k.tsize,
            k.tsize,
            k.tsize,
            top_left,
            top_right,
            bottom_right,
            bottom_left
          );

          // draw center dot
          pg.strokeWeight(6);
          pg.point(k.margin + i * k.tsize + k.tsize / 2, k.margin + j * k.tsize + k.tsize / 2);
          pg.strokeWeight(2);
        }
      }
    }

    idx += 0.02;
    idx = p.constrain(idx, 0, 1);
  }

      };

      myp5 = new p5(sketch, sketchRef.current);
      return () => myp5.remove();
    }, []);

    return (
      <div className="flex justify-center items-center h-50% px-6">
        <div ref={sketchRef} className="rounded-lg shadow-lg overflow-hidden" />
      </div>
    );
  };

  export default KolamCanvas;
