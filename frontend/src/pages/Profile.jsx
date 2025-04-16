import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SideNavbar from "../components/SideNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = ({ sideNavBar }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  //function to fetch the profile data
  const fetchProfileData = async () => {
    axios
      .get(`http://localhost:4000/video/${id}/channel`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch profile when component mounted
  useEffect(() => {
    fetchProfileData();
  }, []);

  // handler function to edit a video
  const handlEdit = (videoId) => {
    navigate(`/${videoId}/edit`);
  };

  // handler function to delete a video
  const handleDelete = async (videoId) => {
    const comfirmDelete = window.confirm("Are you sure want to delete the Video")
    if(!comfirmDelete) {
      
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/video/video/${videoId}`, {
        withCredentials: true,
      });
      toast.info("Video Deleted successfully");
      setData(data.filter((video) => video._id !== videoId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full  p-2.5 box-border bg-white text-black">
      <SideNavbar sideNavbar={sideNavBar} />
      <h2>nav</h2>
      <div
        className={
          sideNavBar
            ? "flex flex-col overflow-x-hidden flex-1 ml-[270px] mt-[56px] text-black justify-center items-center"
            : "flex flex-col overflow-x-hidden flex-1 text-black mt-14 justify-center items-center"
        }
      >
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-4 pb-5">
          <div className="w-[150px] lg:w-[150px] h-[150px] lg:h-[150px]">
            <img
              src={user?.profilePic}
              alt="profilePic"
              className="w-full h-full rounded-full px-2.5"
            />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-[85%] lg:text-left px-2.5">
            <div className="text-4xl font-semibold">{user?.channelName}</div>
            <div className="text-md text-gray-500">
              {console.log(user?.email.split('@')[0])}
              @{user?.email.split('@')[0]} . {data?.length} videos
            </div>
            <div className="text-sm text-gray-500">{user?.about}</div>
          </div>
        </div>
        <div className="profile_videos w-full">
          <div className="text-lg pb-2.5 text-gray-900 font-medium flex items-center border-b border-gray-600">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="flex gap-4 justify-center lg:justify-start h-screen flex-wrap mt-5">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <Link to={`/watch/${item._id}`} className="w-[210px] text-black cursor-pointer no-underline">
                    <div className="w-full h-[140px]">
                      <img
                        src={item?.thumbnail}
                        alt="thumbnail"
                        className="w-full h-full rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="w-full text-base font-semibold">
                        {item?.title}
                      </div>
                      <div className="text-sm text-gray-600">
                         {item?.createdAt.slice(0,10)}
                      </div>
                    </div>
                  </Link>
                  <div className="profileVideo_block_menu">
                    
                    <div className="profileVideo_block_menu_options">
                      <button
                       className="border border-black cursor-pointer rounded-md bg-gray-200 hover:bg-gray-400 my-1 mr-2 px-2"
                        onClick={() => handlEdit(item?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-black cursor-pointer rounded-md bg-gray-200 hover:bg-gray-400 ml-2 px-2"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};
export default Profile;
