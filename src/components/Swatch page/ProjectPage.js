import React from "react";
import SwatchList from "./SwatchList";
import { connect } from "react-redux";
import SwatchActionButton from "./SwatchActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sortSwatches } from "../../actions/swatch";

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
      <div style={styles.listContainer}>
        {swatchList.map(list => (
          <SwatchList listId={list.id} title={list.title} cards={list.cards} />
        ))}
        <SwatchActionButton list />
      </div>
    </DragDropContext>
  );
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

const mts = state => ({
  swatchList: state.swatchReducer
});

export default connect(mts, { sortSwatches })(ProjectPage);
