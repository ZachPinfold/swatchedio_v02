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
  color
}) {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <div
        onMouseOver={e => hoverEffect(e, "front")}
        onMouseOut={handleHoverOut}
        style={{
          width: id === divId ? onHover : offHover,
          backgroundColor: color,
          color: "white",
          gridColumn: "1"
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
          width: id === divId ? onHover : offHover,
          backgroundColor: color,
          color: "white",
          gridColumn: "1"
        }}
        className='test-card'
      >
        Card should fit 10vw off hover.
      </div>
    </ReactCardFlip>
  );
}
