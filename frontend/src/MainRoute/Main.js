import "./main.css";

import React, { useEffect, useState } from "react";

import { GetAPI } from "../api/callApi";
import RobotList from "../Components/RobotList";
import Dropdown from "../Components/Dropdown";

export default function Main() {
  const [robotData, setRobotData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [material, setMaterial] = useState([]);

  // Map through data and get data
  const getData = (jsonData) => {
    jsonData.data.map((item, index) => {
      item.id = index;
    });
    return jsonData;
  };

  const collectAllMaterials = async (data) => {
    const uniqueMaterials = [];
    const uniqueMaterialsTmp = [];

    // We want to make sure it is unique, so only add to array if it doesn't already appear on there.
    data.forEach((robot) => {
      if (uniqueMaterials.indexOf(robot.material) === -1) {
        uniqueMaterials.push(robot.material);
      }
    });
    uniqueMaterials.sort((a, b) => {
      return a > b ? 1 : -1;
    });
    uniqueMaterials.map((op) => {
      uniqueMaterialsTmp.push({
        value: op,
        label: op,
      });
    });

    return uniqueMaterialsTmp;
  };

  /* Life Cycle Methods */
  useEffect(() => {
    //set loader as true till data loads.
    setLoading(true);
    (async () => {
      const Data = await GetAPI();
      // Add UniqueID to the data
      const finalData = await getData(Data);
      const dataJson = finalData.data;
      const listOfMaterials = await collectAllMaterials(dataJson);

      console.log(listOfMaterials);

      setRobotData(dataJson);
      setMaterial(listOfMaterials);
    })();
  }, []);

  useEffect(() => {
    // once Data is fetched make loader as false
    if (robotData.length > 0) {
      setLoading(false);
    }
  }, [robotData]);

  const handleDropdown = (selectedMaterial) => {
    setSelectedMaterial(selectedMaterial);
  };

  const filteredProducts = robotData
    .filter(function (prod) {
      if (prod.material == selectedMaterial && selectedMaterial != "All") {
        return true;
      }
      if (selectedMaterial == "All") {
        return true;
      }
      return false;
    })
    .map(function (prod) {
      return prod;
    });

  return (
    <div className="Container">
      <div className="left-container">
        {Loading && <p>Loading data ...</p>}
        {!Loading && robotData.length > 0 && (
          <React.Fragment>
              <div className="Dropdown-container">
                  <div className="sub-title-text">Filter By Material:  </div>
            <Dropdown
              data={material}
              styleClass="none"
              value={selectedMaterial}
              placeholder="All Materials"
              placeholderValue="All"
              onChange={handleDropdown}
            />
            </div>
            <div class="card-row">
              {filteredProducts.map((robot) => (
                <RobotList robot={robot} key={robot.id} />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
