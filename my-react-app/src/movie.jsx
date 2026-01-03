import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./movie.css";

export default function Movie() {
  const navigate = useNavigate()
  const movieId = useParams().mvId;
  const page = useParams().page;
  const [movie, setMovie] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error , setError] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState()
  const [isLoading, setIsLoadig] = useState(true);
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=7492fbf1f421a4bf5b21ebc63743bd6e`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if(!response.ok){
          throw new Error("failed to set movie !!");
        }
        return response.json()
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err)=>{
        setError(err.message);
      })
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=7492fbf1f421a4bf5b21ebc63743bd6e`
    )
      .then((response) => {
        if(!response.ok){
          throw new Error("failed to set photoov !!");
        }
        return response.json()

      })
      .then((data) => {
        setPhoto(data.backdrops[0].file_path);
        setIsLoadig(false);
      })
      .catch((err)=>{
        setError(err.message);
      })
      fetch('https://api.themoviedb.org/3/search/movie?api_key=7492fbf1f421a4bf5b21ebc63743bd6e&query=')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSearchedMovie(data.results)
      })
      .catch((err)=>{
        setError(err.message);
      })
  }, []);

  if (isLoading)
    return (
      <div className="loadingDiv">
        <div className="loading"></div>
      </div>
    );
    if(error){
    return <div>{error}</div>
  }
  return (
    <div
      className="movieDetails"
      style={{
        background: `url('https://image.tmdb.org/t/p/original/${photo}')`,
      }||null}
      >
      <h1 style={{zIndex : 1 , margin: 10 , cursor: "pointer", fontSize : "2.8rem"}} onClick={()=>navigate(`/movies${page>1?"/"+ page: ''}`)}>← </h1>
      <Trailer />
      <div className="infos">
        <h1>{movie?.title} </h1>
        <h3>⭐ {movie?.vote_average}/10</h3>
        <b>
          <i>+18 : </i>
          {movie?.adult ? "yes" : "no"}{" "}
        </b>
        <br />
        <b>
          <i>Release date : </i>
          {movie?.release_date}
        </b>
        <br />
        <b>
          <i>language : </i>
          {movie?.original_language}{" "}
        </b>
        <p>
          <i>overview : </i>
          <br />
          {movie?.overview}
        </p>
        <b>
          <i>categorie: </i> <br />
          {movie.genres?.map((g) => g.name + ", ")}{" "}
        </b>{" "}
        <br />
        <br />
        {movie?.homepage && (
          <b>
            <i>Movie wabSite : </i>
            <br />{" "}
            <a
              href={movie?.homepage}
              target="_blank"
              style={{ color: "white" }}
            >
              {movie?.homepage}
            </a>
          </b>
        )}
        <br />{" "}
        <b>
          <i>Time : </i>
          <br />
          {movie?.runtime} min
        </b>
      </div>
    </div>
  );
}

export function Trailer() {
  const movieId = useParams().mvId;
  const [trailerKey, setTrailerKey] = useState(null);
  useEffect(() => {
    fetch(`
https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7492fbf1f421a4bf5b21ebc63743bd6e`)
      .then((response) => response.json())
      .then((data) => {
        const trlr = data?.results?.find((v) => v.site === "YouTube");
        if (trlr) {
          setTrailerKey(trlr.key);
        }
      });
  }, []);

  if (!Trailer)
    return <h2 style={{ color: "white" }}>trailer not available</h2>;
  return (
    <div className="leftSide">
      <iframe
        className="video"
        width="460"
        height="300"
        src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture ;fullscreen"
      ></iframe>
      <button className="watch" >watch movie</button>
    </div>
  );
}
