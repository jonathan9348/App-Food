const { Router } = require("express");
const { Diet } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dietsDb = await Diet.findAll();

    res.status(200).json(dietsDb);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
