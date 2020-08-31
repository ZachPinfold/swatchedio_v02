import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { Draggable } from "react-beautiful-dnd";
import { Provider } from "react-redux";
import styled from "styled-components";
import getContrastYIQ from "../utils/dominantColor";
import { deleteSwatchCard } from "../../actions/swatch";
import { connect } from "react-redux";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const Car = styled.div`
  margin-bottom: 8px;
`;

const SwatchCard = ({
  projectId,
  swatches,
  id,
  index,
  order,
  hexCode,
  deleteSwatchCard
}) => {
  const [copyColor, setCopyColor] = useState(null);
  const [copyHover, setCopyHover] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showCircle, setCircleHover] = useState(false);
  const [showCardActions, setShowCardActions] = useState(false);
  const [showCardDelete, setCardDelete] = useState(false);

  useEffect(() => {
    const textColor = getContrastYIQ(hexCode);
    setCopyColor(textColor);
  }, []);

  const handleCopy = () => {
    setShowCopied(true);
    navigator.clipboard.writeText(hexCode);
    console.log(hexCode);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            onMouseOver={() => setShowCardActions(true)}
            onMouseLeave={() => setShowCardActions(false)}
            style={{ backgroundColor: hexCode, minHeight: 90 }}
          >
            <div className='card-container'>
              <h3 className='card-text' style={{ color: copyColor }}>
                {hexCode}
              </h3>

              {showCardDelete && (
                <div className='card-action-container'>
                  <button
                    className='btn-primary delete-swatch'
                    onClick={() =>
                      deleteSwatchCard(id, projectId, swatches, index)
                    }
                  >
                    Delete color
                  </button>
                </div>
              )}
              {showCardActions && (
                <div>
                  <div
                    style={{
                      color: copyColor,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginBottom: "2px"
                      }}
                    >
                      <div
                        onMouseOver={() => setCircleHover(true)}
                        onMouseOut={() => setCircleHover(false)}
                        onClick={() => setCardDelete(!showCardDelete)}
                        style={{
                          padding: "5px 5px 5px 3px",
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: showCircle
                            ? "#cfcfcf"
                            : "transparent",
                          borderRadius: "3px",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          style={{ backgroundColor: copyColor }}
                          className='small-circle'
                        ></div>
                        <div
                          style={{ backgroundColor: copyColor }}
                          className='small-circle'
                        ></div>
                        <div
                          style={{ backgroundColor: copyColor }}
                          className='small-circle'
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "7px",
                      marginRight: "4.5px",
                      color: copyColor,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    {showCopied && <p className='copied-text'>{`copied!`}</p>}
                    <i
                      onMouseOver={() => {
                        setCopyHover(true);
                      }}
                      onMouseOut={() => {
                        setCopyHover(false);
                      }}
                      onClick={handleCopy}
                      style={{
                        opacity: copyHover ? "1" : "0.5",
                        cursor: "pointer",
                        color: copyColor
                      }}
                      class='fas fa-copy'
                    ></i>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default connect(null, { deleteSwatchCard })(SwatchCard);
