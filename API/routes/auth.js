import express from "express";
import { login,register,logout } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get('/test', (req, res) => {
    res.json({ msg: "Auth route working" });
  });
  


export default router