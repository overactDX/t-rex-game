import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const dino = dinoRef.current;
    const cactus = cactusRef.current;

    function jump() {
      if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");

        setTimeout(function () {
          dino.classList.remove("jump");
        }, 300);
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
        alert("Game Over! Your score: " + score);
        window.location.reload();
      } else {
        // update score
        setScore((prevScore) => prevScore + 1);
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
    <>
      <p className="text-end">Score: {score}</p>
      <div className="game">
        <div id="dino" ref={dinoRef}></div>
        <div id="cactus" ref={cactusRef}></div>
      </div>
    </>
  );
};

export default App;
