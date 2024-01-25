import React, { useState } from "react";
import TopBar from "./components/TopBar";
import JsonPlaceholder from "./pages/JsonPlaceholder";
import HeaderBar from "./components/HeaderBar";
import SocketNotfication from "./pages/SocketNotfication";

const App = () => {
  const [headerIndex, setHeaderIndex] = useState(0);

  return (
    <div>
      <HeaderBar headerText={"Socket Notification App"} />
      <TopBar 
      onpress={(btnIndex) => {
        setHeaderIndex(btnIndex)
      }}
      indexVal = {headerIndex}
      />
      {headerIndex === 0 ? <JsonPlaceholder /> : <SocketNotfication />}
    </div>
  );
};

export default App;
