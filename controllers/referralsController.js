const express = require("express");
const referrals = express.Router();

const { getAllReferrals, createReferral } = require("../queries/referrals");

referrals.get("/", async (req, res) => {
  const allReferrals = await getAllReferrals();

  if (allReferrals[0]) {
    res.status(200).json(allReferrals);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

referrals.post("/", async (req, res) => {
  try {
    const referral = await createReferral(req.body);
    res.json(referral);
  } catch (error) {
    console.log(error);
    res.status(400).json({error})
  }
})

module.exports = referrals;
