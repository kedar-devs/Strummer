import React from "react";
import backGround from "./../../Assets/bgCreator.png";
import { useNavigate } from "react-router-dom";
function BecomeCreator() {
  const navigator=useNavigate()
  return (
    <div
      className="bg-cover bg-center flex item-center justify-center w-full bg-no-repeat min-h-screen px-4 sm:px-6 lg:px-8 py-40 relative"
      style={{ backgroundImage: `url(${backGround})` }}
    >
      <div class="absolute bg-black opacity-40 inset-0 z-0"></div>
      <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900 capitalize">
            You are not a Content Creator yet!!!!
          </h2>
          <p className="mt-2 text-sm text-gray-400 mb-3">
            but you can change that by signing in to be one
          </p>
          <div className="mt-5">
          <button class="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{navigator('/BecomeCreator')}}>
            Become Creator
          </button>
          <button class="bg-green-700 mx-2 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{navigator('/loginCreator')}}>
            Sign in
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeCreator;
