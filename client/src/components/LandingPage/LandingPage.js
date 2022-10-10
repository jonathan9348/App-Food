import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>
        <h1>Food's</h1>
      </div>

      <img src="" alt="" className="" />

      <Link to="/home">
        <button type="submit" className="">
          The food is served!
        </button>
      </Link>
    </div>
  );
}
