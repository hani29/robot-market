import React from "react";
import logo from "./../assets/images/logo.png";

export default function Header(props) {
  return (
    <div className="header">
      <img src={logo} alt="robo" width="50" height="60" />
      <h1 style={{marginLeft: 10}}>Robot Market</h1>
    </div>
  );
}
