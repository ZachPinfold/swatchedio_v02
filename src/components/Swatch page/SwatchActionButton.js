import React, { useState } from "react";
import { Card } from "@material-ui/core";
import { addProject, addSwatch } from "../../actions/swatch";
import { connect } from "react-redux";
import getContrastYIQ from "../utils/dominantColor";

const SwatchActionButton = ({
  list,
  addProject,
  addSwatch,
  listId,
  swatches,
  swatchList,
  auth: { id, username }
}) => {
  const [text, setForm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [correctRegex, setCorrectRegex] = useState(true);
  const [allowButton, setAllowButton] = useState(false);
  const [copyColor, setCopyColor] = useState(null);

  const buttonRender = () => {
    const buttonText = list ? (
      <div className='add-project-copy-container'>
        <i className='fas fa-plus plus'></i>
        <span className='add-project-text'>Add a new project</span>
      </div>
    ) : (
      "# Add new hex code"
    );
    const buttonTextOpacity = list ? "1" : "0.5";
    const buttonTextColour = list ? "white" : "inherit";

    return (
      <div
        onClick={() => {
          setOpenForm(true);
        }}
        style={{
          ...styles.openButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColour
        }}
      >
        <span className='add-new-text'>{buttonText}</span>
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

  const handleAddProject = () => {
    let index = 0;
    if (swatchList.projects.length === 0) index = 0;
    else index = swatchList.projects.length;
    if (text) {
      addProject(text, index, id, username);
      setForm("");
    } else return;
  };

  const handleAddSwatch = () => {
    let index = 0;
    if (swatches.length === 0) index = 0;
    else index = swatches.length;
    if (text) {
      setCorrectRegex(true);
      addSwatch(text, listId, index, swatches, id, username);
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
            minHeight: 20,
            minWidth: 252,
            padding: "10px 10px"
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
              color: !allowButton ? "black" : copyColor,
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
            style={{
              marginTop: "10px",
              opacity: list ? "1" : !allowButton ? "0.6" : "1"
            }}
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
  swatchList: state.swatchReducer,
  auth: state.auth
});

export default connect(mpst, { addProject, addSwatch })(SwatchActionButton);
