import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore(
    {
        reducer: {
            user: useReducer,
            gpt:gptReducer,
            movies: moviesReducer,
            config:configReducer,
        }
    }
)

export default appStore;