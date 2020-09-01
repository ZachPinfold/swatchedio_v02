import React, { useState } from "react";
import { connect } from "react-redux";
import { addSwatch } from "../../actions/swatch";
import { listProjects } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const ActionCard = ({
  auth: { isAuthenticated },
  handleHover,
  divId,
  showCopy,
  handleMoreClick,
  copyColor,
  showAction,
  toggleShowAction,
  layout: { discover },
  frontBack,
  randomLoad,
  color,
  color2,
  addSwatch,
  colors
}) => {
  const [circleSize, setCircleSize] = useState(false);
  const [addToMaster, toggleAddToMaster] = useState(false);
  const [masterProject, addMasterProject] = useState(null);
  const [projectArray, addProjects] = useState([]);
  const [addToProject, toggleAddToProject] = useState(false);

  const handleMasterToggle = async () => {
    toggleAddToMaster(!addToMaster);
    const result = await API.graphql(graphqlOperation(listProjects));
    result.data.listProjects.items.forEach(project => {
      if (project.projectTitle === "Master") {
        addMasterProject(project);
      }
    });
  };

  const handleAddToProject = async () => {
    addToMaster &&
      addSwatch(
        randomLoad ? color : color2,
        masterProject.id,
        masterProject.swatches.items.length,
        masterProject.swatches.items
      );
  };

  const toggleAddProject = async () => {
    const projectArr = [];
    const result = await API.graphql(graphqlOperation(listProjects));
    result.data.listProjects.items.forEach(project => {
      if (project.projectTitle !== "Master") {
        projectArr.push(project);
      }
    });
    addProjects(projectArr);
    toggleAddToProject(!addToProject);
  };

  console.log(projectArray);

  return (
    <div onClick={e => e.stopPropagation()} className='actions-area'>
      <div
        onMouseOver={e => handleHover(e, frontBack)}
        onClick={e => e.stopPropagation()}
        id={divId}
        className='click-more-circles'
      >
        <div
          style={{ display: !showCopy || !discover ? "none" : "block" }}
          onMouseOver={() => setCircleSize(true)}
          onMouseOut={() => setCircleSize(false)}
          onClick={handleMoreClick}
          className='circle-click-area'
          onClick={() => {
            toggleShowAction({ [divId]: !showAction[divId] });
          }}
        >
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              marginTop: "0px",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
        </div>
      </div>
      {showAction[divId] && (
        <div onClick={e => e.stopPropagation()} className='more-card-box'>
          <h3
            onClick={() => toggleShowAction(false)}
            className='action-x-close'
          >
            x
          </h3>

          <h3 className='more-card-title'>Actions</h3>
          <div className='break-line'></div>
          <div style={{ marginBottom: "10px" }} className='action-button-area'>
            <div className='action-copy-line'>
              <h3
                onClick={handleMasterToggle}
                className={
                  isAuthenticated
                    ? "more-card-add-btn-on"
                    : "more-card-add-btn-off"
                }
              >
                Add to my Master Swatch
              </h3>
              {addToMaster && (
                <i
                  style={{
                    color: "#06d6a0",
                    marginTop: "10px",
                    marginLeft: "5px"
                  }}
                  class='far fa-check-circle'
                ></i>
              )}
            </div>

            <h3
              onClick={toggleAddProject}
              className={
                isAuthenticated
                  ? "more-card-add-btn-on"
                  : "more-card-add-btn-off"
              }
            >
              Add to my project...
            </h3>
            {addToProject && (
              <div className='add-project-options'>
                <ul>
                  {projectArray.map(project => (
                    <li>{project.projectTitle}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='break-line'></div>
          {isAuthenticated && (
            <button
              onClick={handleAddToProject}
              style={{ marginTop: "10px" }}
              className='btn-primary'
            >
              Add to swatch
            </button>
          )}
          {!isAuthenticated && (
            <button style={{ marginTop: "10px" }} className='btn-primary'>
              Login to Access
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mstp = state => ({
  auth: state.auth,
  layout: state.layout,
  colors: state.colors
});

export default connect(mstp, { addSwatch })(ActionCard);
