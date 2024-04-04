import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setUserToLocalStorage =(isLogged)=>{
        localStorage.setItem('isLogged', JSON.stringify(isLogged));
    }
    const handleLogged=()=>{
        setUserToLocalStorage(true)
    }
    const setAdminToLocalStorage = (isAdmin) => {
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      };
    const handleAdminLogin = () => {
        setAdminToLocalStorage(true);
      };
      const clearAdminFromLocalStorage = () => {
        localStorage.removeItem('isAdmin');
      };
      
    const handleAdminLogout = () => {
        clearAdminFromLocalStorage();
    };
    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            console.log(email)
            const response = await fetch('http://localhost:8080/user/users/login', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                setError('Invalid email or password');
                return;
            }
    
            const responseData = await response.text();
    
            // Check if response data is not empty
            if (responseData.trim() === "") {
                setError('Login failed. Please try again later.');
                return;
            }
    
            const user = JSON.parse(responseData);
    
            if (user.role === 'admin') {
                // Redirect to dashboard
                handleAdminLogin();
                window.location.href = '/dashboard';

            } else {
                // Handle non-admin user (optional)
                handleAdminLogout();
                handleLogged();
                window.location.href = '/dashboard'
                //setError('You are not authorized to access the dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again later.');
        }
    }
    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-colo">
                <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
                    <img src="/images/logo.png" alt="Netflix Logo" className="w-24 mx-auto" />
                    <Input
                        label="Email"
                        placeholder="sriflix@gmail.com"
                        type="email"
                        bg={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        type="password"
                        bg={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} className=" bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                        <FiLogIn />Sign In
                    </button>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-center text-border">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-dryGray font-semibold ml-2">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
