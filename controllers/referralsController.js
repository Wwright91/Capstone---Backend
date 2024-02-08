const express = require("express");
const referrals = express.Router();

const { getAllReferrals } = require("../queries/referrals");

referrals.get("/", async (req, res) => {
  const allReferrals = await getAllReferrals();

  if (allReferrals[0]) {
    res.status(200).json(allReferrals);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = referrals;
