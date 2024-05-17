import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const response = await fetch('http://lobster-app-bxg93.ondigitalocean.app/users/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                })
            });
           
    
            if (response.status===200) {
                
                navigate('/dashboard')
            }
            else{
                setError('Invalid email or password');
                return;
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
