import React, { useEffect } from "react";
import SwatchList from "./SwatchList";
import { connect } from "react-redux";
import SwatchActionButton from "./SwatchActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sortSwatches, loadProjects } from "../../actions/swatch";
import { closeDiscover } from "../../actions/layout";
import { secondPageReset } from "../../actions/colors";
import { testAction } from "../../actions/testAction";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  position: absolute;
`;

const ProjectPage = ({
  swatchList,
  sortSwatches,
  closeDiscover,
  secondPageReset,
  testAction,
  test,
  loadProjects
}) => {
  useEffect(() => {
    loadProjects();
    secondPageReset();
    closeDiscover();
  }, []);

  console.log(swatchList.projects);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    sortSwatches(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {test.users.map(user => (
          <div>
            <p>{user.user}</p>
            <p>{user.age}</p>
          </div>
        ))}
        <button onClick={() => testAction()}>Click Me</button>
        <Droppable droppableId='all-lists' direction='horizontal' type='list'>
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {swatchList.projects.map((project, index) => (
                <SwatchList
                  listId={project.id}
                  title={project.title}
                  swatches={project.swatches.items}
                  key={project.id}
                  index={index}
                />
              ))}
              <SwatchActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

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
  swatchList: state.swatchReducer,
  test: state.test
});

export default connect(mts, {
  sortSwatches,
  closeDiscover,
  secondPageReset,
  testAction,
  loadProjects
})(ProjectPage);
