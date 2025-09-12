import React, { useRef, useEffect } from "react";
import p5 from "p5";

const RangoliPage = () => {
  const sketchRef = useRef();

  useEffect(() => {
    let myP5;

    const sketch = (p) => {
      let r, g, b;
      let diameter = 5;
      let untouched = true;
      let getRandomColors = false;

      function rgbToHex(r, g, b) {
        var toHex = function (rgb) {
          var hex = Number(rgb).toString(16);
          if (hex.length < 2) {
            hex = "0" + hex;
          }
          return hex;
        };
        var red = toHex(r);
        var green = toHex(g);
        var blue = toHex(b);
        return "#" + red + green + blue;
      }

      function randomizeColor() {
        r = parseInt(p.random(50, 255));
        g = parseInt(p.random(50, 255));
        b = parseInt(p.random(50, 255));
      }

      function doRandomColors() {
        getRandomColors = true;
        randomizeColor();
      }

      function displayInstructions() {
        p.push();
        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
        p.textStyle(p.BOLD);
        p.textSize(60);
        let chars = ["रं", "गो", "ली"];
        let x = -100;
        p.text(chars[0], x, -220, 200, 100);
        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
        p.text(chars[1], x + 50, -220, 200, 100);
        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
        p.text(chars[2], x + 120, -220, 200, 100);
        p.textStyle(p.NORMAL);
        p.fill(255);
        p.textSize(32);
        p.text("< design your rangoli here >", -100, -100, 210, 100);
        p.textSize(16);
        p.text("pick your colors from top right...", -140, 0, 300, 100);
        p.text("...drag your mouse or swipe your finger", -120, 40, 300, 100);
        p.textSize(12);
        p.pop();
      }

      function isMouseInCanvas() {
        return (
          p.mouseX >= 0 &&
          p.mouseX <= p.width &&
          p.mouseY >= 0 &&
          p.mouseY <= p.height
        );
      }

      p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight - 80);
        p.background(0);
        p.noStroke();
        doRandomColors();
        p.translate(p.width / 2, p.height / 2);
        displayInstructions();
      };

      p.draw = function () {
        p.translate(p.width / 2, p.height / 2);
        p.fill(r, g, b);
        if (p.mouseIsPressed && isMouseInCanvas()) {
          if (untouched) {
            p.background(0);
          }
          untouched = false;
          let x = p.map(p.mouseX, 0, p.width, -p.width / 2, p.width / 2);
          let y = p.map(p.mouseY, 0, p.height, -p.height / 2, p.height / 2);
          p.ellipse(x, y, diameter, diameter);
          p.ellipse(-x, y, diameter, diameter);
          p.ellipse(x, -y, diameter, diameter);
          p.ellipse(-x, -y, diameter, diameter);
          p.ellipse(y, x, diameter, diameter);
          p.ellipse(-y, x, diameter, diameter);
          p.ellipse(y, -x, diameter, diameter);
          p.ellipse(-y, -x, diameter, diameter);
        }
      };

      p.mouseReleased = function () {
        if (getRandomColors && isMouseInCanvas()) {
          randomizeColor();
        }
      };

      // Optionally, you can add color picker and clear button as React elements and control them via state/props
    };

    myP5 = new p5(sketch, sketchRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default RangoliPage;