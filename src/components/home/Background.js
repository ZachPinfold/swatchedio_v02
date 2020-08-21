import React, { useState, useEffect, Fragment } from "react";
import BackgroundCard from "./BackgroundCard";
import { getColors } from "../../colors";
import { connect } from "react-redux";

const Background = ({
  getColors,
  colors: { loading, colors, colors2, randomLoad, secondLoad, firstLoad }
}) => {
  console.log();

  const [backGroundWidth, setBackgroundWidth] = useState({
    onHover: "20vw",
    offHover: "20vw",
    id: null
  });
  const [allFlipped, setAllFlipped] = useState({
    multiFlip: false,
    firstFlip: false
  });
  const [secondFlip, setSecondFlip] = useState(false);
  const [colorBooleon, setColorFlipBooleon] = useState(false);
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);

  const [firstColorLoad, setFirstColorLoad] = useState(true);

  useEffect(() => {
    getColors(null, firstColorLoad);
    setFirstColorLoad(false);
  }, [getColors]);

  const { onHover, offHover, id } = backGroundWidth;

  const hoverEffect = e => {
    const { id } = e.target;
    if (id === "5") {
      setBackgroundWidth({
        offHover: "19.25vw",
        onHover: "23vw",
        id
      });
    } else
      setBackgroundWidth({
        ...backGroundWidth,
        offHover: "20vw",
        onHover: "23vw",
        id
      });
  };

  const offHoverEffect = e => {
    setBackgroundWidth({
      offHover: "20vw",
      onHover: "23vw",
      id: null
    });
  };

  const handleClick = () => {
    console.log(colorBooleon);
    getColors("new_random", "first");
    setColorFlipBooleon(!colorBooleon);
    !firstLoad && !allFlipped.firstFlip && setColor1(colors2);
    allFlipped.firstFlip && !colorBooleon && setColor1(colors);
    colorBooleon && setColor2(colors);
    setAllFlipped({ firstFlip: true, multiFlip: !allFlipped.multiFlip });
    if (allFlipped.firstFlip) setSecondFlip(true);
  };

  return (
    <Fragment>
      <button onClick={handleClick}>Flip</button>{" "}
      {!loading && (
        <div className='landing-div-background'>
          <BackgroundCard
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
          />
          <BackgroundCard
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
          />
          <BackgroundCard
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
          />
          <BackgroundCard
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
          />
          <BackgroundCard
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
          />
        </div>
      )}
    </Fragment>
  );
};

const mts = state => ({
  colors: state.colors
});

export default connect(mts, { getColors })(Background);
