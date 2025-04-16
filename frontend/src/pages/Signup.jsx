import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinearProgress from "@mui/material/LinearProgress";
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios'
const Signup = () => {
    //state management for profile pic
    const [uploadImageUrl, setUpLoadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain")
    const [progressBar, setProgressBar] = useState(false)
    const navigate = useNavigate();
    const [signUpField, setSignUpField] = useState({
        channelName: "",
        email: "",
        password: "",
        about: "",
        profilePic: uploadImageUrl
    })
    // handle imput changes
    const handleInputField = (e, name) =>{
        setSignUpField({
            ...signUpField,
            [name]: e.target.value,
        })
    }

    //handle form submission
    const handleSignup = async () => {
        if(!signUpField.channelName || !signUpField.email || !signUpField.password || !signUpField.about ){
            toast.error("All fields are required")
        }
        // validate email format
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!isValidEmail.test(signUpField.email)){
            return toast.error("Please enter a valid email address")
        }
        setProgressBar(true);
        // send post request to ceate new user
        axios.post(`http://localhost:4000/auth/signup`, signUpField, {withCredentials: true})
        .then((res) => {
            toast.success("Registered Successfully")
            setProgressBar(false)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        }).catch((err) => {
            setProgressBar(false)
            toast.error(err)
        })
    }

    //handle profile image to cloudinary
    const uploadImage = async (e) => {
        console.log("uploading");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try{
            // cloudName="dvhaa5sbn"
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dvhaa5sbn/image/upload", data)
            setProgressBar(false);
            const imageUrl = response.data.url;
            console.log(imageUrl)
            setUpLoadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField,
                profilePic: imageUrl
            })
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="mt-[56px] text-black w-full flex flex-col items-center sm:px-4 lg:px-20 h-screen bg-white">
            <div className="w-[2/5] border p-4 mt-7 flex flex-col items-center justify-center shadow-md shadow-black">
                <div className="flex gap-5 w-full justify-center items-center font-light text-2xl">
                    <YouTubeIcon sx={{fontSize: "54px", color:"red"}}/>
                    SignUp
                </div>
                <div className="flex flex-col gap-5 w-full items-center mt-7">
                    <input type="email" required value={signUpField.email} onChange={(e) => {handleInputField(e, 'email')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="Email" />
                    <input type="text" value={signUpField.channelName} onChange={(e) => {handleInputField(e, 'channelName')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200  rounded-md placeholder:text-gray-600" placeholder="Channel Name" />
                    <input type="password" value={signUpField.password} onChange={(e) => {handleInputField(e, 'password')}} className=" w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="Password" />
                    <input type="text" value={signUpField.about} onChange={(e) => {handleInputField(e, 'about')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="About your channel" />
                    <div className="flex gap-7 mt-5">
                        <input type="file" onChange={(e) => uploadImage(e)}/>
                        <div className="w-24 h-24">
                            <img src={uploadImageUrl} alt="" className="w-full h-full rounded-full"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-7 justify-center w-full mt-5">
                        <div className="px-2.5 py-2 text-lg font-medium rounded-md border text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="px-2.5 py-2 text-lg font-medium rounded-md border text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400">Home Page</Link>
                    </div>
                    {progressBar && (
                        <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Signup;