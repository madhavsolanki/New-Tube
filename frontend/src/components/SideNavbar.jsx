import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"
import VideocamIcon from "@mui/icons-material/Videocam"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import HistoryIcon from "@mui/icons-material/History"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ContentCutIcon from "@mui/icons-material/ContentCut"
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined"
const SideNavbar = ({sideNavbar}) => {
    return(
        // conditional display of sidenavbar
        <div className={sideNavbar ? " sm:block flex flex-col fixed top-[55px] z-10 left-0 h-[92vh] w-[250px] sm:w-[200px] md:w-[250px] p-4 bg-white text-black overflow-y-auto box-border" : "hidden"} >
            <div className="flex flex-col border-b border-gray-600 pb-2">
                <Link to={'/'} className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <HomeIcon/>
                    <div className="text-sm font-medium">Home</div>
                </Link> 
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <VideocamIcon/>
                    <div className="text-sm font-medium">Shorts</div>
                </div>
                <div className={`flex items-center gap-5 p-2 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <SubscriptionsIcon/>
                    <div className="text-sm font-medium">Subscription</div>
                </div>
            </div>
            <div className="flex flex-col border-b border-gray-600 py-2">
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <div className="text-sm font-medium">You</div>
                    <ChevronRightIcon/>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <RecentActorsIcon/>
                    <div className="text-sm font-medium">Your Channel</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <HistoryIcon/>
                    <div className="text-sm font-medium">History</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <PlaylistAddIcon/>
                    <div className="text-sm font-medium">Playlist</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <SmartDisplayOutlinedIcon/>
                    <div className="text-sm font-medium">Your videos</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <WatchLaterOutlinedIcon/>
                    <div className="text-sm font-medium">Watch later</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <ThumbUpAltOutlinedIcon/>
                    <div className="text-sm font-medium">Liked videos</div>
                </div>
                <div className={`flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300`}>
                    <ContentCutIcon/>
                    <div className="text-sm font-medium">Your clips</div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className="flex items-center gap-5 p-2 rounded-lg cursor-pointer hover:bg-gray-300">
                    <div className="font-semibold">
                        Subscription
                    </div>
                </div>
                {/* Change this */}
                <div className="flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300">
                    <img className="w-6 h-6 rounded-full" src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg" alt="image" />
                    <div className="text-sm font-medium">Aaj Tak</div>
                </div>
                <div className="flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300">
                    <img className="w-6 h-6 rounded-full" src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg" alt="image" />
                    <div className="text-sm font-medium">The LallanTop</div>
                </div>
                <div className="flex items-center gap-5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-300">
                    <img className="w-6 h-6 rounded-full" src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg" alt="image" />
                    <div className="text-sm font-medium">NDTV</div>
                </div>
            </div>
        </div>
    )
}
export default SideNavbar