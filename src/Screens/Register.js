import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);

    // Validate email
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format.');
        } else {
            setEmailError('');
        }
    };

    // Validate password
    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?||])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
            );
        } else {
            setPasswordError('');
        }
    };

    // Handle field changes
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
        checkFormValidity();
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
        checkFormValidity();
    };

    // Check if the form is valid
    const checkFormValidity = () => {
        setFormValid(
            emailError === '' &&
            passwordError === '' &&
            name.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== ''
        );
    };

    const handleRegister = () => {
        const formData = new FormData();
        formData.append('username', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('role', 'user');
        postUser(formData);
    };

    async function postUser(formData) {
        try {
            const response = await fetch('http://localhost:3000/users/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'username': name,
                    'email': email,
                    'password': password,
                    'role': 'user'
                })
            });
            if (response.ok) {
                window.location.assign('/login');
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
                        placeholder="John Doe"
                        type="text"
                        bg={true}
                        onChange={(e) => {
                            setName(e.target.value);
                            checkFormValidity();
                        }}
                    />
                    <Input
                        label="Email"
                        placeholder="sriflix@gmail.com"
                        type="email"
                        bg={true}
                        onChange={handleEmailChange}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <Input
                        label="Password"
                        placeholder="********"
                        type="password"
                        bg={true}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <button
                        onClick={handleRegister}
                        disabled={!formValid}
                        className={`bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full ${
                            !formValid ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <FiLogIn /> Sign Up
                    </button>
                    <p className="text-center text-border">
                        Already have an account?{' '}
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
