import React, { useState } from "react";
import { Icon, Card, Button } from "@material-ui/core";
import TextareaAutosize from "react-textarea-autosize";
import { addProject, addSwatch } from "../../actions/swatch";
import { connect } from "react-redux";
import getContrastYIQ from "../utils/dominantColor";

const SwatchActionButton = ({
  list,
  addProject,
  addSwatch,
  listId,
  swatches,
  swatchList
}) => {
  const [text, setForm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [correctRegex, setCorrectRegex] = useState(true);
  const [allowButton, setAllowButton] = useState(false);
  const [copyColor, setCopyColor] = useState(null);

  const buttonRender = () => {
    const buttonText = list ? "Add a new project" : "# add new hex code";
    const buttonTextOpacity = list ? "1" : "0.5";
    const buttonTextColour = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <div
        onClick={() => {
          setOpenForm(true);
        }}
        style={{
          ...styles.openButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColour,
          backgroundColor: buttonTextBackground
        }}
      >
        <p className='add-new-text'>{buttonText}</p>
      </div>
    );
  };

  const handleInputChange = e => {
    if (e.target.value === "") {
      setCorrectRegex(true);
      setForm("");
    } else {
      setForm(e.target.value);
      if (!list) {
        const regex = /^#[0-9A-F]{6}$/i;
        const test = regex.test(e.target.value);
        if (test) {
          const textColor = getContrastYIQ(e.target.value);
          setCopyColor(textColor);
          setAllowButton(true);
          setCorrectRegex(true);
        } else if (!test) {
          setAllowButton(false);
          setCorrectRegex(false);
        }
      }
    }
  };

  console.log(correctRegex);

  const handleAddProject = () => {
    let index = 0;
    if (swatchList.projects.length === 0) index = 0;
    else index = swatchList.projects.length;
    if (text) {
      addProject(text, index);
      setForm("");
    } else return;
  };

  const handleAddSwatch = () => {
    let index = 0;
    if (swatches.length === 0) index = 0;
    else index = swatches.length;
    if (text) {
      setCorrectRegex(true);
      addSwatch(text, listId, index, swatches);
      setForm("");
      setCopyColor(null);
    }
  };

  const renderForm = () => {
    const placeholder = list ? "enter project title" : "Add a hex color #";
    const buttonTitle = list ? "add project" : "add hex color";

    return (
      <div>
        {!list && !correctRegex && (
          <p className='warning-text'>
            Please enter a valid hex code (eg, #876057)
          </p>
        )}
        <Card
          style={{
            backgroundColor: !allowButton ? "white" : text,
            overflow: "visible",
            minHeight: 90,
            minWidth: 272,
            padding: "6px 8px 2px"
          }}
        >
          <input
            placeholder={placeholder}
            className='input'
            autoFocus
            onBlur={() => setOpenForm(false)}
            value={text}
            onChange={handleInputChange}
            style={{
              color: !copyColor ? "black" : copyColor,
              backgroundColor: !allowButton ? "white" : text,
              resize: "none",
              width: "100%",
              outline: "none",
              border: "none",
              padding: "0px",
              marginTop: "0px"
            }}
          />
        </Card>
        <div style={{ textAlign: "center" }}>
          <button
            className='btn-primary'
            disabled={!list && !allowButton && true}
            onMouseDown={list ? handleAddProject : handleAddSwatch}
            variant='contained'
            style={{ marginTop: "10px", opacity: !allowButton ? "0.6" : "1" }}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    );
  };

  return openForm ? renderForm() : buttonRender();
};

const styles = {
  openButtonGroup: {
    display: "flex",
    alignItems: "centre",
    cursor: "pointer",
    borderradius: 3,
    height: 36,
    width: 272,
    pddingLeft: 10
  }
};

const mpst = state => ({
  swatchList: state.swatchReducer
});

export default connect(mpst, { addProject, addSwatch })(SwatchActionButton);
