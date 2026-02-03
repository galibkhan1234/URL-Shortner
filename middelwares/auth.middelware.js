import { getUser } from "../service/auth.id.js";

export function authenticate(req, res, next) {
  const token = req.cookies.uid;

  req.user = null;

  if (!token) return next();

  const user = getUser(token);
  if (!user) return next();

  req.user = user;
  next();
}

// Ensure templates have access to `user` via res.locals
export function attachUserToLocals(req, res, next) {
  res.locals.user = req.user || null;
  next();
}

export function requireLogin(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
}
