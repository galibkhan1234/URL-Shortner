import express from "express";
import URL from "../models/user.js";
import { requireLogin } from "../middelwares/auth.middelware.js";

const router = express.Router();

// Home page (user-specific)
router.get("/", requireLogin, async (req, res) => {
  try {
    const urls = await URL.find({ createdBy: req.user._id });

    res.render("home", {
      urls,
      user: req.user,
      id: null,
      error: null,
      success: null,
    });
  } catch (error) {
    console.error(error);
    res.render("home", {
      urls: [],
      user: req.user,
      id: null,
      error: "Failed to load your URLs",
      success: null,
    });
  }
});

// Signup
router.get("/signup", (req, res) =>
  res.render("signup", {
    error: null,
    success: null,
  })
);

// Login
router.get("/login", (req, res) =>
  res.render("login", {
    error: null,
    success: null,
  })
);

// Redirect handler (public)
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });

    if (!entry) return res.status(404).send("URL not found");

    const clickCookie = `clicked_${shortId}`;

    if (!req.cookies[clickCookie]) {
      await URL.updateOne(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
      );

      res.cookie(clickCookie, "true", {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
    }

    const finalURL = entry.redirectURL.startsWith("http")
      ? entry.redirectURL
      : `https://${entry.redirectURL}`;

    return res.redirect(finalURL);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router;
