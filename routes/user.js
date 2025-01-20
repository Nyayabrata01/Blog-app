const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// Render sign-in page
router.get("/signin", (req, res) => {
  return res.render("signin", { errors: [] }); // Pass an empty errors array initially
});

// Render sign-up page
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// Handle sign-in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Sign-in error:", error.message);
    // Render the signin page with an error message
    return res.render("signin", { errors: [error.message] });
  }
});

// Handle logout
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

// Handle sign-up
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;
