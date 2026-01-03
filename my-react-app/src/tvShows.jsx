import { Fragment, useEffect, useState } from "react";
import "./movies.css";
import { useNavigate , useParams} from "react-router-dom";
import { NavBar } from "./App";
export default function TvShows() {
  const page = useParams().page;
  const [moviesData, setMoviesData] = useState([]);
  const [isHoverded, setIsHovered] = useState(false);
  const [mvId, setMvId] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const pages = [1,2,3,4,5,6,7,8,9,10]

  const url =
    `https://api.themoviedb.org/3/discover/tv?api_key=7492fbf1f421a4bf5b21ebc63743bd6e&page=1`;
  console.log(search)
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMoviesData(data.results));
  }, [page]);

  const hover = (id) => {
    setMvId(id);
    setIsHovered(true);
  };
    const navig = (pg) => {
    navigate(`/tvShows${pg > 1 ? "/" + pg : ""}`);
  };
  return (
    <div className="container">
          <NavBar>
        <input type="text" value={search} placeholder="Search" className="search" onChange={(e)=>setSearch(e.target.value)} />
    </NavBar>
      <div className="movieContainer">
        {moviesData.map((tvShow) => (
           tvShow.original_name.toLowerCase().includes(search.toLowerCase()) &&

            <Fragment key={tvShow.id}>
          <div
            className={`movieImages ${isHoverded && mvId !== tvShow.id ? "blurred" : ""}`}
            
            onClick={()=>navigate(`/tvShows/${page>1?page+'/' : '1'}/${tvShow.id}`)}
            onMouseEnter={() => hover(tvShow.id)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
              alt="poster"
            />
          </div>
            {isHoverded && mvId === tvShow.id &&( 
              <div className="movieInfos">
                <h1>{tvShow.original_name} </h1>
                <h3>⭐ {tvShow.vote_average}</h3>
                <b><i>+18 : </i>{tvShow.adult ? "yes" : "no"} </b><br />
                <b><i>Release date : </i>{tvShow.release_date}</b><br />
                <b><i>language : </i>{tvShow.original_language} </b>
                <p><i>overview : </i><br />{tvShow.overview}</p>
              </div>
            )}
            </Fragment>
        ))}
      </div>
      <div className="btns">
        {pages.map((p) => (
          <button key={p} onClick={() => navig(p)}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
