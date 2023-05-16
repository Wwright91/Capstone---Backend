const db = require("../db/dbConfig.js");

const createNewUser=async (userObj)=>{

    const {first_name,last_name,username, email,password}=userObj
    try {
        const newUser= await db.oneOrNone("INSERT INTO user_profile (first_name,last_name,username, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING *",[first_name,last_name,username, email, password])
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
      const user= await db.any("SELECT * FROM user_profile WHERE email=$1",email);
      return user
    } catch (error) {
      console.log(error)
    }

  }





module.exports={createNewUser,getAllUsers,updateUser,deleteUser,getUserByEmail}