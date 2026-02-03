import jwt from "jsonwebtoken";

const secret = "Galib$123";

export function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,     // ✅ FIX
      email: user.email,
      role: user.role,  // optional but recommended
    },
    secret,
    { expiresIn: "1h" }
  );
}

export function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
