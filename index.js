const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 'view engine' and 'views' configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Handle form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware: Check authentication cookie
app.use(checkForAuthenticationCookie);

app.use(express.static(path.resolve("./public")));

// Routes
app.get("/",async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.message);
  res.status(err.status || 500).render("error", { message: err.message });
});


// Start the server
app.listen(PORT, () => console.log(`Server started at PORT::${PORT}`));
