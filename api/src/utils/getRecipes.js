const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getRecipesApi = async () => {
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${API_KEY}&addRecipeInformation=true&number=100`
    );

    const info = apiRecipes.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        dishTypes: e.dishTypes.map((p) => {
          //Array con los tipos de platos
          return { name: p };
        }),
        diets: e.diets.maps((d) => {
          //Array con los tipos de dietas
          return { name: d };
        }),
        summary: e.summary,
        instructions: e.instructions,
        image: e.image,
      };
    });

    return info;
  } catch (err) {
    console.log(err);
  }
};

const getRecipesDb = async () => {
  const dbInfo = await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return dbInfo;
};

const getAll = async () => {
  const inApi = await getRecipesApi();
  const inDb = await getRecipesDb();

  const allInfo = inApi.concat(inDb);

  return allInfo;
};

module.exports = { getRecipesApi, getRecipesDb, getAll };
