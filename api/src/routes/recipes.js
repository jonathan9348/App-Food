const { Router } = require("express");
const { getAll, getRecipesApi, getRecipesDb } = require("../utils/getRecipes");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      const allData = await getRecipesApi();
      console.log(allData)
      res.status(200).json(allData);
    } catch (err) {
      res.status(400).send("No se pueden traer las recetas");
    }
  } else {
    const allRec = await getAll();

    const dataNames = allRec.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    return dataNames;
  }
});
router.get("/:id", async (req, res) => {});
router.post("/", async (req, res) => {});

module.exports = router;
