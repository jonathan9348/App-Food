const { Router } = require("express");
const {
  getAll,
  getRecipesApi,
  getRecipesDb,
  getId,
} = require("../utils/getRecipes");
const { Recipe, Diet } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      const allData = await getAll();

      res.status(200).json(allData);
    } catch (err) {
      res.status(400).send("No se pueden traer las recetas");
    }
  } else {
    try {
      const apiNames = await getRecipesApi(name);
      const dbNames = await getRecipesDb(name);

      const allNames = apiNames.concat(dbNames);

      res.status(200).json(allNames);
    } catch (err) {
      res.status(400).send("No se encontró dicho nombre");
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const forDb = await Recipe.findByPk(id, {
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
      res.status(200).json(forDb);
    } else {
      const forApi = await getId(id);
      res.status(200).json(forApi);
    }
  } catch (err) {
    res.status(400).json({ err: "No se encontró receta con dicho Id" });
  }
});
router.post("/", async (req, res) => {
  const { name, summary, healthScore, instructions, image } = req.body;

  try {
    const nameInDb = await Recipe.findOne({
      where: { name },
    });

    if (nameInDb) res.status(400).send("Ya existe el nombre");

    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      instructions,
      image,
    });

    const recDiet = await Diet.findAll({
      where: { name },
    });

    newRecipe.addDiet(recDiet);

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json({ err: "No se pudo crear la receta" });
  }
});

module.exports = router;
