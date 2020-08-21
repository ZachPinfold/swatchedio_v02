import React, { useState, Fragment } from "react";
import ReactCardFlip from "react-card-flip";

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
  const [delay, setDelay] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
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
          onMouseEnter={e => hoverEffect(e)}
          onMouseOut={e => offHoverEffect(e)}
          id={divId}
          className='background-div-block'
        >
          <button onClick={handleClick}>Flip</button>
        </div>

        <div
          style={{
            width: id === divId ? onHover : offHover,
            backgroundColor: !firstFlip ? color1Temp : color1
          }}
          onMouseEnter={e => hoverEffect(e)}
          onMouseOut={e => offHoverEffect(e)}
          id={divId}
          className='background-div-block'
        >
          <button onClick={handleClick}>Flip</button>
        </div>
      </ReactCardFlip>
    </Fragment>
  );
};

export default BackgroundCard;
