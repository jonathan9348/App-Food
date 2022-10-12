import React from "react";

export default function Card({ name, image, diets, healthScore }) {
  return (
    <div>
      <div>
        <h1>{name}</h1>
        <img src={image} alt="image not found" className="" />
        <h3>Diet: {diets}</h3>
        <h4>Health Score: {healthScore}</h4>
      </div>
    </div>
  );
}
