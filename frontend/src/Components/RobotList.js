import defaultImage from "./../assets/images/dummy.jpg";

import React from "react";

const RobotList = (props) => {
  const { robot } = props;

  // format price to THB
  const formatPrice = (price) => {
    if (!price) {
      return "No Payment";
    }
    const realPrice = parseInt(price);
    return realPrice.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
    });
  };

  // format date to DD-MM-YY
  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div class="card-column">
      <div class="card">
        <img
          src={robot.image ? `${robot.image}` : `${defaultImage}`}
          alt="Avatar"
          style={{ width: "50%" }}
        />
        <div class="card-container">
          <h3>
            <b className="title">{robot.name}</b>
          </h3>

          <table>
            <tr>
              <td className="sub-title">Material: </td>
              <td className="sub-title-text"> {robot.material}</td>
            </tr>
            <tr>
              <td className="sub-title">Price: </td>
              <td className="sub-title-text">{formatPrice(robot.price)}</td>
            </tr>
            <tr>
              <td className="sub-title">In Stock: </td>
              <td className="sub-title-text">
                {robot.stock ? `${robot.stock}` : `Out Of Stock`}
              </td>
            </tr>
            <tr>
              <td className="sub-title">Created: </td>
              <td className="sub-title-text">{formatDate(robot.createdAt)}</td>
            </tr>
          </table>
          <button className="button">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default RobotList;
