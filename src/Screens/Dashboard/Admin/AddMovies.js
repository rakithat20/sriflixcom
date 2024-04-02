import React from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploder from "../../../Components/Uploder";
import { CategoriesData } from "../../../Data/CategoriesData";
import { ImUpload } from "react-icons/im";


function AddMovie(){
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Create Movie</h2>
                <div className="w-full grid md:grid-cols-2 gap-6">
                <Input
                    label="Movie Title"
                    placeholder="Game of Thrones"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Hours"
                    placeholder="2hr"
                    type="text"
                    bg={true}
                />
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                <Input
                    label="Language Used"
                    placeholder="English"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Year of Release"
                    placeholder="2002"
                    type="number"
                    bg={true}
                />
                </div>

                {/* images */}
                <div className="w-full grid md:grid-cols-2 gap-6">
                    {/*image without title*/}
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Image without Title
                        </p>
                        <Uploder />
                        <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                            <img src="/images/movies/a1.jpeg" alt="" className="w-full h-full object-cover rounded"></img>
                        </div>
                    </div>
                    {/*image with title*/}
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Image with Title
                        </p>
                        <Uploder />
                        <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                            <img src="/images/movies/a1.jpeg" alt="" className="w-full h-full object-cover rounded"></img>
                        </div>
                    </div>
                </div>
                {/*description*/}
                <Message 
                    label="Movie Description"
                    placeholder="Make it short and sweet"/>
                {/*Category */}
                <div className="text-sm w-full">
                    <Select label="Movie category" options={CategoriesData} />
                </div>
                {/*Movie video*/}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-border font-semibold text-sm">
                        Movie Video
                    </label>
                    <Uploder />
                </div>
                {/*casts*/}
                
                    
                {/*submit*/}
                    <button className="bg-subMain w-full flex-rows gap-4 font-medium transitition hover:bg-dry border border-subMain text-white py-4 rounded">
                        <ImUpload/>Publish Movie
                    </button>
            </div> 
            
        </SideBar>
    )
}

export default AddMovie