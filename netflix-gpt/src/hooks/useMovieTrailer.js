
import { useEffect,useState } from "react"
import { API_OPTIONS } from "../utils/constant"
import { useDispatch } from "react-redux";
import { addTrailerVedio } from "../utils/movieSlice";
const useMovieTrailer = (movieId)=>{

    const dispatch = useDispatch();

    const getMovieVedios = async() =>{
        const data =  await fetch ('https://api.themoviedb.org/3/movie/'+movieId+'/videos',API_OPTIONS)
        const json = await data.json()
        const filterData = json.results.filter((vedio) => vedio.type === "Trailer")
        const trailer = filterData.length  ? filterData[0] : json.results[0];
        dispatch(addTrailerVedio(trailer))
       
     }
 
     useEffect(()=>{
         getMovieVedios();
     },[])
}

export default useMovieTrailer;