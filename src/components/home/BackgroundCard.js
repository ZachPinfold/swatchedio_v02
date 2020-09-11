import React, { useState, Fragment, useEffect, useRef } from "react";
import ReactCardFlip from "react-card-flip";
import getContrastYIQ from "../utils/dominantColor";
import { connect } from "react-redux";
import ActionCard from "./ActionCard";
import CopyArea from "./CopyArea";
import copyToClip from "../utils/copyToClip";

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
  colorBooleon,
  auth: { isAuthenticated }
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCopy, flipShowCopy] = useState(false);
  const [copyColor, setCopyColor] = useState(null);
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  const [frontScale, setFrontScale] = useState(0.98);
  const [BackScale, setBackScale] = useState(0.98);

  useEffect(() => {
    const textColor = getContrastYIQ(color);
    setCopyColor(textColor);
  }, []);

  const handleClick = (color, frontback) => {
    if (frontback === "front") {
      setFrontScale(1);
      setTimeout(() => {
        setFrontScale(0.98);
      }, 220);
    }

    if (frontback === "back") {
      setBackScale(1);
      setTimeout(() => {
        setBackScale(0.98);
      }, 220);
    }

    copyToClip(color);

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
            width: "20vw",

            backgroundColor: randomLoad ? color : color2,
            transform:
              frontScale === 1
                ? `scale(${frontScale})`
                : id === divId
                ? `scale(${onHover})`
                : `scale(${offHover})`,
            transition: !colorBooleon && "transform 0.2s ease-out"
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
            randomLoad={randomLoad}
            color={color}
            color2={color2}
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
            width: "20vw",
            backgroundColor: !firstFlip ? color1Temp : color1,
            transform:
              BackScale === 1
                ? `scale(${BackScale})`
                : id === divId
                ? `scale(${onHover})`
                : `scale(${offHover})`,
            transition: colorBooleon && "transform 0.2s ease-out"
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
            randomLoad={randomLoad}
            color={color1Temp}
            color2={color1}
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
