import React from "react";
import SwatchCard from "./SwatchCard";
import SwatchActionButton from "./SwatchActionButton";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: grey;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 8px;
  height: 100%;
`;

const SwatchList = ({ title, cards, listId, index }) => {
  return (
    <Droppable droppableId={String(listId)}>
      {provided => (
        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
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
        </ListContainer>
      )}
    </Droppable>
  );
};

export default SwatchList;
