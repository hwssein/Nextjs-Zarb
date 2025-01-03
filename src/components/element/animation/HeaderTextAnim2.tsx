"use client";

import React, { useEffect } from "react";
import anime from "animejs";
import "../../../app/globals.css";

const HeaderTextAnim2: React.FC = () => {
  useEffect(() => {
    const textWrapper = document.querySelector(".ml7 .letters");
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent!.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    }

    const animation = anime
      .timeline({ loop: true })
      .add({
        targets: ".ml7 .letter",
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: "easeOutExpo",
        delay: (el, i) => 50 * i,
      })
      .add({
        targets: ".ml7",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pt-1">
      <h1 className="ml7">
        <span className="text-wrapper">
          <span className="letters text-3xl text md:text-5xl uppercase">
            Music is power
          </span>
        </span>
      </h1>
    </div>
  );
};

export default HeaderTextAnim2;
