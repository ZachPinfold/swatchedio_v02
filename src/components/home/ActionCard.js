import React, { useState } from "react";
import { connect } from "react-redux";

const ActionCard = ({
  auth: { isAuthenticated },
  handleHover,
  divId,
  showCopy,
  handleMoreClick,
  copyColor,
  showAction,
  toggleShowAction,
  layout: { discover },
  frontBack
}) => {
  const [circleSize, setCircleSize] = useState(false);

  return (
    <div onClick={e => e.stopPropagation()} className='actions-area'>
      <div
        onMouseOver={e => handleHover(e, frontBack)}
        onClick={e => e.stopPropagation()}
        id={divId}
        className='click-more-circles'
      >
        <div
          style={{ display: !showCopy || !discover ? "none" : "block" }}
          onMouseOver={() => setCircleSize(true)}
          onMouseOut={() => setCircleSize(false)}
          onClick={handleMoreClick}
          className='circle-click-area'
          onClick={() => {
            toggleShowAction({ [divId]: !showAction[divId] });
          }}
        >
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              marginTop: "0px",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
          <div
            style={{
              transform: circleSize ? "scale(1.2)" : "scale(1)",
              backgroundColor: copyColor
            }}
            className='circle'
          ></div>
        </div>
      </div>
      {showAction[divId] && (
        <div onClick={e => e.stopPropagation()} className='more-card-box'>
          <h3
            onClick={() => toggleShowAction(false)}
            className='action-x-close'
          >
            x
          </h3>

          <h3 className='more-card-title'>Actions</h3>
          <div className='break-line'></div>
          <div style={{ marginBottom: "10px" }} className='action-button-area'>
            <h3
              style={{ opacity: isAuthenticated ? "1" : "0.3" }}
              className='more-card-add-btn'
            >
              Add to my Master Swatch
            </h3>
            <h3
              style={{ opacity: isAuthenticated ? "1" : "0.3" }}
              className='more-card-add-btn'
            >
              Add to my project...
            </h3>
          </div>
          <div className='break-line'></div>
          {isAuthenticated && (
            <button style={{ marginTop: "10px" }} className='btn-primary'>
              Add to swatch
            </button>
          )}
          {!isAuthenticated && (
            <button style={{ marginTop: "10px" }} className='btn-primary'>
              Login to Access
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mstp = state => ({
  auth: state.auth,
  layout: state.layout
});

export default connect(mstp, null)(ActionCard);
