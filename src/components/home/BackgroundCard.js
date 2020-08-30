import React, { useState, Fragment, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import getContrastYIQ from "../utils/dominantColor";
import { connect } from "react-redux";
import ActionCard from "./ActionCard";
import CopyArea from "./CopyArea";

const BackgroundCard = ({
  hoverEffect,
  toggleShowAction,
  showAction,
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

  useEffect(() => {
    const textColor = getContrastYIQ(color);
    setCopyColor(textColor);
  }, []);

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

  const handleMoreClick = () => {};

  return (
    <Fragment>
      <ReactCardFlip
        isFlipped={allFlipped || isFlipped}
        flipDirection='horizontal'
      >
        {/* // First Card // */}

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
          <ActionCard
            handleHover={handleHover}
            divId={divId}
            showCopy={showCopy}
            handleMoreClick={handleMoreClick}
            copyColor={copyColor}
            showAction={showAction}
            toggleShowAction={toggleShowAction}
            frontBack={"front"}
          />

          <CopyArea
            copyColor={copyColor}
            showCopy={showCopy}
            hoverEffect={hoverEffect}
            divId={divId}
            randomLoad={randomLoad}
            color={color}
            color2={color2}
            copied={copied}
          />
          <div id={divId} className='card-overlay'></div>
        </div>

        {/* // Second Card // */}

        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: !firstFlip ? color1Temp : color1,
            transform: `scale(${BackScale})`
          }}
          onMouseOver={e => handleHover(e, "back")}
          onMouseOut={handleHoverOut}
          onClick={() => handleClick(!firstFlip ? color1Temp : color1, "back")}
          id={divId}
          className='background-div-card'
        >
          <ActionCard
            handleHover={handleHover}
            divId={divId}
            showCopy={showCopy}
            handleMoreClick={handleMoreClick}
            copyColor={copyColor}
            showAction={showAction}
            toggleShowAction={toggleShowAction}
            frontBack={"back"}
          />

          <CopyArea
            copyColor={copyColor}
            showCopy={showCopy}
            hoverEffect={hoverEffect}
            divId={divId}
            randomLoad={randomLoad}
            color={color1Temp}
            color2={color1}
            copied={copied}
          />
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
