import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database
import connectDB from "./config/db.js";

// Models
import URL from "./models/user.js"; 

// Middleware
import {
  authenticate,
  requireLogin,
  attachUserToLocals,
} from "./middelwares/auth.middelware.js";

// Routes
import router from "./routes/url-route.js";
import staticRouter from "./routes/staticRouter.js";
import userRoute from "./routes/user-Route.js";

// INITIAL SETUP

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001;

// DATABASE CONNECTION

await connectDB(process.env.MONGO_URI);

// VIEW ENGINE

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// CORE MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// AUTH MIDDLEWARE

app.use(authenticate);
app.use(attachUserToLocals);

// ROUTES

app.use("/user", userRoute);
app.use("/", staticRouter);
app.use("/url", requireLogin, router);

// REDIRECT ROUTE

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// SERVER START

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
