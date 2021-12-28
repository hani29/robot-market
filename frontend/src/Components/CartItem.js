import React from "react";
import defaultImage from "../assets/images/dummy.jpg";
import { formatOfPrice} from "../Common/common";

const CartItem = (props) => {
  const { robot, handleAddToCart, handleRemoveFromCart } = props;

  return (
    <div className="cart-card">
      <div className="cart-sub-container">
        <div>
          <img
            src={robot.image ? `${robot.image}` : `${defaultImage}`}
            alt={robot.name}
            className="cart-robo"
          />
        </div>
        <div>
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
          </table>
        </div>
      </div>
      <div className="cart-card-footer">
        <button
          onClick={() => handleRemoveFromCart(robot)}
          className="cart-button"
          style={{ backgroundColor: "#415165" }}
        >
          -
        </button>
        <div className="wrap-text text-center">
          <b> {robot.stock ? `${robot.stock}` : `Out Of Stock`} </b>
        </div>
        <button
          onClick={() => handleAddToCart(robot)}
          className="cart-button"
          style={{ backgroundColor: "#0ebbd0" }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
