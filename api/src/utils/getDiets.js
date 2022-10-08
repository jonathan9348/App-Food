const { Diet } = require("../db");

const getDiets = async () => {
  const allDiets = [
    "dairy free",
    "fodmap friendly",
    "gluten free",
    "ketogenic",
    "lacto ovo vegetarian",
    "paleolithic",
    "pescatarian",
    "primal",
    "vegan",
    "whole 30",
    "paleo",
  ];

  const dbDiets = await Diet.findAll();

  if (dbDiets.length === 0) {
    allDiets.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });
  }
  return dbDiets;
};

//Esta función la ejecuto en app o en index, y cada vez que el server se levante va a ejecutarse.
module.exports = getDiets;
