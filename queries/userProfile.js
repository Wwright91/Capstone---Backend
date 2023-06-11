const db = require("../db/dbConfig.js");

const createNewUser=async (userObj)=>{

    const {first_name,last_name,username, email,password,favorites,uid}=userObj
    try {
        const newUser= await db.oneOrNone("INSERT INTO user_profile (first_name,last_name,username, email, password,favorites,uid) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",[first_name,last_name,username, email, password,favorites,uid])
        return newUser

        
    } catch (error) {
        console.log(error)
    }
}
const getAllUsers=async ()=>{
    try {
        const allUsers=await db.any(" SELECT * FROM user_profile")
        return allUsers
    } catch (error) {
        console.log(error)
    }
}
    const deleteUser = async (id) => {
        try {
          const deletedUser = await db.one(
            "DELETE FROM user_profile WHERE id = $1 RETURNING *",
            id
          );
          return deletedUser;
        } catch (error) {
          return error;
        }
      
    
}

const updateUser = async (id, userObj) => {
    const {first_name,last_name,username, email, password } = userObj;
    try {
      const updatedUser = await db.one(
        "UPDATE user_profile SET first_name=INITCAP($1), last_name=$2, username=$3, email=$4, password=$5 WHERE id=$6 RETURNING *",
        [first_name,last_name,username, email, password,id]
      );
      return updatedUser;
    } catch (error) {
      return error;
    }
  };
  const getUserByEmail= async (email)=>{
    try {
      const user= await db.any("SELECT * FROM user_profile WHERE email=$1 RETURNING *",email);
      return user
    } catch (error) {
      console.log(error)
    }

  }
  const getUserByUID= async (uid)=>{
    try {
      const user= await db.any("SELECT * FROM user_profile WHERE uid=$1",uid);
      return user
    } catch (error) {
      console.log(error)
    }

  }

  const getAllFavorites=async (id)=>{
    try {
        const favorites=await db.any(" SELECT * FROM favorites JOIN businesses ON favorites.business_id=businesses.id WHERE favorites.user_id=$1",[id])
        return favorites
    } catch (error) {
        console.log(error)
    }
}


const addFavorite=async (business_id,id)=>{


  try {
      const favorite= await db.oneOrNone("INSERT INTO favorites (business_id,user_id) VALUES ($1,$2) RETURNING *",[business_id,id])
      return favorite

      
  } catch (error) {
      console.log(error)
  }
}




module.exports={createNewUser,getAllUsers,updateUser,deleteUser,getUserByEmail,getUserByUID,addFavorite,getAllFavorites}