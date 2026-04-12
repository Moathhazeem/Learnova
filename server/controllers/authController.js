const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { findByEmail, addUser } = require("../db/db");

const JWT_SECRET = process.env.JWT_SECRET || "learnova_jwt_super_secret_key_2026";
const JWT_EXPIRES_IN = "7d"; // Token valid for 7 days

// ─── POST /api/auth/register ─────────────────────────────────────────────────
async function register(req, res) {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = findByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        errors: ["An account with this email already exists."],
      });
    }

    // Hash the password (salt rounds = 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user object
    const newUser = {
      id: uuidv4(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    };

    // Persist to JSON file
    addUser(newUser);

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`✅ New user registered: ${newUser.email}`);

    // Return token + safe user data (never send password)
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ success: false, errors: ["Server error. Please try again."] });
  }
}

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find user by email
    const user = findByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid email or password."],
      });
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid email or password."],
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`✅ User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.firstName}!`,
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, errors: ["Server error. Please try again."] });
  }
}

// ─── GET /api/auth/me (protected - requires JWT) ──────────────────────────────
function getMe(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = findByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
}

module.exports = { register, login, getMe };
