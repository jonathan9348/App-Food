const { Router } = require("express");
const { getAll, getRecipesApi, getRecipesDb } = require("../utils/getRecipes");

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


      
      res.status(200).json(allNames)
    } catch (err) {
      res.status(400).send('No se encontró dicho nombre')
    }
  }
});

router.get("/:id", async (req, res) => {});
router.post("/", async (req, res) => {});

module.exports = router;
