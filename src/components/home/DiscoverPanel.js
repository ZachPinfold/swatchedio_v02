import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getColors } from "../../actions/colors";
import { connect } from "react-redux";
import getContrastYIQ from "../utils/dominantColor";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [hueColour, setHueColour] = useState("");
  const [hexCode, setHexCode] = useState("");
  const [hexMessage, toggleHexMessage] = useState(false);
  const [copyColor, setCopyColor] = useState(null);
  const [correctHex, toggleCorrectHex] = useState(false);

  const handleHueChange = e => {
    setHexCode("");
    setHueColour(e.target.name);
    getColors("new_random", "first", "discover", e.target.name);
  };

  const handleInputChange = e => {
    if (e.target.value === "") {
      toggleHexMessage(false);
      setCopyColor(null);
      setHexCode("");
    } else {
      setHueColour("");
      setHexCode(e.target.value);
      const regex = /^#[0-9A-F]{6}$/i;
      const test = regex.test(e.target.value);
      if (test) {
        const textColor = getContrastYIQ(e.target.value);
        setCopyColor(textColor);
        toggleHexMessage(false);
        const colour = e.target.value.substring(1);
        setHexCode(colour);
        getColors("new_random", "first", "hexCode", colour);
        toggleCorrectHex(true);
      } else if (!test) {
        toggleHexMessage(true);
        setCopyColor(null);
        toggleCorrectHex(false);
      }
    }
  };

  const handleButtonPress = () => {
    if (hexCode === "000000") {
      console.log("black");
      handleClick("hexCode", "000000");
    } else
      handleClick(
        hexCode < 1 ? "discover" : "hexCode",
        hexCode < 1 ? hueColour : hexCode
      );
  };

  return (
    <div
      style={{ paddingTop: hexMessage && "20px" }}
      className='discover-palette-area'
    >
      <div className='disco-hue-container'>
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
      </div>
      <div className='discover-right-section'>
        <div
          style={{
            marginTop: hexMessage && "-15px"
          }}
          className='discover-warning-message'
        >
          {hexMessage && hexCode.length > 0 && (
            <p className='disco-warning-text'>Enter hex code, eg #876057</p>
          )}
          <form action=''>
            <input
              onFocus={e => {
                setHueColour("");
                handleInputChange(e);
              }}
              onKeyUp={() => {
                hexCode === "" && toggleCorrectHex(false);
              }}
              style={{
                opacity: hueColour.length > 0 ? "0.3" : "1",
                color: !copyColor ? "black" : copyColor,
                backgroundColor: !correctHex ? "white" : `#${hexCode}`,
                padding: "2px",
                marginTop: "0px",
                width: "129px"
              }}
              className='input disco-input'
              placeholder='#hex'
              onChange={handleInputChange}
              type='text'
            />
          </form>
        </div>

        <button
          onClick={handleButtonPress}
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
    </div>
  );
};

export default connect(null, { getColors })(DiscoverPanel);
