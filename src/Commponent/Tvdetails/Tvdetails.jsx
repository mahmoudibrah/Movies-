import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Tvdetails() {
  let { id } = useParams();
  const [tvDetails, setDetails] = useState(null);
  async function getTvDetails() {
    let { data } = await axios(
      `https://api.themoviedb.org/3/tv/${id}?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US`
    );
    setDetails(data);
  }
  useEffect(() => {
    getTvDetails();
    return () => {
      getTvDetails();
    };
  }, []);
  return (
    <>
      {tvDetails ? (
        <>
          {" "}
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="image">
                  {}
                  {tvDetails.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
                      alt="tvdetails"
                      className="w-100"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="box p-2">
                  <h2>{tvDetails.original_name}</h2>
                  <div className="genres d-flex gap-3">
                    {tvDetails.genres?.map((el, idx) => (
                      <p key={idx} className="bg-info rounded-3 p-2">
                        {" "}
                        {el.name}{" "}
                      </p>
                    ))}
                  </div>
                  <div className="details">
                    <h5 className="py-3"> vote : {tvDetails.vote_average} </h5>
                    <h5 className="py-3">
                      {" "}
                      vote count : {tvDetails.vote_count}{" "}
                    </h5>
                    <h5 className="py-3">
                      {" "}
                      popularity : {tvDetails.popularity}{" "}
                    </h5>
                    <h5 className="py-3">
                      {" "}
                      first air data : {tvDetails.first_air_date}{" "}
                    </h5>
                    <a
                      className="py-3"
                      href={tvDetails.homepage}
                      target="_blank"
                    >
                      {" "}
                      homepage{" "}
                    </a>
                  </div>
                  <h5 className="text-muted my-3"> {tvDetails.overview}</h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="vh-100 d-flex justify-content-center align-items-center ">
            <i className="fa-solid fa-spinner fa-5x fa-spin text-white "></i>
          </div>
        </>
      )}
    </>
  );
}
