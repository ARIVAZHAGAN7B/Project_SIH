import React, { useRef, useEffect } from "react";
import p5 from "p5";

const RangoliCard = () => {
  const sketchRef = useRef();

  useEffect(() => {
    let myP5;

    const sketch = (p) => {
      let r, g, b;
      let diameter = 5;
      let untouched = true;

      function rgbToHex(r, g, b) {
        const toHex = (rgb) => {
          let hex = Number(rgb).toString(16);
          return hex.length < 2 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }

      function randomizeColor() {
        r = parseInt(p.random(50, 255));
        g = parseInt(p.random(50, 255));
        b = parseInt(p.random(50, 255));
      }

      function isMouseInCanvas() {
        return (
          p.mouseX >= 0 &&
          p.mouseX <= p.width &&
          p.mouseY >= 0 &&
          p.mouseY <= p.height
        );
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight - 80);
        p.background(0);
        p.noStroke();
        randomizeColor();
      };

      p.draw = () => {
        // Always wrap translations in push/pop
        p.push();
        p.translate(p.width / 2, p.height / 2); // center origin

        p.fill(r, g, b);

        if (p.mouseIsPressed && isMouseInCanvas()) {
          if (untouched) {
            p.background(0);
            untouched = false;
          }

          let x = p.map(p.mouseX, 0, p.width, -p.width / 2, p.width / 2);
          let y = p.map(p.mouseY, 0, p.height, -p.height / 2, p.height / 2);

          // Draw symmetrical ellipses
          p.ellipse(x, y, diameter, diameter);
          p.ellipse(-x, y, diameter, diameter);
          p.ellipse(x, -y, diameter, diameter);
          p.ellipse(-x, -y, diameter, diameter);
          p.ellipse(y, x, diameter, diameter);
          p.ellipse(-y, x, diameter, diameter);
          p.ellipse(y, -x, diameter, diameter);
          p.ellipse(-y, -x, diameter, diameter);
        }

        p.pop(); // restore origin
      };

      p.mouseReleased = () => {
        if (isMouseInCanvas()) randomizeColor();
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight - 80);
        p.background(0);
      };
    };

    myP5 = new p5(sketch, sketchRef.current);

    return () => myP5.remove();
  }, []);

  return (
    <div
      ref={sketchRef}
      style={{
        width: "100%",
        height: "calc(100vh - 80px)", // responsive height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    />
  );
};

export default RangoliCard;
