const express = require("express");
const businesses = express.Router();

const {
  getAllBusinesses,
  getOneBusiness,
  createBusiness,
  deleteBusiness,
  updateBusiness,
} = require("../queries/businesses");

const {
  checkName,
  checkBoolean,
} = require("../validations/checkBusinesses.js");

const commentsController = require("./commentsController.js");
businesses.use("/:businessId/comments", commentsController);

businesses.get("/", async (req, res) => {
  const allBusinesses = await getAllBusinesses();

  let businessesCopy = [...allBusinesses];

  const { category } = req.query;

  if (category) {
    businessesCopy = businessesCopy.filter(
      ({ category }) =>
        category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  if (businessesCopy[0]) {
    res.status(200).json(businessesCopy);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

businesses.get("/:id", async (req, res) => {
  const { id } = req.params;
  const business = await getOneBusiness(id);
  if (business) {
    res.json(business);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

businesses.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const business = await createBusiness(req.body);
    res.json(business);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

businesses.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBusiness = await deleteBusiness(id);
  if (deletedBusiness.id) {
    res.status(200).json(deletedBusiness);
  } else {
    res.status(404).json("Business not found");
  }
});

businesses.put("/:id", checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedBusiness = await updateBusiness(id, req.body);
  res.status(200).json(updatedBusiness);
});
module.exports = businesses;
