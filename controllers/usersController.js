const express = require("express");
const users = express.Router();

const {createNewUser,getAllUsers,updateUser,deleteUser}=require("../queries/userProfile")

users.post("/",async (req,res)=>{
  try {
    const newUser=await createNewUser(req.body)
    if (newUser){
        res.json(newUser)
    }
    else{
        res.status(404).json({ error: "not found" });

    }
  } catch (error) {
    console.log(error)
  }

})

users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers[0]) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json("Business not found");
  }
});
users.put("/:id",  async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  res.status(200).json(updatedUser);
});



module.exports=users