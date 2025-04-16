import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Login = ({setLoginModal}) => {
    const [loader, setLoader] = useState(false);
    // state to manage the login fields
    const [loginField, setLoginField] = useState({
        email: '',
        password: ''
    })

    //handle input field changes
    const handleOnChangeInput = (e, name) => {
        setLoginField({
            ...loginField,
            [name]: e.target.value,
        })
    }

    // handle login 
    const handleLoginFunc = async () => {
        setLoader(true);
        console.log("calling api")
        console.log(loginField)

        // request to login
        axios.
        post('http://localhost:4000/auth/login', loginField, {
            withCredentials: true
        })
        .then((res) => {
            console.log("Api called")
            console.log(res)
            setLoader(false);
            // storing the user details in local storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("profilePic", res.data.user.profilePic);
            console.log("profilePic", res.data.user.profilePic);
            toast.success("Login Successful")
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }).catch((err) => {
            toast.error("Invalid Credential")
            console.log(err)
            setLoader(false);
        })
    }
    
    return(
        <div className="fixed inset-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center text-black">
            <div className="w-2/5 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 h-3/5 mt-24 bg-white box-border p-16 md:p-10 flex flex-col items-center shadow-lg shadow-black">
                <div className="titleCard_login flex items-center gap-2 text-2xl  font-medium">
                    <YouTubeIcon sx ={{fontSize: "54px"}} className="text-red-600"/>
                    Login
                </div>
                <div className="flex flex-col gap-8 mt-6 w-full items-center">
                    <div className="emailLogin">
                        <input type="text" className="w-auto h-12 text-black px-3 bg-gray-200 border-none rounded-md placeholder:text-gray-600"  placeholder="Email" value={loginField.email} onChange={(e) => handleOnChangeInput(e, 'email')}/>
                    </div>
                    <div className="emailLogin">
                        <input type="password" className="w-auto h-12 text-black px-3 bg-gray-200 border-none rounded-md placeholder:text-gray-600" placeholder="Password" value={loginField.password} onChange={(e) => handleOnChangeInput(e, 'password')}/>
                    </div>

                </div>
                <div className="w-3/5 flex justify-center mt-6">
                    <div onClick={handleLoginFunc} className=" w-auto px-2 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400">
                        Login
                    </div>
                    <Link to={'/signup'} className='w-auto px-2 mx-4 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400' onClick={() => setLoginModal()}> SignUp</Link>
                    <div className=" w-auto px-2 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400" onClick={() => setLoginModal()}> Cancel</div>
                </div>
                {loader && (
                <Box sx={{width: '100%' }}>
                    <LinearProgress/>
                </Box>
                )}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login;