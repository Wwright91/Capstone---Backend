const express = require("express");
const comments = express.Router({ mergeParams: true });

const {
  getAllComments,
  getOneComment,
  createComment,
  deleteComment,
  updateComment,
} = require("../queries/comments");

comments.get("/", async (req, res) => {
  const { businessId } = req.params;

  try {
    const allComments = await getAllComments(businessId);
    res.json(allComments);
  } catch (err) {
    res.json(err);
  }
});

comments.get("/:id", async (req, res) => {
  const { id } = req.params;
  const business = await getOneComment(id);
  if (business) {
    res.json(business);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

comments.post("/", async (req, res) => {
  try {
    const business = await createComment(req.body);
    res.json(business);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

comments.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedComment = await deleteComment(id);
  if (deletedComment.id) {
    res.status(200).json(deletedComment);
  } else {
    res.status(404).json("Comment not found");
  }
});

comments.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedComment = await updateComment(id, req.body);
  res.status(200).json(updatedComment);
});

module.exports = comments;
