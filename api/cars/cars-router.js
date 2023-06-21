const express = require("express");
const router = express.Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware.js");
const { getAll, create } = require("./cars-model.js");

router.get("/", async (req, res, next) => {
  try {
    let query = await getAll();
    res.status(200).json(query);
  } catch (e) {
    next(e);
  }
});

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    let query = await create(req.body);
    res.status(201).json(query);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.status(200).json(req.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
