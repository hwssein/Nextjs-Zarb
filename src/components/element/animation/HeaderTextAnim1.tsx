"use client";

import React, { useEffect } from "react";
import anime from "animejs";

const HeaderTextAnim1: React.FC = () => {
  useEffect(() => {
    const ml4 = {
      opacityIn: [0, 1],
      scaleIn: [0.2, 1],
      scaleOut: 3,
      durationIn: 800,
      durationOut: 600,
      delay: 500,
    };

    const animation = anime
      .timeline({ loop: true })
      .add({
        targets: ".ml4 .letters-1",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-1",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4",
        opacity: 0,
        duration: 500,
        delay: 500,
      });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-start mt-10  md:mt-20">
      <h1 className="w-full ml4 relative font-black text-3xl md:text-5xl text-center uppercase text-black tracking-wider">
        <span className="letters letters-1 absolute inset-0 opacity-0">
          Build
        </span>
        <span className="letters letters-2 absolute inset-0 opacity-0">
          Your
        </span>
        <span className="letters letters-3 absolute inset-0 opacity-0">
          Body
        </span>
      </h1>
    </div>
  );
};

export default HeaderTextAnim1;
