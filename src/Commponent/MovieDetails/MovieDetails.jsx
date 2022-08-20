import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function MovieDetails() {
  const [movieDetails, setmovieDetails] = useState([]);
  let { id } = useParams();
  async function getMovieDetails() {
    let { data } = await axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US`
    );
    setmovieDetails(data);
  }
  console.log(movieDetails);
  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
    {movieDetails?<>       <div className="container py-3">
        <div className="row">
          <div className="col-md-4">
            <div className="image-api">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                className="w-100"
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="box p-2">
              <h2>{movieDetails.original_title}</h2>
              <div className="genres d-flex gap-3">
              {movieDetails.genres?.map( (el , idx) =>   <p key={idx} className='bg-info rounded-3 p-2'>  {el.name} </p>    )}
              </div>
             <div className="details">
                <h5 className="py-3">  vote :  {movieDetails.vote_average} </h5 >
                <h5 className="py-3">  vote count :  {movieDetails.vote_count} </h5 >
                <h5 className="py-3">  popularity :  {movieDetails.popularity} </h5 >
                <h5 className="py-3">  release data :  {movieDetails.release_date} </h5>
                <a className="py-3" href={movieDetails.homepage} target="_blank"> homepage  </a>
             </div>
             <h5 className="text-muted my-3"> {movieDetails.overview}</h5>
            </div>
          </div>
        </div>
      </div> </>    :<>      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <i className="fa-solid fa-spinner fa-5x fa-spin text-white "></i>
    </div></>    }


    </>
  );
}
