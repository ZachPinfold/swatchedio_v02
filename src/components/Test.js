import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import TestCard from "./TestCard";

export default function Test() {
  const [isFlipped, toggleFlip] = useState(false);
  const [backGroundWidth, setBackgroundWidth] = useState({
    onHover: "1",
    offHover: "1",
    id: null
  });

  const handleClick = () => {
    toggleFlip(!isFlipped);
  };

  const hoverEffect = e => {
    console.log(e.currentTarget);
    const { id } = e.currentTarget;
    const num = id.toString();
    setBackgroundWidth({
      ...backGroundWidth,
      offHover: "1",
      onHover: "0.98",
      id
    });
  };

  const handleHoverOut = e => {
    offHoverEffect(e);
  };

  const offHoverEffect = e => {
    setBackgroundWidth({
      offHover: "1",
      onHover: "1",
      id: null
    });
  };

  // const offHover = () => {};

  return (
    <div>
      <button
        style={{ width: "50px", backgroundColor: "orange", color: "white" }}
        onClick={handleClick}
      >
        Flip
      </button>

      <div className='test-div'>
        <TestCard
          handleHoverOut={handleHoverOut}
          hoverEffect={hoverEffect}
          isFlipped={isFlipped}
          onHover={backGroundWidth.onHover}
          offHover={backGroundWidth.offHover}
          id={backGroundWidth.id}
          divId={"1"}
          color='blue'
          zIndex={"-100"}
        />
        <TestCard
          handleHoverOut={handleHoverOut}
          hoverEffect={hoverEffect}
          isFlipped={isFlipped}
          onHover={backGroundWidth.onHover}
          offHover={backGroundWidth.offHover}
          id={backGroundWidth.id}
          divId={"2"}
          color='green'
          zIndex={"100"}
        />
        <TestCard
          handleHoverOut={handleHoverOut}
          hoverEffect={hoverEffect}
          isFlipped={isFlipped}
          onHover={backGroundWidth.onHover}
          offHover={backGroundWidth.offHover}
          id={backGroundWidth.id}
          divId={"3"}
          color='orange'
          zIndex={"-100"}
        />
        <TestCard
          handleHoverOut={handleHoverOut}
          hoverEffect={hoverEffect}
          isFlipped={isFlipped}
          onHover={backGroundWidth.onHover}
          offHover={backGroundWidth.offHover}
          id={backGroundWidth.id}
          divId={"4"}
          zIndex={"-100"}
          color='black'
        />
      </div>
    </div>
  );
}
