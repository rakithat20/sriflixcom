import React, { forwardRef, useState } from "react";
import SideBar from "./SideBar";
import { Input } from "../../Components/UsedInputs";

function Profile() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const user =  JSON.parse(localStorage.getItem('user'));
 
    if(user===null){
        window.alert('Please login First')
        window.location.assign('/login')
    }

  const handlePublish = async () => {
    console.log('Fullname:', fullname);
    console.log('Email:', email);
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setError('User data not found');
      return;
    }
    const user = JSON.parse(userStr);
    console.log(user);
    try {
      const formData = new FormData();
      formData.append('id', user.id); // Example: Appending user id
      formData.append('username',fullname); // Append fullname
      formData.append('mail', email); // Append email
      formData.append('password', user.password); // Append password
      formData.append('role',user.role)
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await fetch('http://localhost:8080/user/users/update', { // Replace 'http://example.com/update' with your actual update endpoint URL
        method: 'PUT',
        body: formData
      });

      if(response.ok){
        setError('Details Updated Successfully')
      }
      const responseData = await response.json(); // Parse response as JSON

      // Check if response data is not empty
      if (!responseData) {
        setError('Update failed. Please try again later.');
        return;
      }

      // Save response data as JSON to localStorage
      localStorage.setItem('user', JSON.stringify(responseData));
    } catch (error) {
      console.error('Update failed:', error);
      setError('Update failed. Please try again later.');
    }
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <Input
          label="Full Name"
          placeholder="David worner"
          type="text"
          bg={true}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)} // Bind input value to state
        />
        <Input
          label="Email"
          placeholder="sriflix@gmail.com"
          type="email"
          bg={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Bind input value to state
        />
        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          bg={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Bind input value to state
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between item-center my-4">
          <button
            onClick={handlePublish}
            className="bg-subMain font-medium transition hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            Update Profile
          </button>
          <button className="bg-main font-medium transition hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Delete Account
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
