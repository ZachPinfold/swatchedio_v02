import React from "react";
import SwatchCard from "./SwatchCard";
import SwatchActionButton from "./SwatchActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: grey;
  border-radius: 3px;
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-right: 8px;
  transition: height 0.4s ease-out;
  height: 100%;
  /* width: ${({ size }) =>
    (size === "small" && "200px") || (size === "large" && "200px")}; */
`;

const SwatchList = ({ title, swatches, listId, index }) => {
  return (
    <Draggable
      // isDragDisabled={index === 0}
      draggableId={String(listId)}
      index={index}
      key={listId}
    >
      {provided => (
        <ListContainer
          size={index === 0 ? "small" : "large"}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listId)} type='card'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                {swatches.map((card, index) => (
                  <SwatchCard
                    order={card.order}
                    index={index}
                    key={card.id}
                    text={card.text}
                    id={card.id}
                    hexCode={card.hexCode}
                  />
                ))}
                {provided.placeholder}
                <SwatchActionButton swatches={swatches} listId={listId} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default SwatchList;
