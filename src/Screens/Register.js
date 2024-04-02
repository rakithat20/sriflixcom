import React from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

function Register() {
    return (
        <Layout>
            <div className="container mx-auto px-2 my-24 flex-colo">
                <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-14 md:w-3/5 bg-dry rounded-lg border border-border">
                    <img src="/images/logo.png" alt="Netflix Logo" className="w-24 mx-auto" />
                    <Input
                        label="Full Name"
                        placeholder="Srikanth Reddy"
                        type="text"
                        bg={true}
                    />
                    <Input
                        label="Email"
                        placeholder="sriflix@gmail.com"
                        type="email"
                        bg={true}
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        type="password"
                        bg={true}
                    />
                    <Link to="/dashboard" className=" bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                        <FiLogIn />Sign Up
                    </Link>
                    <p className="text-center text-border">
                        Already have an account?{" "}
                        <Link to="/login" className="text-dryGray font-semibold ml-2">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Register