import "./main.css";

import React, { useEffect, useState } from "react";

import { GetAPI } from "../api/callApi";
import RobotList from "../Components/RobotList";

export default function Main() {
  const [robotData, setRobotData] = useState([]);
  const [Loading, setLoading] = useState(false);

  // Map through data and get data
  const getData = (jsonData) => {
    jsonData.data.map((item, index) => {
      item.id = index;
    });
    return jsonData;
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
      setRobotData(dataJson);
    })();
  }, []);

  useEffect(() => {
    // once Data is fetched make loader as false
    if (robotData.length > 0) {
      setLoading(false);
    }
  }, [robotData]);

  console.log(robotData);

  return (
    <div className="Container">
      <div className="left-container">
        {Loading && <p>Loading data ...</p>}
        {!Loading && robotData.length > 0 && (
          <React.Fragment>
            <div class="card-row">
              {robotData.map((robot) => (
                <RobotList robot={robot} key={robot.id} />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
