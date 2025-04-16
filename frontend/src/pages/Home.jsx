import React from "react";
import SideNavbar from "../components/SideNavbar";
import Homepage from "../components/Homepage";


const Home = ({sideNavbar, search}) => {
    return(
        <div className="home">
            <SideNavbar sideNavbar={sideNavbar}/>
            <Homepage sideNavbar={sideNavbar} search={search}/>
        </div>
    )
}
export default Home;