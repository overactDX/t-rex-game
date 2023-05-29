import React, { useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);

  useEffect(() => {
    const dino = dinoRef.current;
    const cactus = cactusRef.current;

    function jump() {
      if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");

        setTimeout(function () {
          dino.classList.remove("jump");
        }, 5000);
      }
    }

    let isAlive = setInterval(function () {
      // get current dino Y position
      let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        clearInterval(isAlive);
        alert("Game Over!");
      }
    }, 10);

    document.addEventListener("keydown", function (event) {
      jump();
    });

    return () => {
      clearInterval(isAlive);
      document.removeEventListener("keydown", function (event) {
        jump();
      });
    };
  }, []);

  return (
    <div className="game">
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
};

export default App;
