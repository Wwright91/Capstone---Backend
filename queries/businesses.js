const db = require("../db/dbConfig.js");

const getAllBusinesses = async () => {
  try {
    const allBusinesses = await db.any("SELECT * FROM businesses");
    return allBusinesses;
  } catch (error) {
    return error;
  }
};

const getOneBusiness = async (id) => {
    try {
      const oneBusiness = await db.oneOrNone("SELECT * FROM businesses WHERE id=$1", id);
      return oneBusiness;
    } catch (error) {
      return error;
    }
};
  
const createBusiness = async (business) => {
    const {name, address, contact_num, year_opened, is_online, is_store, img, category, website, description} = business
    try {
        const business = await db.oneOrNone(
            "INSERT INTO businesses (name, address, contact_num, year_opened, is_online, is_store, img, category, website, description) VALUES(INITCAP($1), $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [name, address, contact_num, year_opened, is_online, is_store, img, category, website, description]
          );
          return business;
      } catch (error) {
        console.log(error);
        throw error;
      }
}

//DELETE
const deleteBusiness = async (id) => {
    try {
      const deletedBusiness = await db.one(
        "DELETE FROM businesses WHERE id = $1 RETURNING *",
        id
      );
      return deletedBusiness;
    } catch (error) {
      return error;
    }
  };
  
  //UPDATE
const updateBusiness = async (id, business) => {
    const { name, address, contact_num, year_opened, is_online, is_store, img, category, website, description } = business;
    try {
      const updatedBusiness = await db.one(
        "UPDATE businesses SET name=INITCAP($1), address=$2, contact_num=$3, year_opened=$4, is_online=$5, is_store=$6, img=$7, category=$8, website=$9, description=$10 WHERE id=$11 RETURNING *",
        [ name, address, contact_num, year_opened, is_online, is_store, img, category, website, description, id]
      );
      return updatedBusiness;
    } catch (error) {
      return error;
    }
  };

  const getByCategory= async (category)=>{
    try {
      const filteredBusiness= await db.any("SELECT * FROM businesses WHERE category=$1",category);
      return filteredBusiness
    } catch (error) {
      console.log(error)
    }

  }

module.exports = { getAllBusinesses, getOneBusiness, createBusiness, deleteBusiness, updateBusiness,getByCategory };
