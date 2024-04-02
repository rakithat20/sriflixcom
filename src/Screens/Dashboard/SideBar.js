import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import { RiMovie2Fill, RiLockPasswordLine} from "react-icons/ri";
import { FiSettings} from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";

function SideBar({children}){
    const SideLinks=[
        {
            name:"Dashboard",
            Link:"/dashboard",
            Icon:BsFillGridFill,
        },
        {
            name:"Movie List",
            Link:"/movielist",
            Icon:FaListAlt,
        },
        {
            name:"Add Movie",
            Link:"/addmovie",
            Icon:RiMovie2Fill,
        },
       /* {
            name:"Categories",
            Link:"/categories",
            Icon:HiViewGridAdd,
        }
        ,*/
        {
            name:"Users",
            Link:"/users",
            Icon:FaUsers,
        },
        {
            name:"Update Profile",
            Link:"/profile",
            Icon:FiSettings,
        },
        {
            name:"Favorites Movies",
            Link:"/favorites",
            Icon:FaHeart,
        },
        {
            name:"Change Password",
            Link:"/password",
            Icon:RiLockPasswordLine,
        },
       
    ];

const active="bg-dryGray text-subMain"
const hover="hover:text-white hover:bg-main"
const inActive=
   "rounded font-medium text-sm transitions flex gap-3 item-center p-4"
const Hover = ({isActive}) =>
isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;


    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        {
                            //sidebar links
                            SideLinks.map((link, index) => (
                                <NavLink to={link.Link} key={index} className={Hover}>
                                    <link.Icon/> <p> {link.name} </p>
                                </NavLink>
                            )
                            )
                        }
                    </div>
                    <div 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="10"
                    data-aos-offset="200"
                    className="col-span-6 rounded-md bg-dry border bordar-gray-800 p-6">
                    {children}
                    </div>
                </div>    
            </div>

        </Layout>
    )
    
    
}

export default SideBar
