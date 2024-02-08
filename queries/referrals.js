const db = require("../db/dbConfig.js");

const getAllReferrals = async () => {
  try {
    const allReferrals = await db.any("SELECT * FROM referrals");
    return allReferrals;
  } catch (error) {
    return error;
  }
};

const createReferral = async (referral) => {
  const { business_name, website, phone, email, instagram, facebook, twitter, } =
    referral;
  try {
    const referral = await db.oneOrNone(
      "INSERT INTO referrals (business_name, website, phone, email, instagram, facebook, twitter) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [business_name, website, phone, email, instagram, facebook, twitter,]
    );
    return referral;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getAllReferrals, createReferral };
