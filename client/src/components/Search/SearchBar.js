import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../redux/actions";
import '../Search/SearchBar.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) alert("Debe ingresar un nombre para buscar");
    else {
      dispatch(searchRecipes(name));
      setName("");
    }
  };
  return (
    <div>
      <div className="container">
        <input
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="Search"
          type="search"
          className="sbinput"
        />
        <button className="btn" type="submit" onClick={(e) => handleSubmit(e)}>
          SEARCH
        </button>
      </div>
    </div>
  );
}
