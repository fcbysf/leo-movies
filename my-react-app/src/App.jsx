import Movies from "./movies";
import Home from "./home";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Movie from "./movie";
import TvShows from "./tvShows";
import TvShow from "./tvShow";
import MoviesPage from "./MoviesPage";
import TvShowsPage from "./TvShowsPage";
export default function App() {
  return (
    <div className="containAll">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:page" element={<MoviesPage />} />
          <Route path="/movies/:page/:mvId" element={<Movie />} />
          <Route path="/tvShows" element={<TvShows />} />
          <Route path="/tvShows/:page" element={<TvShowsPage />} />
          <Route path="/tvShows/:page/:tvId" element={<TvShow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function NavBar({ children }) {
  const style = ({ isActive }) => {
    if (isActive)
      return {
        scale: 1.05,
        backgroundColor: "#000000a1",
        opacity: 1,
      };
    else return { textDecoration: "none" };
  };
  return (
    <header>
      <img src="/images/image.png" alt="LOGO" width={115} />
      <nav>
        <NavLink style={style} to={"/"}>
          home
        </NavLink>
        <NavLink style={style} to={"/movies"}>
          movies
        </NavLink>
        <NavLink style={style} to={"/tvShows"}>
          Series
        </NavLink>
      </nav>
      {children}
    </header>
  );
}
