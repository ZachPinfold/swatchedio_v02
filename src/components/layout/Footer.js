import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <p className='footer-copy'>
        Designed and built by{" "}
        <a
          href='http://zachp.sgedu.site/'
          target='_blank'
          className='zach-footer'
        >
          Zach Pinfold
        </a>
        <span>
          {" "}
          Powered by the{" "}
          <a
            style={{ color: "#06d6a0" }}
            href='https://www.colourlovers.com/'
            target='_blank'
            className='zach-footer'
          >
            {" "}
            Colour Lovers API
          </a>
        </span>
      </p>
      <p className='footer-copy'>
        <span>
          <Link
            style={{ color: "black" }}
            to='how-it-works'
            className='zach-footer how'
          >
            How it works
          </Link>
        </span>
      </p>
    </footer>
  );
}
