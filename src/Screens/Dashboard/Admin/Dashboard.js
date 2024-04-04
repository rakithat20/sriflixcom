import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { Movies } from "../../../Data/MovieData";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

    useEffect(() => {
      const logged = getLoggedFromLocalStorage();
      if (!logged) {
        navigate('/login'); // Redirect to '/login' route
        alert("please Log in before access the dashbord")
      }
    }, [navigate]);
  
    const getLoggedFromLocalStorage = () => {
      const isLogged = localStorage.getItem('isLogged');
      return isLogged ? JSON.parse(isLogged) : false;
    };
    const DashboardData=[
        {
            bg:"bg-orange-600",
            icon:FaRegListAlt,
            title:"Total Movies",
            total:90
        },
        {
            bg:"bg-blue-700",
            icon:HiViewGridAdd,
            title:"Total Categories",
            total:8,
        },
        {
            bg:"bg-green-600",
            icon:FaUser,
            title:"Total Users",
            total:134,
        },
    ]
    return(
        <SideBar>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {DashboardData.map((data,index) =>(
                    <div
                     key={index} 
                     className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
                    >
                        <div 
                        className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
                        >
                            <data.icon />
                        </div>
                        <div className="col-span-3">
                            <h2>{data.title}</h2>
                            <p className="mt-2 font-bold">{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
            <Table data={Movies.slice(0, 5)} admin={true} />
        </SideBar>
    )

}

export default Dashboard;