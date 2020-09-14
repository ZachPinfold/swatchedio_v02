import React, { useState, Fragment, useEffect } from "react";
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
  handleBackClick,
  layout: { discover },
  hex,
  openLogin
}) => {
  const [showCopy, flipShowCopy] = useState(false);
  const [copyColor, setCopyColor] = useState(null);
  const [copied, setCopied] = useState(false);
  const [frontScale, setFrontScale] = useState(0.98);
  const [BackScale, setBackScale] = useState(0.98);

  useEffect(() => {
    if (randomLoad) {
      const textColor = getContrastYIQ(color);
      setCopyColor(textColor);
    }
    if (!randomLoad && colorBooleon === false) {
      const textColor = getContrastYIQ(color2);
      setCopyColor(textColor);
    }
    if (!randomLoad && colorBooleon === true) {
      const textColor = getContrastYIQ(color1);
      setCopyColor(textColor);
    }
    if (!firstFlip && colorBooleon === true) {
      const textColor = getContrastYIQ(color1Temp);
      setCopyColor(textColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleBackClick]);

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
        isFlipped={allFlipped || colorBooleon}
        flipDirection='horizontal'
      >
        {/* // First Card // */}
        <div
          style={{
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
          onMouseDown={() => handleClick(randomLoad ? color : color2, "front")}
          id={divId}
          className='background-div-card'
        >
          {discover && `#${hex}` === color2 && (
            <i style={{ color: copyColor }} class='far fa-star card-star'></i>
          )}

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
            openLogin={openLogin}
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
          onMouseDown={() =>
            handleClick(!firstFlip ? color1Temp : color1, "back")
          }
          id={divId}
          className='background-div-card'
        >
          {discover && `#${hex}` === color1 && (
            <i style={{ color: copyColor }} class='far fa-star card-star'></i>
          )}
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
            openLogin={openLogin}
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
  layout: state.layout
});

export default connect(mstp, null)(BackgroundCard);
