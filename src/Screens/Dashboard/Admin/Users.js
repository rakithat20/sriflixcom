import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";

function Users2() {
    const [UsersData, setUsersData] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('http://lobster-app-bxg93.ondigitalocean.app/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUsersData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchUserData();
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users</h2>
                <Table2 data={UsersData} users={true} />
            </div>
        </SideBar>
    );
}

export default Users2;
