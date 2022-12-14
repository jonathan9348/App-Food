import React from "react";
import '../Card/Card.css'

export default function Card({ name, image, diets, healthScore }) {
  return (
    <div className="cont-card">
      <div className="card">
        <h1 className="name-h">{name}</h1>
        <img src={image} alt="image not found" className="card-img" />
        <h3 className="diet-h">Diet: {diets}</h3>
        <h4 className="hs-h">Health Score: {healthScore}</h4>
      </div>
    </div>
  );
}
