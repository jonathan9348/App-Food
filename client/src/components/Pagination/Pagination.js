import React from "react";

export default function Pagination({
  allRecipes,
  recipesPage,
  setPagination,
  actualPage,
}) {
  const numberPage = [];

  for (let i = 0; i <= Math.ceil(allRecipes / recipesPage); i++) {
                        //Math.ceil devuelve el entero mayor o igual mas proximo de un numero dado.
    numberPage.push(i); // Ejemplo: Math.ceil(0.95) ==> (1)
  }

  return (
    <nav>
      <div>
        {allRecipes < 9 ? (
          <div> {setPagination(1)} </div>
        ) : (
          numberPage &&
          numberPage.map((n) => (
            <button
              onClick={(n) => setPagination(n)}
              className={
                actualPage === n ? "active items letters" : "items letters"
              }>
              {n}
            </button>
          ))
        )}
      </div>
    </nav>
  );
}
