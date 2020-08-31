import React from "react";
import SwatchCard from "./SwatchCard";
import SwatchActionButton from "./SwatchActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: ${({ master }) =>
    (master === true && "#e3fcf6") || (master === false && "white")};
  border-radius: 3px;
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 8px;
  height: 100%;
  width: ${({ size }) =>
    (size === "small" && "200") || (size === "large" && "400px")};
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
          master={title === "Master" ? true : false}
          size={title === "master" ? "large" : "small"}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listId)} type='card'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "centre"
                  }}
                >
                  {title === "Master" && (
                    <i style={{ marginRight: "5px" }} class='far fa-star'></i>
                  )}

                  <h4
                    style={{
                      marginBottom: "10px"
                    }}
                    className='project-title'
                  >
                    {title}
                  </h4>
                  {title === "Master" && (
                    <p className='master-subtitle'>
                      - All your favourites go here
                    </p>
                  )}
                </div>

                {swatches.map((card, index) => (
                  <SwatchCard
                    order={card.order}
                    index={index}
                    key={card.id}
                    text={card.text}
                    id={card.id}
                    hexCode={card.hexCode}
                    projectId={listId}
                    swatches={swatches}
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
