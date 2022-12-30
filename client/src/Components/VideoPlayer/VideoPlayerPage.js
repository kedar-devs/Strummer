import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { AiFillHeart, AiOutlineMenu } from "react-icons/ai";
import { FaHeartBroken, FaShare } from "react-icons/fa";
import { ImDownload3 } from "react-icons/im";

function VideoPlayerPage(props) {
  console.log('From Video',props)
  return (
    <div className="h-80">
      <div className="grid grid-cols-3 gap-2 items-left">
        <div className="col-span-2 text-white justify-start ml-16">
          <h1 className="text-2xl ">Something exciting here</h1>
          <div className="grid grid-cols-4 mt-3">
            <div className="grid grid-cols-4 col-span-2">
              <div className="justify-end object-right ">
                <div className="w-2/6">
                  <img
                    src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                    alt="..."
                    className="shadow rounded-full max-w-full h-auto align-middle border-none items-end lg:ml-16"
                  />
                </div>
              </div>
              <div className="justify-items-start text-xl col-span-2">
                <h2>channel Name</h2>
                <p className="text-sm">Subscriber 0</p>
              </div>

              <div className="text-xl">
                <button className="rounded-full border bg-black px-5 py-1">
                  Follow
                </button>
              </div>
            </div>
            <div className="col-span-2 items-center text-xl">
              <button className="rounded-lg border bg-black">
                <button className="ml-4 text-red-700 ">
                  <AiFillHeart />
                </button>
                <button className="ml-3 text-red-700 p-3 border-l-2">
                  <FaHeartBroken />
                </button>
              </button>
              <button className="ml-3 text-blue-600 rounded-lg border p-3 bg-black">
                <FaShare />
              </button>
              <button className="ml-3 text-green-600 rounded-lg border p-3 bg-black">
                <ImDownload3 />
              </button>
              <button className="ml-3 text-white rounded-lg border p-3 bg-black">
                <AiOutlineMenu />
              </button>
            </div>
          </div>
          European Parliament's Vice-President Eva Kaili has been arrested on
          charges of corruption and money-laundering. Kaili is accused of
          accepting money and gifts from Qatar in exchange of influencing
          European policy in Doha's favour. @MollyGambhir tells you.
          #europeanparliament #evakaili #gravitas About Channel: WION The World
          is One News, examines global issues with in-depth analysis. We provide
          much more than the news of the day. Our aim to empower people to
          explore their world. With our Global headquarters in New Delhi, we
          bring you news on the hour, by the hour. We deliver information that
          is not biased. We are journalists who are neutral to the core and
          non-partisan when it comes to the politics of the world. People are
          tired of biased reportage and we stand for a globalised united world.
          So for us the World is truly One. Please keep discussions on this
          channel clean and respectful and refrain from using racist or sexist
          slurs as well as personal insults.
        </div>
        <div className="text-white">
          {" "}
          <AddComment id={props.videoInfo._id}/>
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage;
