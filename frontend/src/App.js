import * as React from "react";

import Header from "./Components/Header";
import Main from "./MainRoute/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <h3 className="App-title">Buy Your Favorite <b className="text-highlight">Robot</b> & Control EveryThing In Your <b className="text-highlight">Smart Home.</b></h3>
      </div>
      <Main />
    </div>
  );
}

export default App;
