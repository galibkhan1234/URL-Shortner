import { nanoid } from "nanoid";
import URL from "../models/user.js";

// CREATE NEW SHORT URL
export const handleGenerateNewShortURL = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.redirect("/");

    const finalURL = url.startsWith("http") ? url : `https://${url}`;

    await URL.create({
      shortId: nanoid(8),
      redirectURL: finalURL,
      createdBy: req.user._id,
      visitHistory: [],
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Create URL error:", error);
    return res.redirect("/");
  }
};

// DELETE URL (OWNER ONLY)
export const handleDeleteURL = async (req, res) => {
  try {
    const { shortId } = req.params;

    await URL.findOneAndDelete({
      shortId,
      createdBy: req.user._id,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Delete error:", error);
    return res.redirect("/");
  }
};

// ANALYTICS (OWNER ONLY)
export const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await URL.findOne({
      shortId,
      createdBy: req.user._id,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found or unauthorized",
      });
    }

    return res.render("analytics", {
      url: url,
      user: req.user,
      success: true,
      totalClicks: url.visitHistory.length,
      analytics: url.visitHistory,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
