const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const arrayDiets = (
  stringArray //mapeo todo lo que me mandan dentro de los parentesis, en este caso serán dietas
) =>
  stringArray.map((item, index) => ({
    id: index,
    name: item,
  }));

const arrayInstruc = (instructionArray) => {
  //Nos van a mandar un array aqui dentro
  const arrInstruction = [];
  for (var i = 0; i < instructionArray?.length; i++) {
    //iniciamos la iteracion de lo que serán las instrucciones
    for (var j = 0; j < instructionArray[i].steps?.length; j++) {
      //por cada iteración vamos pusheando distintos valores dentro de steps.
      arrInstruction.push({
        number: instructionArray[i].steps[j].number,
        step: instructionArray[i].steps[j].step,
      });
    }
  }
  return arrInstruction; //devolvemos todos los valores pusheados
};

const getRecipesApi = async (name) => {
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    const info = apiRecipes.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        dishTypes: e.dishTypes.map((p) => {
          //Array con los tipos de platos
          return { name: p };
        }),
        diets: arrayDiets(e.diets),
        summary: e.summary,
        instructions: arrayInstruc(e.analyzedInstructions),
        healthScore: e.healthScore,
        image: e.image,
      };
    });

    if (name) {
      try {
        const dataNames = info.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        return dataNames;
      } catch (err) {
        alert("No se encontró dicho nombre");
      }
    }

    return info;
  } catch (err) {
    console.log(err);
  }
};

const getRecipesDb = async (name) => {
  if (!name) {
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
  } else {
    const dbInfoName = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attibutes: ["name"],
          through: {
            attibutes: [],
          },
        },
      ],
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    return dbInfoName;
  }
};

const getAll = async (name) => {
  const inApi = await getRecipesApi(name);
  const inDb = await getRecipesDb(name);

  const allInfo = inApi.concat(inDb);

  return allInfo;
};

const getId = async (id) => {
  const recipesId = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  const dataId = recipesId.data;

  const infoApi = {
    
      id: dataId.id,
      name: dataId.title,
      image: dataId.image,
      dishTypes: dataId.dishTypes.map((e) => {
        //Array con los tipos de platos
        return { name: e };
      }),
      diets: arrayDiets(dataId.diets),
      summary: dataId.summary,
      healthScore: dataId.healthScore,
      instructions: arrayInstruc(dataId.analyzedInstructions),
    };
  ;

  return infoApi;
};

module.exports = { getRecipesApi, getRecipesDb, getAll, getId };
