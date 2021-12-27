import React from "react";
import logo from "./../assets/images/logo.png";

export default function Header(props) {
  return (
    <div className="header">
      <img src={logo} alt="robo" />
      <h1>Robot Market</h1>
    </div>
  );
}
