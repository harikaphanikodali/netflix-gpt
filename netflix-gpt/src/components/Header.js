

import {  signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {LOGO, SUPPORTED_LANGUAGES} from "../utils/constant"
import { addUser, removeUser } from "../utils/userSlice"
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();


    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

    const handleSignOut = () =>{
    
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            navigate("/error")
        });

    }

    const handleGptSearchClick = () =>{
        dispatch(toggleGptSearchView())
    }

    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email,displayName,photoURL } = user;
              dispatch(addUser({uid:uid, email :email, displayName:displayName,photoURL: photoURL }))
             navigate("/browse")
            } else {
             dispatch(removeUser());
            navigate("/")
            }
          });

          return () =>  unSubscribe();

    },[])

    const handleLanguageChange = (e) =>{
        dispatch(changeLanguage(e.target.value))
    }
    
    return <div className="absolute px-8 py-2 w-full bg-gradient-to-b from-black z-10 flex justify-between " >
   <img className="w-44" src={LOGO}
   alt="logo"/>
   { user && (
    <div className="flex p-2">
      { showGptSearch && ( <select className="p-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} 
            value={lang.identifier}>{lang.name}</option>
            ))}
           
        </select>)}
        <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
        onClick={handleGptSearchClick}>{showGptSearch ? "Home": " GPT Search"}</button>
    <img className="w-12 h-12" src={user?.photoURL} alt="usericon"/>
    <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
   </div>)}
    </div>;
}

export default Header;