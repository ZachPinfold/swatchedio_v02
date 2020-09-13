import React, { Fragment } from "react";
import { connect } from "react-redux";

const CopyArea = ({
  copyColor,
  showCopy,
  hoverEffect,
  divId,
  randomLoad,
  color2,
  color,
  copied,
  layout: { discover }
}) => {
  return (
    <Fragment>
      <div className='card-copy-div'>
        <h3
          style={{
            color: copyColor,
            opacity: !showCopy ? "0" : "1"
          }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {randomLoad ? color : color2}
        </h3>
        <h3
          style={{ color: copyColor, opacity: !showCopy ? "0" : "1" }}
          onMouseEnter={e => hoverEffect(e)}
          id={divId}
          className='card-copy-copy'
        >
          {!copied ? "Click to Copy" : "Copied!"}
        </h3>
      </div>
      {discover && (
        <div className='card-copy-div-mobile'>
          <h3
            style={{
              color: copyColor
            }}
            onMouseEnter={e => hoverEffect(e)}
            id={divId}
            className='card-copy-copy'
          >
            {randomLoad ? color : color2}
          </h3>
          <h3
            style={{ color: copyColor }}
            onMouseEnter={e => hoverEffect(e)}
            id={divId}
            className='card-copy-copy'
          >
            {!copied ? "Click to Copy" : "Copied!"}
          </h3>
        </div>
      )}
    </Fragment>
  );
};

const mstp = state => ({
  layout: state.layout
});

export default connect(mstp, null)(CopyArea);
