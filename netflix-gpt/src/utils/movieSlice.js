import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name:"movies",
    initialState: {
        addNowPlayingMovies: null,
        trailerVedio: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) =>{
            state.addNowPlayingMovies =action.payload
        },
        addPopularMovies: (state, action) =>{
            state.popularMovies =action.payload
        },
        addTrailerVedio:(state,action)=>{
            state.trailerVedio = action.payload;

        }
       
    }

});

export const {addNowPlayingMovies, addTrailerVedio,addPopularMovies } = moviesSlice.actions;
export default moviesSlice.reducer;