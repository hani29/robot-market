import React from "react";
import CartItem from "./CartItem";
import { TotalNumberOfRobots, TotalPrice } from "../Common/common";

export default function Cart(props) {
  const { cart, handleAddToCart, handleRemoveFromCart } = props;

  const numberOfRobots = TotalNumberOfRobots(cart);
  const totalPriceOfRobots = TotalPrice(cart);

  return (
    <div className="cart-container">
      <h2 className="text-center">My Cart</h2>
      {cart.length === 0 && (
        <div
          className="sub-title"
          style={{ padding: 30, display: "block", textAlign: "center" }}
        >
          <b>Your Cart is empty!</b> <br />{" "}
          <div> Looks like you haven't made your choice yet...</div>
        </div>
      )}
      {cart.map((robot) => (
        <CartItem
          robot={robot}
          key={robot.id}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      {cart.length !== 0 && (
        <React.Fragment>
          <hr />
          <table>
            <tr>
              <td className="sub-title">Total Robots: </td>
              <td className="sub-title-text">{numberOfRobots}</td>
            </tr>
            <tr>
              <td className="sub-title">Total Price: </td>
              <td className="sub-title-text">{totalPriceOfRobots}</td>
            </tr>
          </table>
        </React.Fragment>
      )}
    </div>
  );
}
