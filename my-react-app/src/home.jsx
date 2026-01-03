import { NavLink } from "react-router-dom";
import { NavBar } from "./App";

export default function Home() {
  return (
    <>
    <NavBar>
      <NavLink to="/login">
        <button className="loginbtn">login</button>
      </NavLink>
    </NavBar>
    </>
    
  );
}
