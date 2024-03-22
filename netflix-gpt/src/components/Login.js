import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword ,updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constant";


const Login = () => {
    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage]= useState(null);
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm)
    }

    const  handleButtonClick = () =>{
       const message =  checkValidData(email.current.value, password.current.value)

       setErrorMessage(message);

       if(message) return;

       if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
         
            updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
            }).then(() => {
                const {uid,email,displayName,photoURL } = auth.currentUser;
                dispatch(
                   dispatch(addUser({uid:uid, email :email, displayName:displayName,photoURL: photoURL }))
                )
            }).catch((error) => {
               setErrorMessage(errorMessage);
            });
     
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         setErrorMessage(errorCode+ "-" + errorMessage)
        });

       }else{

             signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
             

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ "-"+errorMessage)
            });

       }


    }

    return (
        <div>
            <Header />
            <div className="absolute" >
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/1c01ae52-0a90-41c5-a3ab-2736447a92ed/US-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                    alt="logo" />
            </div>
            <form  onSubmit={(e)=> e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-90">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : " Sign Up"}</h1>
                {!isSignInForm && (<input type="text" ref={name} placeholder="Full Name"
                    className="p-4 my-4 w-full bg-gray-700" />)}
                <input type="text" ref={email} placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700" />
                <input type="password" ref={password} placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700" />

                <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg"onClick={handleButtonClick} >{isSignInForm ? "Sign In" : " Sign Up"}</button>
                <p className="py-4 cursor-pointer " onClick={toggleSignInForm} > {isSignInForm ? "New to netflix? Sign Up Now" : " Already Registered? Sign In Now"}</p>
            </form>
        </div>);
}

export default Login;