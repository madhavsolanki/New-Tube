import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Video = () => {

  const [message, setMessage] = useState(""); //new comment message
  const [data, setData] = useState(""); //Video data
  const { id } = useParams(); 
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);  // id of the comment being edited
  const [editMessage, setEditMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setdisLikes] = useState(0);

  const fetchVideoById = async () => {
    await axios
      .get(`http://localhost:4000/video/getVideoById/${id}`)
      .then((res) => {
        setData(res.data.data); // set video data
        console.log(data)
        console.log(res.data.data.videoLink)
        setVideoUrl(res.data.data.videoLink); // set video url
      }) 
      .catch((err) => {
        console.log(err);
      });
  };
  //handle like
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:4000/video/video/${id}/like`,{},{withCredentials: true})
    } catch (error) {
      toast.error("Unable to like")
    }
  }
  // handle dislike
  const handleDislike = async () => {
    try {
      await axios.post(`http://localhost:4000/video/video/${id}/dislike`,{},{withCredentials: true})
      
    } catch (error) {
      toast.error("Unable to like")
    }
  }

    // fetch reaction count
  const handleReaction = async ()=> {
    try {
      await axios.get(`http://localhost:4000/video/video/${id}/reactions`)
      .then((res) => {
        console.log(res.data.likes)
        console.log(res.data.dislikes)
        setLikes(res.data.likes)
        setdisLikes(res.data.dislikes)
      })
    } catch (error) {
      
    }
  }

  const getCommentByVideoId = async () => {
    await axios
      .get(`http://localhost:4000/comment/comment/${id}`)
      .then((res) => {
        setComments(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post(`http://localhost:4000/comment/addComment`, body, {
        withCredentials: true,
      })
      .then((res) => {
        const newComment = res.data.comment;
        setComments([newComment, ...comments]);
        setMessage("");
      })
      .catch((err) => {
        toast.err("Please Login to Comment");
      });
  };

  // handle edi comment
  const handleEditComment = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/comment/comment/${editCommentId}`,
        { message: editMessage }
      );
      setComments(
        comments.map((comment) =>
          comment._id == editCommentId
            ? { ...comment, message: res.data.comment.message }
            : comment
        )
      );
      setEditCommentId(null);
      setEditMessage("");
    } catch (error) {
      toast.error("unable to edit comment");
    }
  };

    // handle delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/comment/comment/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      toast.error("Unable to delete comment");
    }
  };
 useEffect(() =>{
  fetchVideoById()
  getCommentByVideoId();
  handleReaction();
 },[likes, dislikes])

  return (
    <div className="bg-white mt-[56px] flex text-black py-8 ml-2 justify-center flex-col md:flex-row">
      <div className="w-full max-w-[875px] flex flex-col">
        <div className="w-full">
          {console.log(data)}
          {data && (
            <video
              width="100"
              height="100"
              controls
              autoPlay
              className="w-full h-80 rounded-[10px]"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
            </video>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <div className="text-[20px] font-bold">{data?.title}</div>
          <div className="flex flex-col justify-between mt-2.5">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-row justify-between gap-5">
                <Link
                  to={`/user/${data?.user?._id}`}
                  className="w-9 h-9 cursor-pointer"
                >
                  <img
                    src={data?.user?.profilePic}
                    alt="img.jpg"
                    className="w-full h-full rounded-full"
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="font-medium text-[16px]">
                    {" "}
                    {data?.user?.channelName}{" "}
                  </div>
                  <div className="text-[14px] text-gray-400">
                    145K subscribers
                  </div>
                </div>
                <div className="bg-black text-white px-4 rounded-full flex justify-center items-center h-9 font-semibold text-[14px]">
                  Subscribe
                </div>
              </div>

              <div className="flex gap-2.5 bg-gray-600/20 justify-center items-center py-2.5 px-2.5 rounded-full cursor-pointer">
                <div className="flex gap-2.5 hover:text-gray-600">
                  <ThumbUpOutlinedIcon onClick={handleLike}/>
                  <div className="font-medium">{likes}</div>
                </div>
                <div className="youtubevideoDivider"></div>
                <div className="flex gap-2.5 hover:text-gray-600">
                  <ThumbDownAltOutlinedIcon onClick={handleDislike} />
                  <div className="font-medium">{dislikes}</div>
                </div>
                <div className="flex ml-4 mr-2 hover:text-gray-600">
                  <ReplyIcon sx={{ fontSize: "30px" }} />
                </div>
                <div className="flex ml-4 mr-2 hover:text-gray-600">
                  <MoreHorizIcon sx={{ fontSize: "30px" }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gray-600/20 p-3 rounded-[10px] font-medium text-[14px]  gap-2.5 mt-2.5">
              <div>{data?.createdAt?.slice(0, 10)}</div>
              <div>{data?.description}</div>
            </div>
          </div>
          <div className="flex flex-col mt-5 ml-5">
            <div className="text-[20px] font-medium">
              {comments?.length} Comments
            </div>
            <div className="flex flex-col w-full">
              <img
                src={data?.user?.profilePic}
                alt="ProfilePic"
                className="w-10 h-10 rounded-full"
              />
              <div className="addAComment">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white text-black h-9 border-collapse text-[16px] border-b border-gray-500 focus:outline-none placeholder:text-[16px]"
                  placeholder="Add a comment"
                />
                <div className="flex justify-end gap-4 mt-2.5">
                  <div
                    onClick={handleComment}
                    className="px-4 py-2 rounded-full border text-black  hover:bg-gray-300 cursor-pointer"
                  >
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              {comments.map((item) => (
                <div className="flex mt-2.5 gap-2.5 border-b-4 pb-4" key={item._id}>
                  <img
                    src={item?.user?.profilePic}
                    alt="profilePic"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2.5">
                      <div className="text-[14px] font-medium">
                        {item?.user?.channelName}
                      </div>
                      <div className="text-[14px] text-gray-400">
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    {editCommentId === item._id ? (
                      <div className="editCommentSection flex gap-2 items-center mt-2">
                        <input
                          type="text"
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                        />
                        <button onClick={handleEditComment}>Save</button>
                        <button onClick={() => setEditCommentId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2.5">{item.message}</div>
                    )}
                    <div className="commentActions flex gap-2 mt-2">
                      <button className="border border-black cursor-pointer rounded-md bg-gray-200 hover:bg-gray-400 mx-2 px-2" 
                        onClick={()=>{
                          setEditCommentId(item._id);
                          setEditMessage(item.message);
                        }
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteComment(item._id)} className="border border-black cursor-pointer rounded-md bg-gray-200 hover:bg-gray-400 mx-2 px-2">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[406px] px-3.5 text-black flex flex-col">
        <div className="flex gap-3.5 mb-5 cursor-pointer">
          <div className="w-[168px] h-[94px]">
            <img src= {"https://res.cloudinary.com/dvhaa5sbn/image/upload/v1733043371/Youtube-Clone/Recomended%20Videos/pcfr8uvsxhzaoiyo9xrd.jpg"} alt="" className="w-50 h-30" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-medium mb-1.5">
              Python VS Rust C++
            </div>
            <div className="text-gray-400 text-[12px]">Development</div>
            <div className="video_suggestios_About_Profile text-sm text-gray-600">
              136k . 2 week ago
            </div>
          </div>
        </div>

        
        <div className="flex gap-3.5 mb-5 cursor-pointer">
          <div className="w-[168px] h-[94px]">
            <img src={'https://res.cloudinary.com/dvhaa5sbn/image/upload/v1733043021/Youtube-Clone/Recomended%20Videos/xijbnqrphpkhndxmerew.jpg'} alt="" className="w-50 h-30" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-medium mb-1.5">
              Which coding Language is best in 2025
            </div>
            <div className="text-gray-400 text-[12px]">Coding</div>
            <div className="video_suggestios_About_Profile text-sm text-gray-600">
              26k . 1 month ago
            </div>
          </div>
        </div>

        <div className="flex gap-3.5 mb-5 cursor-pointer">
          <div className="w-[168px] h-[94px]">
            <img src={'https://res.cloudinary.com/dvhaa5sbn/image/upload/v1733043168/Youtube-Clone/Recomended%20Videos/beua1yvyxccyvn7c478e.jpg'} alt="" className="w-50 h-30" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-medium mb-1.5">
              Can we learn Machine Learning in 3 Months?
            </div>
            <div className="text-gray-400 text-[12px]">AI_ML</div>
            <div className="video_suggestios_About_Profile text-sm text-gray-600">
              136M . 2 year week ago
            </div>
          </div>
        </div>

        <div className="flex gap-3.5 mb-5 cursor-pointer">
          <div className="w-[168px] h-[94px]">
            <img src={"https://res.cloudinary.com/dvhaa5sbn/image/upload/v1733043251/Youtube-Clone/Recomended%20Videos/nhtfp6aehpjcdjyuue5c.jpg"} alt="" className="w-50 h-30" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-medium mb-1.5">
              What is an API ?
            </div>
            <div className="text-gray-400 text-[12px]">Development</div>
            <div className="video_suggestios_About_Profile text-sm text-gray-600">
              16k . 1 day ago
            </div>
          </div>
        </div>


      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
