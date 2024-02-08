const db = require("../db/dbConfig.js");

const getAllReferrals = async () => {
  try {
    const allReferrals = await db.any("SELECT * FROM referrals");
    return allReferrals
  } catch (error) {
    return error;
  }
}

module.exports = getAllReferrals