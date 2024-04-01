import React from "react";
import SideBar from "./SideBar";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";

function Profile(){
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <Uploder />
                <Input
                    label="Full Name"
                    placeholder="David worner"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Email"
                    placeholder="sriflix@gmail.com"
                    type="email"
                    bg={true}
                />
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between item-center my-4">
                    <button className="bg-subMain font-medium transitition hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Delete Account
                    </button>
                    <button className="bg-main font-medium transitition hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Update Profile
                    </button>
                </div>
            </div>
        </SideBar>
    )
    
}

export default Profile