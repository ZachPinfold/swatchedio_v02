import React from "react";
import ReactCardFlip from "react-card-flip";

export default function TestCard({
  isFlipped,
  onHover,
  offHover,
  id,
  divId,
  hoverEffect,
  handleHoverOut,
  color,
  zIndex
}) {
  console.log(zIndex);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <div
        onMouseOver={e => hoverEffect(e, "front")}
        onMouseOut={handleHoverOut}
        style={{
          // width: id === divId ? onHover : offHover,
          transform: id === divId ? `scale(${onHover})` : `scale(${offHover})`,
          backgroundColor: color,
          color: "white",
          zIndex: "1000"
        }}
        className='test-card'
        id={divId}
      >
        Card should fit 20vw on hover.
      </div>

      <div
        id={divId}
        onMouseOver={e => hoverEffect(e, "front")}
        onMouseOut={handleHoverOut}
        style={{
          transform: id === divId ? `scale(${onHover})` : `scale(${offHover})`,
          backgroundColor: color,
          color: "white"
        }}
        className='test-card'
      >
        Card should fit 10vw off hover.
      </div>
    </ReactCardFlip>
  );
}
