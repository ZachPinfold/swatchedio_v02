import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColors } from "../../actions/colors";
import { connect } from "react-redux";

const HueButton = styled.button`
  height: 25px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-family: CreteRound;
  text-decoration: none;
  border: none;
  padding: 2px 18px;
  opacity: ${({ selected }) =>
    (selected === true && 1) || (selected === false && 0.3)};
  background-color: ${({ color }) =>
    (color === "green" && "#36802D") ||
    (color === "red" && "#FC1414") ||
    (color === "yellow" && "#E6B33D") ||
    (color === "blue" && "#2B4C7E")};
`;

const DiscoverPanel = ({ buttonClass, handleClick, getColors }) => {
  useEffect(() => {
    handleClick();
  }, []);

  const [hueColour, setHueColour] = useState("");

  const handleHueChange = e => {
    console.log(e.target.name);
    setHueColour(e.target.name);
    getColors("new_random", "first", "discover", e.target.name);
  };

  return (
    <div className='discover-palette-area'>
      <HueButton
        selected={hueColour === "green" ? true : false}
        name='green'
        color='green'
        className='new-palette-btn-discover'
        onClick={handleHueChange}
      >
        Green
      </HueButton>

      <HueButton
        selected={hueColour === "red" ? true : false}
        onClick={handleHueChange}
        color='red'
        className='new-palette-btn-discover'
        name='red'
      >
        Red
      </HueButton>

      <HueButton
        selected={hueColour === "blue" ? true : false}
        onClick={handleHueChange}
        name='blue'
        color='blue'
      >
        Blue
      </HueButton>

      <HueButton
        selected={hueColour === "yellow" ? true : false}
        onClick={handleHueChange}
        name='yellow'
        color='yellow'
        className='new-palette-btn-discover'
      >
        Yellow
      </HueButton>

      <button
        onClick={() => handleClick("discover", hueColour)}
        className={`${buttonClass} new-palette-btn-discover `}
        style={{
          width: "150px",
          marginTop: "0px",
          fontSize: "16px",
          padding: "2px 10px",
          height: "auto",
          marginLeft: "15px"
        }}
      >
        New Palette
      </button>
    </div>
  );
};

export default connect(null, { getColors })(DiscoverPanel);
