import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

function VideoPlayerPage() {
  return (
    <div className="h-screen ">
      <div className="grid grid-cols-3 gap-2 items-left">
        <div className="col-span-2 text-white justify-start">
          <h1 className="text-2xl ">Something exciting here</h1>
          <div className="grid grid-cols-4 mt-3">
            <div className="grid grid-cols-4 col-span-2">
              <div className="">
                <img
                  src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  alt="..."
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
              <div className="item-left col-span-2">channel Name</div>
              <div className="">
                <button>Follow</button>
              </div>
            </div>
            <div className="col-span-2 items-center">
              <button>Like</button>
              <button>dislike</button>
              <button>Share</button>
              <button>Download</button>
              <button>more</button>
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
