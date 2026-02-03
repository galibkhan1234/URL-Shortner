import User from "../models/auth.user.js";
import { setUser } from "../service/auth.id.js";

export async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("signup", {
        error: "All fields are required",
        success: null,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "Email already registered",
        success: null,
      });
    }

    await User.create({
      name,
      email,
      password,
      visitHistory: [],
    });

    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).render("signup", {
      error: "Internal server error",
      success: null,
    });
  }
}

export async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", {
        error: "Email and password are required",
        success: null,
      });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", {
        error: "Invalid email or password",
        success: null,
      });
    }



    // ✅ Create token
    const token = setUser(user);

    // ✅ Set cookie
    res.cookie("uid", token, {
      httpOnly: true,

    });

    // ✅ Redirect after successful login
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).render("login", {
      error: "Internal server error",
      success: null,
    });
  }
}
