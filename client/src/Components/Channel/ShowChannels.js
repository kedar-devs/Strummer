import React, { useState } from "react";

function ShowChannels() {
  const channels = [
    "channelName",
    "channelName",
    "channelName",
    "channelName",
  ];

  return (
    <div className="grid grid-cols-4 text-white" >

      {channels.map((channel) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black">
            <img
              className="w-full"
              src="/img/card-top.jpg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowChannels;
