import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import TestCard from "./TestCard";

export default function Test() {
  const [isFlipped, toggleFlip] = useState(false);
  const [backGroundWidth, setBackgroundWidth] = useState({
    onHover: "20vw",
    offHover: "20vw",
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
      offHover: "15vw",
      onHover: "30vw",
      id
    });
  };

  const handleHoverOut = e => {
    offHoverEffect(e);
  };

  const offHoverEffect = e => {
    setBackgroundWidth({
      offHover: "20.00vw",
      onHover: "20.00vw",
      id: null
    });
  };

  // const offHover = () => {};

  return (
    <div>
      <button style={{ width: "20px" }} onClick={handleClick}></button>

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
        />
      </div>
    </div>
  );
}
