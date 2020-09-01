import React, { useState, useEffect, useRef } from "react";
import SwatchCard from "./SwatchCard";
import SwatchActionButton from "./SwatchActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteProjectById } from "../../actions/swatch";
import useOnClickOutside from "use-onclickoutside";

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

const SwatchList = ({
  title,
  swatches,
  listId,
  index,
  deleteProjectById,
  projectList
}) => {
  const [showCircleBack, setshowCircleBack] = useState(false);
  const [showDelete, setshowDelete] = useState(false);

  const wrapperRef = useRef(null);

  const closeDeleteBox = () => {
    setshowDelete(false);
  };

  useOnClickOutside(wrapperRef, closeDeleteBox);

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
                    justifyContent: title !== "Master" && "space-between"
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
                  {title !== "Master" && (
                    <div
                      onMouseOver={() => setshowCircleBack(true)}
                      onMouseOut={() => setshowCircleBack(false)}
                      onClick={() => setshowDelete(!showDelete)}
                      style={{
                        height: "10px",
                        padding: "6px 5px 0px 3px",
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: showCircleBack
                          ? "black"
                          : "transparent",
                        borderRadius: "3px",
                        cursor: "pointer"
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: showCircleBack ? "white" : "black"
                        }}
                        className='small-circle'
                      ></div>
                      <div
                        style={{
                          backgroundColor: showCircleBack ? "white" : "black"
                        }}
                        className='small-circle'
                      ></div>
                      <div
                        style={{
                          backgroundColor: showCircleBack ? "white" : "black"
                        }}
                        className='small-circle'
                      ></div>
                    </div>
                  )}
                  {title === "Master" && (
                    <p className='master-subtitle'>- For all your favourites</p>
                  )}
                </div>
                {showDelete && (
                  <div
                    ref={wrapperRef}
                    style={{
                      zIndex: "100",
                      marginTop: "-100px",
                      marginLeft: "72px"
                    }}
                    className='card-action-container'
                  >
                    <button
                      onClick={() =>
                        deleteProjectById(listId, projectList, index)
                      }
                      className='delete-swatch'
                    >
                      Delete project
                    </button>
                  </div>
                )}

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

export default connect(null, { deleteProjectById })(SwatchList);
