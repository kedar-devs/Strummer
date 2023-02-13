import React, { useState, useEffect } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { AiFillHeart } from "react-icons/ai";
import { FaHeartBroken, FaShare } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Bars } from "react-loader-spinner";

function VideoPlayerPage(props) {
  const navigation = useNavigate();
  const [videoInfo, setVideoInfo] = useState({});
  const [channelInfo, setChannelInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isLiked, setisLiked] = useState(false);
  const [isDisLiked, setIsDisliked] = useState(false);
  const [isFollowing, setFollowing] = useState(false);
  const [UsersId, setUserId] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
  );
  const [commentCnt, setCommentCnt] = useState(0);
  const prod = {
    name: "creator",
    email: "kedard249.kd@gmail.com",
    price: 100,
  };
  useEffect(() => {
    setVideoInfo(props.videoInfo);
    setChannelInfo(props.channelInfo);
    console.log(props.channelInfo);
    if (props.channelInfo.channelImage) {
      setImgSrc(props.channelInfo.channelImage);
    }
    let Token = localStorage.getItem("Token");
    if (Token) {
      axios
        .get(`/User/GetUserId/${Token}`)
        .then((user) => {
          console.log(user.data);
          const userId = user.data;
          setUserId(userId);
          const channelId = props.channelInfo._id;
          axios
            .post("/ChannelRoute/CheckSubscription", { userId, channelId })
            .then((subStatus) => {
              setFollowing(true);
            })
            .catch((err) => {
              setFollowing(false);
            });
            const contentId=props.videoInfo._id
            axios.put('/Content/Likes/checkLikes',{userId,contentId})
            .then(result=>{
              setisLiked(true)
            })
            .catch(err=>{
              console.log(err)
            })
            axios.put('/Content/Dislikes/checkLikes',{userId,contentId})
            .then(result=>{
              setIsDisliked(true)
            })
            .catch(err=>{
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }, [videoInfo, props]);

  const makePayment = (token) => {
    const body = {
      token,
      prod,
    };
    axios
      .post("/User/payment", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FollowChannel = (id) => {
    if (!isFollowing) {
      const Token = localStorage.getItem("Token");
      if (Token) {
        axios
          .get(`/User/GetUserId/${Token}`)
          .then((result) => {
            const userId = result.data;
            const channelId = id;
            axios
              .post("/ChannelRoute/AddSubscription", { userId, channelId })
              .then((result) => {
                setFollowing(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("You need to login to follow ");
      }
    } else {
      const Token = localStorage.getItem("Token");
      if (Token) {
        axios
          .get(`/User/GetUserId/${Token}`)
          .then((result) => {
            const userId = result.data;

            axios
              .delete(`/ChannelRoute/RemoveSubscription`, {
                data: { userId, id },
              })
              .then((result) => {
                setFollowing(false);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const AddLike = async (id) => {
    if (!isLiked && !isDisLiked) {
          await axios
            .post(`/Content/AddLike/${id}`,{userId:UsersId})
            .then((result) => {
              let newVideoInfo = videoInfo;
              newVideoInfo.LikeCount = result.data.newLikeCount;
              setVideoInfo({
                ...videoInfo,
                LikeCount: result.data.newLikeCount,
              });
              setisLiked(!isLiked);
            })
            .catch((err) => {
              console.log(err);
              if (err.response.data.message === "Already Liked") {
                alert("You have already liked the video");
              } else {
                alert("Some error occured and we are trying to fix it");
              }
            })
    } else if (isDisLiked) {
      await axios
        .post(`/Content/RemoveDisLike/${id}`,{userId:UsersId})
        .then((result) => {
          let newVideoInfo = videoInfo;
          newVideoInfo.DislikeCount = result.data.newDisLikeCount;
          setVideoInfo({
            ...videoInfo,
            DislikeCount: result.data.newDisLikeCount,
          });
          setIsDisliked(!isDisLiked);
        })
        .catch((err) => {
          console.log(err);
        });
        await axios
        .post(`/Content/AddLike/${id}`,{userId:UsersId})
        .then((result) => {
          let newVideoInfo = videoInfo;
          newVideoInfo.LikeCount = result.data.newLikeCount;
          setVideoInfo({
            ...videoInfo,
            LikeCount: result.data.newLikeCount,
          });
          setisLiked(!isLiked);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === "Already Liked") {
            alert("You have already liked the video");
          } else {
            alert("Some error occured and we are trying to fix it");
          }
        })

    } else {
          await axios
            .post(`/Content/RemoveLike/${id}`,{userId:UsersId})
            .then((result) => {
              let newVideoInfo = videoInfo;
              newVideoInfo.LikeCount = result.data.newLikeCount;
              setVideoInfo({
                ...videoInfo,
                LikeCount: result.data.newLikeCount,
              });
              setisLiked(!isLiked);
            })
            .catch((err) => {
              console.log(err);
            });
    }
  };
 
  const AddDisLike = async (id) => {
    if (!isDisLiked && !isLiked) {
      await axios
        .post(`/Content/AddDislikes/${id}`,{userId:UsersId})
        .then((result) => {
          let newVideoInfo = videoInfo;
          newVideoInfo.DislikeCount = result.data.newDisLikeCount;
          setVideoInfo({
            ...videoInfo,
            DislikeCount: result.data.newDisLikeCount,
          });
          console.log(videoInfo);
          setIsDisliked(!isDisLiked);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isLiked) {
      await axios
      .post(`/Content/RemoveLike/${id}`,{userId:UsersId})
      .then((result) => {
        let newVideoInfo = videoInfo;
        newVideoInfo.LikeCount = result.data.newLikeCount;
        setVideoInfo({
          ...videoInfo,
          LikeCount: result.data.newLikeCount,
        });
        setisLiked(!isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
      await axios
        .post(`/Content/AddDislikes/${id}`,{userId:UsersId})
        .then((result) => {
          let newVideoInfo = videoInfo;
          newVideoInfo.DislikeCount = result.data.newDisLikeCount;
          setVideoInfo({
            ...videoInfo,
            DislikeCount: result.data.newDisLikeCount,
          });
          console.log(videoInfo);
          setIsDisliked(!isDisLiked);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post(`/Content/RemoveDisLike/${id}`,{userId:UsersId})
        .then((result) => {
          let newVideoInfo = videoInfo;
          newVideoInfo.DislikeCount = result.data.newDisLikeCount;
          setVideoInfo({
            ...videoInfo,
            DislikeCount: result.data.newDisLikeCount,
          });
          setIsDisliked(!isDisLiked);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  const Share = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("URL has been Copied and ready to be shared");
  };
  const GoToChannel = (id) => {
    navigation(`/PublicChannel/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <Bars
            height="180"
            width="180"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoading}
          />
        </div>
      ) : (
        <div className="lg:h-80 sm:min-h-full">
          <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:flex-col gap-2 items-left">
            <div className="col-span-2 text-white justify-start ml-16">
              <h1 className="text-2xl ">{videoInfo.Title}</h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-3">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 col-span-2">
                  <div className="justify-end object-right ">
                    <div
                      className="w-2/6"
                      onClick={() => {
                        GoToChannel(channelInfo._id);
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt="..."
                        className="shadow rounded-full max-w-full h-auto align-middle border-none items-end lg:ml-16"
                      />
                    </div>
                  </div>
                  <div
                    className="justify-items-start text-xl col-span-2"
                    onClick={() => {
                      GoToChannel(channelInfo._id);
                    }}
                  >
                    <h2>{channelInfo.channelName}</h2>
                    <p className="text-sm">
                      Subscriber {channelInfo.channelSubCount}
                    </p>
                  </div>

                  <div className="text-xl">
                    <button
                      className="rounded-full border bg-black px-5 sm:pt-1 mt-3"
                      onClick={() => {
                        FollowChannel(channelInfo._id);
                      }}
                    >
                      {isFollowing ? (
                        <p className="text-base">Following</p>
                      ) : (
                        <>Follow</>
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-span-2 items-center text-xl mt-2">
                  <button
                    className="rounded-lg border text-sm bg-black"
                    style={{ background: isLiked ? "white" : "black" }}
                  >
                    <button
                      className="ml-2 m-0 mt-0 flex-none inline-block p-1  text-red-700"
                      onClick={() => {
                        AddLike(videoInfo._id);
                      }}
                    >
                      <AiFillHeart size={18} />
                      <p className="text-xs">{videoInfo.LikeCount}</p>
                    </button>

                    <button
                      className="ml-3 m-0 mt-0 flex-none inline-block p-1 pr-3 text-red-700  border-l-2"
                      style={{ background: isDisLiked ? "white" : "black" }}
                      onClick={() => {
                        AddDisLike(videoInfo._id);
                      }}
                    >
                      <FaHeartBroken size={18} />
                      <p className="text-xs">{videoInfo.DislikeCount}</p>
                    </button>
                  </button>
                  <button
                    className="ml-3 text-blue-600 rounded-lg border p-3 bg-black"
                    onClick={() => {
                      Share();
                    }}
                  >
                    <FaShare />
                  </button>
                  <button className="ml-3 text-green-600 rounded-lg border p-3 bg-black">
                    <StripeCheckout
                      stripeKey="pk_test_51MOxzRSHgs3sudxeetSkWvkv7n6rPjksnAej8B4liQdNstnZWEpJ623mm3qYPcWMKUv8yR4rbf3xWYWgMz4NSWUo00GOD205wX"
                      token={makePayment}
                      name="Reward Creator"
                      amount={100}
                      key={videoInfo._id}
                    >
                      <BiDollar />
                    </StripeCheckout>
                  </button>
                </div>
              </div>

              {videoInfo.viewCount}
              <br />
              {videoInfo.Description}
            </div>
            <div className="text-white mt-10">
              {" "}
              <AddComment
                id={videoInfo._id}
                setCommentCnt={setCommentCnt}
                commentCnt={commentCnt}
              />
              <Comment id={videoInfo._id} commentCnt={commentCnt} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoPlayerPage;
