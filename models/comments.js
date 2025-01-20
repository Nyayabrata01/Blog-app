const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog", // Reference to the blog
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the user who created the comment
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
