import "./main.css";

import React, { useEffect, useState } from "react";

import { GetAPI } from "../api/callApi";
import RobotList from "../Components/RobotList";
import Dropdown from "../Components/Dropdown";
import Cart from "../Components/Cart";

export default function Main() {
  const [robotData, setRobotData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [material, setMaterial] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentRobots, setCurrentRobots] = useState([]);
  const [filteredRobots, setFilteredRobots] = useState([]);

  // Map through data and get data
  const getData = (jsonData) => {
    jsonData.data.map((item, index) => {
      item.id = index;
    });
    return jsonData;
  };

  //Get all Material list in sorted format
  const getAllMaterials = async (data) => {
    const uniqueMaterials = [];
    const uniqueMaterialsTmp = [];

    // We want to make sure it is unique, so only add to array if it doesn't already appear on there.
    data.forEach((robot) => {
      if (uniqueMaterials.indexOf(robot.material) === -1) {
        uniqueMaterials.push(robot.material);
      }
    });

    //sort material
    uniqueMaterials.sort((a, b) => {
      return a > b ? 1 : -1;
    });

    //Bringing materials in value and label form so that we loop in dropdown
    uniqueMaterials.map((op) => {
      uniqueMaterialsTmp.push({
        value: op,
        label: op,
      });
    });

    return uniqueMaterialsTmp;
  };

  /* Life Cycle Methods, This is for componentDidMount().  */
  useEffect(() => {
    //set loader as true till data loads.
    setLoading(true);
    (async () => {
      const Data = await GetAPI();
      // Add UniqueID to the data
      const finalData = await getData(Data);
      const dataJson = finalData.data;
      // get list of material initially
      const listOfMaterials = await getAllMaterials(dataJson);
      setRobotData(dataJson);
      setMaterial(listOfMaterials);

      // once Data is fetched make loader as false
      if (dataJson.length > 0) {
        setLoading(false);
      }
    })();
  }, []);

  //Hold the selected value.
  const handleDropdown = (selectedMaterial) => {
    setSelectedMaterial(selectedMaterial);
  };

  //To filter Robot data when material is choosed.
  const filteredProducts = robotData
    .filter(function (roboProd) {
      if (roboProd.material == selectedMaterial && selectedMaterial != "All") {
        return true;
      }
      if (selectedMaterial == "All") {
        return true;
      }
      return false;
    })
    .map(function (roboProd) {
      return roboProd;
    });

  // Robot being added to cart
  const handleAddToCart = (robot) => {
    // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
    const checkCart = cart.find((robotCart) => robotCart.id === robot.id);
    const checkRobot = robotData.find((robotItem) => robotItem.id === robot.id);
    const checkCurrentRobot = currentRobots.find(
      (robotItem) => robotItem.id === robot.id
    );
    const checkFilteredData = filteredRobots.find(
      (robotItem) => robotItem.id === robot.id
    );
    // Though unlikely to be called we will not add to cart if the stock is empty
    if (checkRobot.stock === 0) {
      return;
    }

    // If robot is in the cart then increase the stock by one, otherwise create a new robot in cart
    if (checkCart) {
      setCart(
        cart.map((robotCart) =>
          robotCart.id === robot.id
            ? { ...checkCart, stock: checkCart.stock + 1 }
            : robotCart
        )
      );
    } else {
      // Check Cart to see if more than 5 types exist
      if (cart.length > 4) {
        alert(
          "Oops you have exceeded limit!, your not allowed to add more than 5 Robots in Cart."
        );
        return;
      } else {
        setCart([...cart, { ...robot, stock: 1 }]);
      }
    }
    // Remove one item of stock from the robot listing
    setRobotData(
      robotData.map((robotItem) =>
        robotItem.id === robot.id
          ? {
              ...checkRobot,
              stock: checkRobot.stock - 1,
            }
          : robotItem
      )
    );
    // This target would have to appear in this list too.
    setCurrentRobots(
      currentRobots.map((robotItem) =>
        robotItem.id === robot.id
          ? {
              ...checkCurrentRobot,
              stock: checkCurrentRobot.stock - 1,
            }
          : robotItem
      )
    );
    // We also want to update if we have filtered robots.
    if (checkFilteredData) {
      setFilteredRobots(
        filteredRobots.map((robotItem) =>
          robotItem.id === robot.id
            ? {
                ...checkFilteredData,
                stock: checkFilteredData.stock - 1,
              }
            : robotItem
        )
      );
    }
  };

  const handleRemoveFromCart = (robot) => {
    // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
    const checkCart = cart.find((robotCart) => robotCart.id === robot.id);
    const checkRobot = robotData.find((robotItem) => robotItem.id === robot.id);
    const checkCurrentRobot = currentRobots.find(
      (robotItem) => robotItem.id === robot.id
    );
    const checkFilteredData = filteredRobots.find(
      (robotItem) => robotItem.id === robot.id
    );
    // We can check if the item being removed is 1, then we can remove the robot from the cart altogether.
    // If not, then we just decrease the stock count by one.
    if (checkCart.stock === 1) {
      // Use filter to remove it from the cart
      setCart(cart.filter((robotCart) => robotCart.id !== robot.id));
    } else {
      setCart(
        cart.map((robotCart) =>
          robotCart.id === robot.id
            ? { ...checkCart, stock: checkCart.stock - 1 }
            : robotCart
        )
      );
    }
    // We then increase the robot count by one in the robot list.
    setRobotData(
      robotData.map((robotItem) =>
        robotItem.id === robot.id
          ? {
              ...checkRobot,
              stock: checkRobot.stock + 1,
            }
          : robotItem
      )
    );
    // This target would have to appear in this list too.
    setCurrentRobots(
      currentRobots.map((robotItem) =>
        robotItem.id === robot.id
          ? {
              ...checkCurrentRobot,
              stock: checkCurrentRobot.stock + 1,
            }
          : robotItem
      )
    );
    // We also want to update if we have filtered robots.
    if (checkFilteredData) {
      setFilteredRobots(
        filteredRobots.map((robotItem) =>
          robotItem.id === robot.id
            ? {
                ...checkFilteredData,
                stock: checkFilteredData.stock + 1,
              }
            : robotItem
        )
      );
    }
  };

  return (
    <div className="Container">
      <div className="left-container">
        {Loading && <p>Loading data ...</p>}
        {!Loading && robotData.length > 0 && (
          <React.Fragment>
            {/* filter material Component */}
            <div className="Dropdown-container">
              <div className="sub-title-text">Filter By Material: </div>
              <Dropdown
                data={material}
                value={selectedMaterial}
                placeholder="All Materials"
                placeholderValue="All"
                onChange={handleDropdown}
              />
            </div>
            {/* Robot card list component */}
            <div class="card-row">
              {filteredProducts.map((robot) => (
                <RobotList
                  robot={robot}
                  key={robot.id}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>

      {/* Cart list component */}
      <div className="right-container">
        <Cart
          cart={cart}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </div>
  );
}
