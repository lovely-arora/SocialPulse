import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = (req, res) => {
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";

  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json("Server error");
    }

    if (data.length > 0) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertUserQuery = `
      INSERT INTO users (username, email, password, name)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(insertUserQuery, values, (err, data) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json("Database error while registering");
      }

      return res.status(200).json("User has been created.");
    });
  });
};

// LOGIN
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json("Server error");
    }

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "Lax", // "None" if you're using cross-origin with HTTPS
        secure: false,   // true if HTTPS
      })
      .status(200)
      .json(others);
  });
};

// LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "Lax", // change to None if needed
      secure: false,   // true if using HTTPS
    })
    .status(200)
    .json("User has been logged out.");
};
