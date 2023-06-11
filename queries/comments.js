const db = require("../db/dbConfig.js");

const getAllComments = async (business_id) => {
  try {
    const allComments = await db.any(
      "SELECT * FROM comments WHERE business_id=$1",
      business_id
    );
    return allComments;
  } catch (error) {
    return error;
  }
};

const getOneComment = async (id) => {
  try {
    const oneComment = await db.oneOrNone(
      "SELECT * FROM comments WHERE id=$1",
      id
    );
    return oneComment;
  } catch (error) {
    return error;
  }
};

const createComment = async (comment) => {
  const { commenter, content, business_id } = comment;
  try {
    const newComment = await db.oneOrNone(
      "INSERT INTO comments (commenter, content, business_id) VALUES($1, $2, $3) RETURNING *",
      [commenter, content, business_id]
    );
    return newComment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteComment = async (id) => {
  try {
    const deletedComment = await db.one(
      "DELETE FROM comments WHERE id = $1 RETURNING *",
      id
    );
    return deletedComment;
  } catch (error) {
    return error;
  }
};

const updateComment = async (id, comment) => {
  const { commenter, content, business_id } = comment;
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET commenter=$1, content=$2, business_id=$3 WHERE id=$4 RETURNING *",
      [commenter, content, business_id, id]
    );
    return updatedComment;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllComments,
  getOneComment,
  createComment,
  deleteComment,
  updateComment,
};
