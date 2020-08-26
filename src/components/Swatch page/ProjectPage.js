import React from "react";
import SwatchList from "./SwatchList";
import { connect } from "react-redux";
import SwatchActionButton from "./SwatchActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sortSwatches } from "../../actions/swatch";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  position: absolute;
`;

const ProjectPage = ({ swatchList, sortSwatches }) => {
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    sortSwatches(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListContainer>
        {swatchList.map(list => (
          <SwatchList listId={list.id} title={list.title} cards={list.cards} />
        ))}
        <SwatchActionButton list />
      </ListContainer>
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
  swatchList: state.swatchReducer
});

export default connect(mts, { sortSwatches })(ProjectPage);
