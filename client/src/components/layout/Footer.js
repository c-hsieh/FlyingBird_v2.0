import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "./google.svg";

const Footer = () => {
  return (
    <React.Fragment>
      {/* <div
        className="mb-1 text-center text-mute"
        
      >
        
      </div> */}
      <footer
        className="text-center text-mute"
        style={{
        paddingTop: "15px",
        paddingBottom: "15px",
        backgroundColor: "#F2F2F2",
        weight: "100%",
      }}>
        © Create by Aaron
      </footer>
    </React.Fragment>
  );
};
export default Footer;
