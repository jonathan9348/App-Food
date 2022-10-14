import React from "react";
import { Link } from "react-router-dom";
import landingPage from '/Users/usuario/Desktop/App-Food/client/src/assets/landingPage.jpg';
import '../LandingPage/LandingPage.css'

export default function LandingPage() {
  return (
    <div>
      <div className="cont-txt">
        <h1>Food's</h1>
      </div>

      <img src={landingPage} alt="img not found" className="body-img" />

      <Link to="/home">
        <button type="submit" className="bnt-home">
          The food is served!
        </button>
      </Link>
    </div>
  );
}
