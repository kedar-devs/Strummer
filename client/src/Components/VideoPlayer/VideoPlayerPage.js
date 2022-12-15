import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { AiFillHeart,AiOutlineMenu } from 'react-icons/ai';
import {FaHeartBroken,FaShare} from 'react-icons/fa'
import {ImDownload3} from 'react-icons/im'

function VideoPlayerPage() {
  return (
    <div className="h-screen ">
      <div className="grid grid-cols-3 gap-2 items-left">
        <div className="col-span-2 text-white justify-start">
          <h1 className="text-2xl ">Something exciting here</h1>
          <div className="grid grid-cols-4 mt-3">
            <div className="grid grid-cols-4 col-span-2">
              <div className="">
              <div className="justify-end">
                <img
                  src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  alt="..."
                  className="shadow rounded-full max-w-full h-auto align-middle border-none items-end w-2/6 object-right"
                />
              </div>
              </div>
              <div className="justify-items-start text-xl col-span-2">channel Name</div>
              <div className="text-xl">
                <button className="rounded-full border bg-black px-5 py-1">Follow</button>
              </div>
            </div>
            <div className="col-span-2 items-center text-xl">
              <button className="rounded-lg border bg-black">
              <button className="ml-4 text-red-700 "><AiFillHeart /></button>
              <button className="ml-3 text-red-700 p-3 border-l-2"><FaHeartBroken /></button>
              </button>
              <button className="ml-3 text-blue-600 rounded-lg border p-3 bg-black"><FaShare /></button>
              <button className="ml-3 text-green-600 rounded-lg border p-3 bg-black"><ImDownload3 /></button>
              <button className="ml-3 text-white rounded-lg border p-3 bg-black"><AiOutlineMenu /></button>
            </div>
            
          </div>
          <AddComment />
          <Comment />
        </div>
        <div>bye</div>

        
      </div>
    </div>
  );
}

export default VideoPlayerPage;
