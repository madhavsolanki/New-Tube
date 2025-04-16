import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Notification from "@mui/icons-material/Notifications";
import { useState } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import './Navbar.css'

const Navbar = ({ setSideNavbarFunc, sideNavbar, setSearch }) => {
  // store user profile pic
  const [userPic, setUserPic] = useState(
    "https://tse1.mm.bing.net/th?id=OIP.Nykv6l7QXIo0lDbQvybBqQAAAA&pid=Api&P=0&h=180"
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // toggle the modal
  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };
  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  //navigate to user's profile page
  let userId = localStorage.getItem("userId");
  const handleProfile = () => {
    console.log(userId);
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };
  const setLoginModal = () => {
    setLogin(false);
  };
  const onClickPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFunc();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };

  // handle logout 
  const getLogoutFunc = async () => {
    axios
      .post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Logged Out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let profilePic = localStorage.getItem("profilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null ? true : false);
    if (profilePic) {
      console.log(profilePic)
      setUserPic(profilePic);
    }
  }, []);

  return (
    <div className="fixed top-0 w-full bg-white flex items-center justify-between px-4 z-10">
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 flex items-center justify-center cursor-pointer "
          onClick={sideNavbarFunc}
        >
          <MenuIcon sx={{ color: "black" }} />
        </div>
        <Link
          to={"/"}
          className="flex items-center gap-2 text-black no-underline"
        >
          <YouTubeIcon sx={{ fontSize: "34px" }} className="text-red-500" />
          <div className="hidden sm:block text-xl font-semibold font-sans">Youtube</div>
        </Link>
      </div>

      <div className="hidden md:flex gap-2 w-1/2">
        <div className="flex w-4/5">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-l-full border border-gray-300 bg-white text-black px-4 focus:outline-none placeholder:text-gray-400 text-base"
          />
          {/* {console.log(search)} */}
          {console.log(setSearch)}
          <div className="w-16 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-r-full cursor-pointer hover:bg-gray-300">
            <SearchIcon sx={{ fontSize: "29px", color: "black" }} />
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
          <KeyboardVoiceIcon sx={{ color: "black " }} />
        </div>
      </div>
      <div className="right flex gap-3 sm:gap-5 items-center relative">
        {console.log(userId)}
        <Link to={`/${userId}/upload`}>
          <VideoCallIcon
            sx={{ fontSize: "30px", cursor: "pointer", color: "black" }}
          />
        </Link>
        <Notification
          sx={{ fontSize: "30px", cursor: "pointer", color: "black" }}
        />
        <img
          onClick={handleClickModal}
          src={userPic}
          alt="logo"
          className="right-logo w-8 h-8 rounded-full cursor-pointer"
        />
        {navbarModal && (
          <div className="border-black border-2 absolute top-10 w-full rounded-sm z-20 text-black">
            {isLoggedIn && (
              <div
                className="border-b border-black bg-white p-2 cursor-pointer hover:bg-gray-300"
                onClick={() => handleProfile()}
              >
                Profile
              </div>
            )}
            {isLoggedIn && (
              <div
                className="border-b border-black bg-white p-2 cursor-pointer hover:bg-gray-300"
                onClick={() => onClickPopUpOption("logout")}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="bg-white p-2 cursor-pointer hover:bg-gray-300"
                onClick={() => onClickPopUpOption("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>
      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};
export default Navbar;
