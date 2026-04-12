const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../middleware/validateAuth");
const { register, login, getMe } = require("../controllers/authController");

// ── POST /api/auth/register ────────────────────────────────────────────────────
router.post("/register", validateRegister, register);

// ── POST /api/auth/login ───────────────────────────────────────────────────────
router.post("/login", validateLogin, login);

// ── GET /api/auth/me ───────────────────────────────────────────────────────────
router.get("/me", getMe);

module.exports = router;
