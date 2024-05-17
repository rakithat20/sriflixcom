import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = () => {
        const Formdata = new FormData();
        Formdata.append('username', name);
        Formdata.append('password', password);
        Formdata.append('mail', email);
        Formdata.append('role', 'user');
        postUser(Formdata);
        for (let pair of Formdata.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    };

    async function postUser(formData) {
        try {
            const response = await fetch('https://lobster-app-bxg93.ondigitalocean.app/users/user', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                window.location.assign('/login')
            }
        } catch (error) {
            console.error('Error signing up:', error);
            
        }
    
    }

    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-colo">
                <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
                    <img src="/images/logo.png" alt="Sriflix Logo" className="w-24 mx-auto" />
                    <Input
                        label="Full Name"
                        placeholder="John doe"
                        type="text"
                        bg={true}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email"
                        placeholder="sriflix@gmail.com"
                        type="email"
                        bg={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        type="password"
                        bg={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleRegister} className=" bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                        <FiLogIn />Sign Up
                    </button>
                    <p className="text-center text-border">
                        Already have an account?{" "}
                        <Link to="/login" className="text-dryGray font-semibold ml-2">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Register;
