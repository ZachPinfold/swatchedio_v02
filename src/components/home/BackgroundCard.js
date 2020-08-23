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
  const [copied, setCopied] = useState(false);

  const handleClick = color => {
    navigator.clipboard.writeText(color);
    setCopied(true);
  };

  const handleHover = (e, frontback) => {
    hoverEffect(e);
    flipShowCopy(true);
    if (randomLoad) {
      const textColor = getContrastYIQ(color);
      setCopyColor(textColor);
    }
    if (!randomLoad && frontback === "front") {
      const textColor = getContrastYIQ(color2);
      setCopyColor(textColor);
    }
    if (!randomLoad && frontback === "back") {
      const textColor = getContrastYIQ(color1);
      setCopyColor(textColor);
    }
    if (!firstFlip && frontback === "back") {
      const textColor = getContrastYIQ(color1Temp);
      setCopyColor(textColor);
    }
  };

  const handleHoverOut = e => {
    flipShowCopy(false);
    offHoverEffect(e);
    setCopied(false);
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
          onMouseEnter={e => handleHover(e, "front")}
          onMouseOut={handleHoverOut}
          onClick={() => handleClick(randomLoad ? color : color2)}
          id={divId}
          className='background-div-card'
        >
          <div className='card-copy-div'>
            <h3
              style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
              onMouseEnter={e => hoverEffect(e)}
              id={divId}
              className='card-copy-copy'
            >
              {randomLoad ? color : color2}
            </h3>
            <h3
              style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
              onMouseEnter={e => hoverEffect(e)}
              id={divId}
              className='card-copy-copy'
            >
              {!copied ? "Click to Copy" : "Copied!"}
            </h3>
          </div>
          <div id={divId} className='card-overlay'></div>
        </div>

        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: !firstFlip ? color1Temp : color1
          }}
          onMouseEnter={e => handleHover(e, "back")}
          onMouseOut={handleHoverOut}
          onClick={() => handleClick(!firstFlip ? color1Temp : color1)}
          id={divId}
          className='background-div-card'
        >
          <div className='card-copy-div'>
            <h3
              style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
              onMouseEnter={e => hoverEffect(e)}
              id={divId}
              className='card-copy-copy'
            >
              {!firstFlip ? color1Temp : color1}
            </h3>
            <h3
              style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
              onMouseEnter={e => hoverEffect(e)}
              id={divId}
              className='card-copy-copy'
            >
              Click to Copy
            </h3>
          </div>
          <div id={divId} className='card-overlay'></div>
        </div>
      </ReactCardFlip>
    </Fragment>
  );
};

export default BackgroundCard;
