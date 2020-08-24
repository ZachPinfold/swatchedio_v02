import React, { useState, Fragment } from "react";
import ReactCardFlip from "react-card-flip";
import getContrastYIQ from "../utils/dominantColor";
import { connect } from "react-redux";

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
  randomLoad,
  auth: { isAuthenticated }
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCopy, flipShowCopy] = useState(false);
  const [copyColor, setCopyColor] = useState(null);
  const [copied, setCopied] = useState(false);
  const [frontScale, setFrontScale] = useState(1);
  const [BackScale, setBackScale] = useState(1);

  const handleClick = (color, frontback) => {
    if (frontback === "front") {
      setFrontScale(0.95);
      setTimeout(() => {
        setFrontScale(1);
      }, 100);
    }

    if (frontback === "back") {
      setBackScale(0.95);
      setTimeout(() => {
        setBackScale(1);
      }, 100);
    }

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

  const handleMoreClick = () => {
    console.log("more");
  };

  return (
    <Fragment>
      <ReactCardFlip
        isFlipped={allFlipped || isFlipped}
        flipDirection='horizontal'
      >
        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: randomLoad ? color : color2,
            transform: `scale(${frontScale})`
          }}
          onMouseOver={e => handleHover(e, "front")}
          onMouseOut={handleHoverOut}
          onClick={() => handleClick(randomLoad ? color : color2, "front")}
          id={divId}
          className='background-div-card'
        >
          <div onClick={e => e.stopPropagation()} className='actions-area'>
            <div
              onMouseOver={e => handleHover(e, "front")}
              onClick={e => e.stopPropagation()}
              id={divId}
              className='click-more-circles'
            >
              <div onClick={handleMoreClick} className='circle-click-area'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
              </div>
            </div>
            <div onClick={e => e.stopPropagation()} className='more-card-box'>
              <h3 className='more-card-title'>Actions</h3>
              <div className='break-line'></div>
              <div
                style={{ marginBottom: "10px" }}
                className='action-button-area'
              >
                <h3 className='more-card-add-btn'>Add to my Master Swatch</h3>
                <h3 className='more-card-add-btn'>Add to my project...</h3>
              </div>
              <div className='break-line'></div>

              <button style={{ marginTop: "10px" }} className='btn-primary'>
                Sign up to Access
              </button>
            </div>
          </div>

          <div className='card-copy-div'>
            <h3
              style={{
                color: copyColor,
                opacity: !showCopy ? "0" : "1"
              }}
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
            backgroundColor: !firstFlip ? color1Temp : color1,
            transform: `scale(${BackScale})`
          }}
          onMouseEnter={e => handleHover(e, "back")}
          onMouseOut={handleHoverOut}
          onClick={() => handleClick(!firstFlip ? color1Temp : color1, "back")}
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
              {!copied ? "Click to Copy" : "Copied!"}
            </h3>
          </div>
          <div id={divId} className='card-overlay'></div>
        </div>
      </ReactCardFlip>
    </Fragment>
  );
};

const mstp = state => ({
  auth: state.auth
});

export default connect(mstp, null)(BackgroundCard);
