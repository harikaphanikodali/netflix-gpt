import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm)

    }

    return (
        <div>
            <Header />
            <div className="absolute" >
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/1c01ae52-0a90-41c5-a3ab-2736447a92ed/US-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                    alt="logo" />
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-90">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : " Sign Up"}</h1>
                {!isSignInForm && (<input type="text" placeholder="Full Name"
                    className="p-4 my-4 w-full bg-gray-700" />)}
                <input type="text" placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700" />
                <input type="password" placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700" />


                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : " Sign Up"}</button>
                <p className="py-4 cursor-pointer " onClick={toggleSignInForm} > {isSignInForm ? "New to netflix? Sign Up Now" : " Already Registered? Sign In Now"}</p>
            </form>
        </div>);
}

export default Login;