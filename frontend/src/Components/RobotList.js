import React from "react";
import defaultImage from "./../assets/images/dummy.jpg";
import { formatOfDate, formatOfPrice } from "../Common/common";

const RobotList = (props) => {
  const { robot, handleAddToCart } = props;

  return (
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
            <td className="sub-title-text">{formatOfPrice(robot.price)}</td>
          </tr>
          <tr>
            <td className="sub-title">In Stock: </td>
            <td className="sub-title-text">
              {robot.stock ? `${robot.stock}` : `Out Of Stock`}
            </td>
          </tr>
          <tr>
            <td className="sub-title">Created: </td>
            <td className="sub-title-text">{formatOfDate(robot.createdAt)}</td>
          </tr>
        </table>
        {/* Add to cart and disable button when ut is out of stock */}
        <button
          className="button"
          onClick={() => handleAddToCart(robot)}
          disabled={robot.stock <= 0}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default RobotList;
