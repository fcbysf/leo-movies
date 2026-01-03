import { Fragment, useEffect, useState } from "react";
import "./movies.css";
import { NavLink, useNavigate , useParams} from "react-router-dom";
import { NavBar } from "./App";
export default function Movies() {
  const page = useParams().page
  const [moviesData, setMoviesData] = useState([]);
  const [isHoverded, setIsHovered] = useState(false);
  const [search, setSearch] = useState("");
  const [mvId, setMvId] = useState("");
  const navigate = useNavigate();
  const pages = [1,2,3,4,5]
  useEffect(() => {

      const url =
        `https://api.themoviedb.org/3/discover/movie?api_key=7492fbf1f421a4bf5b21ebc63743bd6e&${page}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setMoviesData(data.results));
  }, []);
console.log(moviesData)
  const hover = (id) => {
    setMvId(id);
    setIsHovered(true);
  };
    const navig = (pg)=>{
    navigate(`/movies${pg>1?"/"+ pg: ''}`)
  }
  return (
    <div className="container">
          <NavBar>
          <input type="text" value={search} placeholder="Search" className="search" onChange={(e)=>setSearch(e.target.value)} />

    </NavBar>
      <div className="movieContainer">

        {
        moviesData.map((movie) => (
          movie.title.toLowerCase().includes(search.toLowerCase()) &&
            <Fragment key={movie.id}>
          <div
            className={`movieImages ${isHoverded && mvId !== movie.id ? "blurred" : ""}`}
            onClick={()=>navigate(`/movies/${page>1?page+'/' : '1/'}${movie.id}`)}
            onMouseEnter={() => hover(movie.id)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="poster"
            />
          </div>
            {
            isHoverded && mvId === movie.id && (
              <div className="movieInfos">
                <h1>{movie.title} </h1>
                <h3>⭐ {movie.vote_average}</h3>
                <b><i>+18 : </i>{movie.adult ? "yes" : "no"} </b><br />
                <b><i>Release date : </i>{movie.release_date}</b><br />
                <b><i>language : </i>{movie.original_language} </b>
                <p><i>overview : </i><br />{movie.overview}</p>
              </div>
            )}
            </Fragment>
        ))}
      </div>
        <div className="btns">
          {pages.map(p=>(
            <button key={p} onClick={()=>navig(p)}>{p}</button>
          ))}
        </div>
          
    </div>
  );
}
