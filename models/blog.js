const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", // Make sure the 'user' model exists and is correctly referenced
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema); // Create the Blog model

module.exports = Blog; // Correctly export the Blog model
