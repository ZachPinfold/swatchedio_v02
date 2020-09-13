import React, { useEffect, useState } from "react";
import SwatchList from "./SwatchList";
import { connect } from "react-redux";
import SwatchActionButton from "./SwatchActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sortSwatches, loadProjects } from "../../actions/swatch";
import { closeDiscover } from "../../actions/layout";
import { openProfile } from "../../actions/layout";

import { secondPageReset } from "../../actions/colors";
import { testAction } from "../../actions/testAction";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import Loader from "../layout/Loader";
import DragScroll from "react-dragscroll";

const ProjectPage = ({
  projectList,
  sortSwatches,
  closeDiscover,
  secondPageReset,
  testAction,
  test,
  auth: { id, isAuthenticated },
  loadProjects,
  openProfile
}) => {
  const [pageLoad, setLoad] = useState(true);

  useEffect(() => {
    if (isAuthenticated) loadProjects(id);
    secondPageReset();
    closeDiscover();
    openProfile();
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, [isAuthenticated]);

  if (!pageLoad) {
    document.body.style.background = "#1F334C";
  }

  // createPostListener =

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    sortSwatches(
      projectList.projects,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };

  return pageLoad ? (
    <Loader />
  ) : (
    <div
      claddname='profile-background'
      style={{
        height: "100%",
        paddingBottom: "30px",
        paddingLeft: "30px",
        width: "100%"
      }}
    >
      <ColorArea>
        <h3 className='top-color-text'>Today's top color:</h3>
        <h3 className='top-color-text'>#345fht</h3>
      </ColorArea>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-lists' direction='horizontal' type='list'>
          {provided => (
            <ListContainer
              style={{ marginBottom: "30px" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {projectList.projects.map((project, index) => (
                <SwatchList
                  projectList={projectList.projects}
                  listId={project.id}
                  title={project.projectTitle}
                  swatches={project.swatches.items}
                  key={project.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <SwatchActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  position: absolute;
`;

const ColorArea = styled.div`
  padding-top: 100px;
`;

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
    // width: "100vw",
    marginLeft: 20,
    paddingRight: 20,
    position: "absolute",
    marginTop: 100
  }
};

const mts = state => ({
  projectList: state.swatchReducer,
  test: state.test,
  auth: state.auth
});

export default connect(mts, {
  sortSwatches,
  closeDiscover,
  secondPageReset,
  openProfile,
  testAction,
  loadProjects
})(ProjectPage);
