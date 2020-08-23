import React, { useState, Fragment } from "react";
import ReactCardFlip from "react-card-flip";
import getContrastYIQ from "../utils/dominantColor";

const BackgroundCard = ({
  hoverEffect,
  offHoverEffect,
  backGroundWidth: { onHover, offHover, id },
  divId,
  color,
  color1,
  color2,
  color1Temp,
  allFlipped,
  firstFlip,
  randomLoad
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCopy, flipShowCopy] = useState(false);
  const [copyColor, setCopyColor] = useState(null);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleHover = e => {
    hoverEffect(e);
    flipShowCopy(true);
    const textColor = getContrastYIQ(color);
    setCopyColor(textColor);
  };

  const handleHoverOut = e => {
    flipShowCopy(false);
    offHoverEffect(e);
  };

  // console.log(
  //   `color - ${color}`,
  //   `color 1 - ${color1}`,
  //   `color 2 - ${color2}`,
  //   `color temp - ${color1Temp}`
  // );

  return (
    <Fragment>
      <ReactCardFlip
        isFlipped={allFlipped || isFlipped}
        flipDirection='horizontal'
      >
        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: randomLoad ? color : color2
          }}
          onMouseEnter={handleHover}
          onMouseOut={handleHoverOut}
          id={divId}
          className='background-div-card'
        >
          <h3
            style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
            onMouseEnter={e => hoverEffect(e)}
            id={divId}
            className='card-copy-copy'
          >
            Click to Copy
          </h3>
          <div id={divId} className='card-overlay'></div>
        </div>

        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: !firstFlip ? color1Temp : color1
          }}
          onMouseEnter={handleHover}
          onMouseOut={handleHoverOut}
          id={divId}
          className='background-div-card'
        >
          <h3
            style={{ opacity: !showCopy ? "0" : "1" }}
            onMouseEnter={e => hoverEffect(e)}
            id={divId}
            className='card-copy-copy'
          >
            Click to Copy
          </h3>
          <div id={divId} className='card-overlay'></div>
        </div>
      </ReactCardFlip>
    </Fragment>
  );
};

export default BackgroundCard;
