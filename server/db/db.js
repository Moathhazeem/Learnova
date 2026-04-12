const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "users.json");

// ─── Ensure data directory and file exist ────────────────────────────────────
function ensureDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

// ─── Read all users ──────────────────────────────────────────────────────────
function readUsers() {
  ensureDB();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw).users;
}

// ─── Write all users ─────────────────────────────────────────────────────────
function writeUsers(users) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify({ users }, null, 2), "utf-8");
}

// ─── Find user by email ──────────────────────────────────────────────────────
function findByEmail(email) {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// ─── Add new user ─────────────────────────────────────────────────────────────
function addUser(user) {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
}

module.exports = { readUsers, writeUsers, findByEmail, addUser };
