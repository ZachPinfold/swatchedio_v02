import React, { useState } from "react";
import { Icon, Card, Button } from "@material-ui/core";
import TextareaAutosize from "react-textarea-autosize";
import { addProject, addSwatch } from "../../actions/swatch";
import { connect } from "react-redux";

const SwatchActionButton = ({
  list,
  addProject,
  addSwatch,
  listId,
  swatchList
}) => {
  const [text, setForm] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const buttonRender = () => {
    const buttonText = list ? "Add another list" : "Add another card";
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
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  const handleInputChange = e => {
    setForm(e.target.value);
  };

  const handleAddProject = () => {
    const index = swatchList.projects.length + 1;
    if (text) addProject(text, index);
    else return;
  };

  const handleAddSwatch = () => {
    console.log(text);
    if (text) {
      addSwatch(text, listId);
      setForm("");
    } else return;
  };

  const renderForm = () => {
    const placeholder = list ? "enter list title" : "enter card title";
    const buttonTitle = list ? "add list" : "add card";

    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px"
          }}
        >
          <TextareaAutosize
            placeholder={placeholder}
            autoFocus
            onBlur={() => setOpenForm(false)}
            value={text}
            onChange={handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              outline: "none",
              border: "none"
            }}
          />
        </Card>
        <div>
          <Button
            onMouseDown={list ? handleAddProject : handleAddSwatch}
            variant='contained'
            style={{ color: "white", backgroundColor: "green" }}
          >
            {buttonTitle}
          </Button>
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
