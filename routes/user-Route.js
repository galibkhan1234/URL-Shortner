import express from "express";
import {
  handleUserSignup,
  handleUserLogin,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
// Support both GET and POST for logout (links may use GET)


router.get("/logout", (req, res) => {
  res.clearCookie("uid", { httpOnly: true });
  return res.redirect("/login");
});

router.post("/logout", (req, res) => {
  res.clearCookie("uid", { httpOnly: true });
  return res.redirect("/login");
});


export default router;
