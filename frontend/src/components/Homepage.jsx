import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = ({ sideNavbar, search }) => {
  const [data, setData] = useState([]);  // holds all video data
  const [filteredData, setFilteredData] = useState([]); // data after filtering
  const [selectedCategory, setSelectedCategory] = useState('All') // Current Selected

  //fetch the data from video on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/video/allVideo")
      .then((res) => {
        console.log(res.data);
        setData(res.data.videos);
        setFilteredData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // filtering data based on selected category and search query
  useEffect(() =>{
    let filtered = data
    //filter by category
    if(selectedCategory !== "All"){
      filtered = data.filter((video) => video.category.includes(selectedCategory));
  }
    if(search.trim()){
      // filter by search
      filtered = filtered.filter((video) => 
        video.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFilteredData(filtered)
    console.log(filtered)
},[selectedCategory, data, search])   
  const options = [
    "All",
    "Data Structures",
    "Algorithms",
    "Podcasts",
    "Study Skills",
    "Quantum",
    "Software Engineering",
    "Gaming",
    "Programming",
  ];
  return (
    <div
      className={
        sideNavbar
          ? "flex flex-col z-0 opacity-50 flex-1 min-h-screen"
          : "flex-col h-screen flex-1"
      }
    >
      <div className="flex fixed top-[56px] right-35 left-20 z-[10] box-border gap-2 flex-shrink-0 h-auto overflow-x-hidden overflow-y-hidden bg-white">
        {options.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex-shrink-0 flex-col basis-auto flex-grow-0 h-[30px] px-[10px] bg-gray-200 text-black font-semibold rounded-md flex justify-center items-center cursor-pointer ${selectedCategory === item ? "bg-gray-800 text-white":"" }`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="grid ml-10 bg-white box-border gap-[10px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-[90px] pb-[20px] h-screen">
        {filteredData?.map((item, index) => {
          return (
            <Link
            key={index}
              to={`/watch/${item._id}`}
              className="flex flex-col box-border cursor-pointer h-[216px] text-black no-underline"
            >
              <div className="w-full h-[216px] box-border relative">
                <img
                  src={item?.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full rounded-md"
                />
                <div className="absolute bottom-0 right-0 px-1 py-0.5 bg-gray-500 rounded-sm text-white">
                  {((item.time)/60).toString().slice(0,4)}
                </div>
              </div>
              <div className="flex pt-2.5">
                <div className="w-[50px] flex items-center justify-center">
                  <img
                    src={item?.user?.profilePic}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex flex-col w-full pt-1.5 box-border">
                  <div className="font-semibold text-lg">{item?.title}</div>
                  <div className="text-lg text-gray-500 mt-1 ">{item?.user?.channelName}</div>
                  {console.log(item?.user)}
                  <div className="text-sm text-gray-500 ">23k views</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Homepage;
