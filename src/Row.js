import React, { useState, useEffect } from "react";
import instance from "./axios"; // jruri nathi export kryu ej name aapyu defualt hoy to aiya kai pn name aapi skay
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";



const base_url = "http://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  // es7 new features props vgr direct je lkhyu hoy e other wise props.title

  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState("");

  // A snippet of code which runs based build on speacefic condtions/variables

  useEffect(() => {
    // if [] ,run once when  the row loads ,and don't run again

    async function fetchData() {
      const request = await instance.get(fetchUrl);
      // http://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      console.log(request.data.results[0].backdrop_path);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]); //  jyare url ni value change thay tyrepn use effect call thay

  const opts = {
    height:"390",
    width:"100%",
    playerVars:{
      autoplay:1,
    },
  };

  const handleClick = (movie)=>{
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movieTrailer(movie?.name || "")   
      .then((url)=>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));

      })
      .catch((error)=> console.log(error));
    }
  };



  console.log(movies.poster_path);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* serverl row poster */}
        {movies.map((movie, index) => {
          return (
            <img
              key={movie.id}
              onClick={()=> handleClick(movie)}
              className={`row__poster ${isLargeRow && "row_posterLarge"} `}
              src={` ${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path // means khali first row ni value true 6 atle eni hieght vhadre ths eusing poster path else bacdrop thi thumbnail ni jm aavse
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
      
    </div>
  );
};

export default Row;

// // http://www.youtube.com/watch?v=XtMTHy8QkQU  v = niche urlparams ma 6 e ema value aavse
// aa ek npm package 6 je pn name hs emovie nu enu traile fatch karse and promieses return kare6