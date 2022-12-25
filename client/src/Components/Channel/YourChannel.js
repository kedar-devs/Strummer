import React from "react";
import ChannelHeading from "./ChannelHeading";
import ChannelNavbar from "./ChannelNavbar";
import { Outlet } from "react-router-dom";
function YourChannel() {
  return (
    <div>
      <ChannelHeading />
      <ChannelNavbar />
      <Outlet />
    </div>
  );
}

export default YourChannel;
