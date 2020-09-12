import React, { useState, useEffect, Fragment } from "react";
import BackgroundCard from "./BackgroundCard";
import { getColors } from "../../actions/colors";
import { connect } from "react-redux";
import DiscoverPanel from "./DiscoverPanel";
import { colorHoverChange } from "../utils/colorHoverChange";
import { revertHome } from "../../actions/swatch";
import Loader from "../layout/Loader";

const Background = ({
  getColors,
  colors: { loading, colors, colors2, randomLoad, secondLoad, firstLoad, hex },
  layout: { discover },
  revertHome,
  openLogin
}) => {
  const [backGroundWidth, setBackgroundWidth] = useState({
    onHover: "1",
    offHover: "1",
    id: null
  });
  const [allFlipped, setAllFlipped] = useState({
    multiFlip: false,
    firstFlip: false
  });
  const [secondFlip, setSecondFlip] = useState(false);
  const [colorBooleon, setColorFlipBooleon] = useState(false);
  const [flexReset, toggleFlexReset] = useState(false);
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);
  const [firstColorLoad, setFirstColorLoad] = useState(true);
  const [pageLoad, setLoad] = useState(true);
  const [buttonClass, setButtonClass] = useState("btn-primary btn-landing");
  const [showAction, toggleShowAction] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  useEffect(() => {
    revertHome();
    getColors(null, firstColorLoad);
    setFirstColorLoad(false);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [getColors]);

  const hoverEffect = e => {
    const { id } = e.currentTarget;
    const num = id.toString();
    if (id === "5") {
      setBackgroundWidth({
        offHover: "1",
        onHover: "0.97, 0.98",
        id
      });
    } else
      setBackgroundWidth({
        offHover: "1",
        onHover: "0.97, 0.98",
        id
      });
  };

  const offHoverEffect = e => {
    setBackgroundWidth({
      offHover: "1",
      onHover: "0.98",
      id: null
    });
  };

  const handleClick = (discover, hueColour) => {
    toggleShowAction(false);
    const buttonColor = colorHoverChange(buttonClass, "landing");
    setButtonClass(buttonColor);
    setBackgroundWidth({
      offHover: "20.00vw",
      onHover: "20.00vw",
      id: null
    });
    getColors("new_random", "first", discover, hueColour);
    setColorFlipBooleon(!colorBooleon);
    !firstLoad && !allFlipped.firstFlip && setColor1(colors2);
    allFlipped.firstFlip && !colorBooleon && setColor1(colors);
    colorBooleon && setColor2(colors);
    setAllFlipped({ firstFlip: true, multiFlip: !allFlipped.multiFlip });
    if (allFlipped.firstFlip) setSecondFlip(true);
  };

  if (colorBooleon) {
    setTimeout(() => {
      toggleFlexReset(true);
    }, 2000);
  }

  return pageLoad ? (
    <Loader />
  ) : (
    <Fragment>
      {!loading && (
        <div
          // style={{ width: flexReset && "200px" }}
          className='background-container'
        >
          {discover && (
            <DiscoverPanel
              handleClick={handleClick}
              buttonClass={buttonClass}
            />
          )}
          <div
            style={{
              // marginTop: discover && "130px"
              height: discover && "85vh",
              width: flexReset && "200px"
            }}
            className='landing-div-background'
          >
            {!discover && (
              <div className='hero-message'>
                <h1 className='hero-heading'>Wash your projects with color</h1>
                <button className={buttonClass} onClick={handleClick}>
                  {" "}
                  New Palette
                </button>
              </div>
            )}

            <BackgroundCard
              showAction={showAction}
              toggleShowAction={toggleShowAction}
              hoverEffect={hoverEffect}
              offHoverEffect={offHoverEffect}
              backGroundWidth={backGroundWidth}
              divId={"1"}
              color={!firstLoad && `#${colors[0]}`}
              color1={allFlipped.firstFlip && `#${color1[0]}`}
              color2={secondFlip && `#${color2[0]}`}
              color1Temp={!secondLoad && `#${colors2[0]}`}
              delayTimer={1000}
              randomLoad={randomLoad}
              allFlipped={allFlipped.multiFlip}
              firstFlip={allFlipped.firstFlip}
              colorBooleon={colorBooleon}
              hex={hex}
              handleBackClick={handleClick}
              openLogin={openLogin}
            />
            <BackgroundCard
              showAction={showAction}
              toggleShowAction={toggleShowAction}
              hoverEffect={hoverEffect}
              offHoverEffect={offHoverEffect}
              backGroundWidth={backGroundWidth}
              divId={"2"}
              color={!firstLoad && `#${colors[1]}`}
              color1={allFlipped.firstFlip && `#${color1[1]}`}
              color2={secondFlip && `#${color2[1]}`}
              color1Temp={!secondLoad && `#${colors2[1]}`}
              delayTimer={1000}
              randomLoad={randomLoad}
              allFlipped={allFlipped.multiFlip}
              firstFlip={allFlipped.firstFlip}
              colorBooleon={colorBooleon}
              hex={hex}
              handleBackClick={handleClick}
              openLogin={openLogin}
            />
            <BackgroundCard
              showAction={showAction}
              toggleShowAction={toggleShowAction}
              hoverEffect={hoverEffect}
              offHoverEffect={offHoverEffect}
              backGroundWidth={backGroundWidth}
              divId={"3"}
              color={!firstLoad && `#${colors[2]}`}
              color1={allFlipped.firstFlip && `#${color1[2]}`}
              color2={secondFlip && `#${color2[2]}`}
              color1Temp={!secondLoad && `#${colors2[2]}`}
              delayTimer={1000}
              randomLoad={randomLoad}
              allFlipped={allFlipped.multiFlip}
              firstFlip={allFlipped.firstFlip}
              colorBooleon={colorBooleon}
              hex={hex}
              handleBackClick={handleClick}
              openLogin={openLogin}
            />
            <BackgroundCard
              showAction={showAction}
              toggleShowAction={toggleShowAction}
              hoverEffect={hoverEffect}
              offHoverEffect={offHoverEffect}
              backGroundWidth={backGroundWidth}
              divId={"4"}
              color={!firstLoad && `#${colors[3]}`}
              color1={allFlipped.firstFlip && `#${color1[3]}`}
              color2={secondFlip && `#${color2[3]}`}
              color1Temp={!secondLoad && `#${colors2[3]}`}
              delayTimer={1000}
              randomLoad={randomLoad}
              allFlipped={allFlipped.multiFlip}
              firstFlip={allFlipped.firstFlip}
              colorBooleon={colorBooleon}
              hex={hex}
              handleBackClick={handleClick}
              openLogin={openLogin}
            />
            <BackgroundCard
              showAction={showAction}
              toggleShowAction={toggleShowAction}
              hoverEffect={hoverEffect}
              offHoverEffect={offHoverEffect}
              backGroundWidth={backGroundWidth}
              divId={"5"}
              color={!firstLoad && `#${colors[4]}`}
              color1={allFlipped.firstFlip && `#${color1[4]}`}
              color2={secondFlip && `#${color2[4]}`}
              color1Temp={!secondLoad && `#${colors2[4]}`}
              delayTimer={1000}
              randomLoad={randomLoad}
              allFlipped={allFlipped.multiFlip}
              firstFlip={allFlipped.firstFlip}
              colorBooleon={colorBooleon}
              hex={hex}
              handleBackClick={handleClick}
              openLogin={openLogin}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mts = state => ({
  colors: state.colors,
  layout: state.layout
});

export default connect(mts, { getColors, revertHome })(Background);
