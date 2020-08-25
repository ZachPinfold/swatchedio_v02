import React from "react";
import SwatchCard from "./SwatchCard";
import SwatchActionButton from "./SwatchActionButton";
import { Droppable } from "react-beautiful-dnd";

const SwatchList = ({ title, cards, listId }) => {
  return (
    <Droppable droppableId={String(listId)}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.container}
        >
          <h4>{title}</h4>
          {cards.map((card, index) => (
            <SwatchCard
              index={index}
              key={card.id}
              text={card.text}
              id={card.id}
            />
          ))}
          <SwatchActionButton listId={listId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  container: {
    backgroundColor: "grey",
    borderRadius: 3,
    width: "300px",
    padding: 8,
    marginRight: 8,
    height: "100%"
  }
};

export default SwatchList;
