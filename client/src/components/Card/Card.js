import React from "react";

export default function Card({ name, image, diets }) {
  return (
    <div>
      <div>
        <h1>{name}</h1>
        <img src={image} alt="image not found" className="" />
        <h3>Diet: {diets}</h3>
      </div>
    </div>
  );
}
