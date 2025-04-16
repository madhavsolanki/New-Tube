import React, { useEffect, useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const VideoUpload = () => {
  const { videoId } = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  //input field for the video upload
  const [inputField, setInputField] = useState({  
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    category: "",
  });
  const handleOnChangeInput = (e, name) => {
    setInputField({
      ...inputField,
      [name]: e.target.value,
    });
  };
  // upload thumbnail and video
  const uploadFiles = async (e, type) => {
    setLoader(true);
    console.log("Uploading");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "unsigned_youtube_clone");
    data.append("folder", "Youtube-Clone");
    //dvhaa5sbn
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/drugllfyb/${type}/upload`,
        data
      );
      console.log(response);
      setLoader(false);
      const url = response?.data?.url;
      const duration = response?.data?.duration
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
        time: duration
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      toast.info("Please login to upload video")
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, []);
  useEffect(() => {
    if (videoId) {
      axios
        .get(`http://localhost:4000/video/getVideoById/${videoId}`)
        .then((res) => {
          console.log(res.data.data)
          const video = res.data.data;
          setInputField({
            title: video.title,
            description: video.description,
            videoLink: video.videoLink,
            thumbnail: video.thumbnail,
            category: video.category,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [videoId]);

  // handle video submit
  const handleSubmitFunc = async (type) => {
    setLoader(true);
    if (type === "update") {
      try {
        await axios
          .put(`http://localhost:4000/video/video/${videoId}`, inputField, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            setLoader(false);
            toast.success("Updated Successfully");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
          });
      } catch (error) {
        console.log(error)
        toast.error("Unauthorized")
      }
    }
    else{
        try {
            await axios.post(`http://localhost:4000/video/uploadVideo`, inputField, {withCredentials: true})
            .then((res) =>{
                setLoader(false)
                toast.success("Video Uploaded Successfully")
                setTimeout(() => {
                  navigate('/')
                }, 2000);
            })
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
  };
  return (
    <div className="h-screen pt-14 w-full flex flex-col items-center bg-white text-black font-normal">
      <div className="h-auto w-[45%] rounded-md mt-5 shadow-md shadow-black p-6">
        <div className="flex w-full justify-center items-center text-[28px]">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          {videoId ? "Update": "Upload"} Video
        </div>
        <div className="flex flex-col gap-7 mt-7 items-center">
          <input
            type="text"
            value={inputField.title}
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Title"
          />
          <input
            type="text"
            value={inputField.description}
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Description"
          />
          <input
            type="text"
            value={inputField.category}
            onChange={(e) => {
              handleOnChangeInput(e, "category");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Category e.g., Algorithms, Gaming"
          />
          <div>
            Thumbnail{" "}
            <input
              type="file"
              onChange={(e) => uploadFiles(e, "image")}
              className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md"
              accept="image/*"
            />{" "}
          </div>
          <div>
            Video{" "}
            <input
              type="file"
              onChange={(e) => uploadFiles(e, "video")}
              className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md"
              accept="video/mp4, video/webm, video/*"
            />{" "}
          </div>
          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
        <div className="flex gap-7 justify-center mt-7">
          <div onClick={()=>handleSubmitFunc(videoId ? "update": "upload")} className="px-5 py-2.5 border text-[18px] font-medium rounded-md text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400">
            {videoId ? "update": "upload"}
          </div>
          <Link
            to={"/"}
            className="px-5 py-2.5 border text-[18px] font-medium rounded-md text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400"
          >
            Home
          </Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default VideoUpload;
