import React, { useState } from "react";
import { connect } from "react-redux";
import { addSwatch } from "../../actions/swatch";
import { listProjects } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { updateProject } from "../../graphql/mutations";

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
  const [projectIds, addProjectId] = useState([]);
  const [projectArray, addProjects] = useState([]);
  const [projects, toggleViewProjectIcon] = useState([]);
  const [viewProjects, toggleViewProject] = useState(false);

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
    projectIds.length > 0 &&
      projectArray.forEach(project => {
        const includeId = projectIds.includes(project.id);
        if (includeId === true) {
          addSwatch(
            randomLoad ? color : color2,
            project.id,
            project.swatches.items.length,
            project.swatches.items
          );
        }
      });
  };

  const toggleViewLoadProjects = async () => {
    const projectArr = [];
    const result = await API.graphql(graphqlOperation(listProjects));
    result.data.listProjects.items.forEach(project => {
      if (project.projectTitle !== "Master") {
        projectArr.push(project);
      }
    });
    addProjects(projectArr);
    toggleViewProject(true);
  };

  const toggleAddProject = async (index, projectId) => {
    const isProjectIdInThere = projectIds.includes(projectId);
    if (isProjectIdInThere === false) addProjectId([...projectIds, projectId]);
    projectIds.forEach(project => {
      if (project === projectId) {
        addProjectId(projectIds.filter(project => project !== projectId));
      }
    });

    const isProjectThere = projects.includes(index);
    if (isProjectThere === false) toggleViewProjectIcon([...projects, index]);
    projects.forEach(project => {
      if (project === index) {
        toggleViewProjectIcon(projects.filter(project => project !== index));
      }
    });
  };

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
              onClick={toggleViewLoadProjects}
              className={
                isAuthenticated
                  ? "more-card-add-btn-on"
                  : "more-card-add-btn-off"
              }
            >
              Add to my project...
            </h3>
            {viewProjects && (
              <div style={{ padding: "10px" }} className='add-project-options'>
                <ul>
                  {projectArray.map((project, index) => (
                    <li>
                      <div className='action-copy-line'>
                        <h3
                          onClick={() => toggleAddProject(index, project.id)}
                          style={{ marginTop: index === 0 ? "0px" : "10px" }}
                          className='more-card-add-btn-on'
                        >
                          {" "}
                          {project.projectTitle}
                        </h3>
                        {projects.map(
                          project =>
                            project === index && (
                              <i
                                style={{
                                  color: "#06d6a0",
                                  marginTop: index !== 0 ? "10px" : "0px",
                                  marginLeft: "5px"
                                }}
                                class='far fa-check-circle'
                              ></i>
                            )
                        )}
                      </div>
                    </li>
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
