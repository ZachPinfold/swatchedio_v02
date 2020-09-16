import React, { Fragment, useEffect } from "react";
import Footer from "./Footer";
import { closeDiscover } from "../../actions/layout";
import { openProfile } from "../../actions/layout";
import { connect } from "react-redux";

const HowItWorks = ({ closeDiscover, openProfile }) => {
  useEffect(() => {
    closeDiscover();
    openProfile();
  }, []);

  return (
    <Fragment>
      <div className='video-screen'>
        <h1 className='video-heading'>How Swatched Works</h1>
        <div className='video-container'>
          <iframe
            src='https://player.vimeo.com/video/458496738'
            // width='640'
            // height='395'
            frameborder='0'
            allow='autoplay; fullscreen'
            allowfullscreen
            className='video-frame'
          ></iframe>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default connect(null, {
  closeDiscover,
  openProfile
})(HowItWorks);
