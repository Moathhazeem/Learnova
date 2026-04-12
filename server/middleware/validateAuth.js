/**
 * Middleware: validateRegister
 * Validates incoming registration request body before hitting the controller.
 */
function validateRegister(req, res, next) {
  const { firstName, lastName, email, password, confirmPassword, phone } = req.body;
  const errors = [];

  // ── First Name ────────────────────────────────────────────────
  if (!firstName || firstName.trim().length < 5) {
    errors.push("First name must be at least 5 characters.");
  } else if (!/[A-Za-z]/.test(firstName.trim())) {
    errors.push("First name must contain only letters.");
  }

  // ── Last Name ─────────────────────────────────────────────────
  if (!lastName || lastName.trim().length < 2) {
    errors.push("Last name must be at least 2 characters.");
  } else if (!/[A-Za-z]/.test(lastName.trim())) {
    errors.push("Last name must contain only letters.");
  }

  // ── Email ─────────────────────────────────────────────────────
  if (!email || email.trim().length < 8) {
    errors.push("Email must be at least 8 characters.");
  } else if (!email.includes("@gmail.com")) {
    errors.push("Email must be a valid @gmail.com address.");
  }

  // ── Password ──────────────────────────────────────────────────
  if (!password || password.trim().length < 8) {
    errors.push("Password must be at least 8 characters.");
  } else {
    if (!/[0-9]/.test(password))        errors.push("Password must contain at least one number.");
    if (!/[A-Z]/.test(password))        errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password))        errors.push("Password must contain at least one lowercase letter.");
    if (!/[!@#$%^&*]/.test(password))   errors.push("Password must contain at least one special character.");
  }

  // ── Confirm Password ──────────────────────────────────────────
  if (!confirmPassword || confirmPassword !== password) {
    errors.push("Passwords do not match.");
  }

  // ── Phone ─────────────────────────────────────────────────────
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phone || !phoneRegex.test(phone.trim())) {
    errors.push("Phone must be 10–15 digits.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

/**
 * Middleware: validateLogin
 * Validates incoming login request body.
 */
function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.includes("@gmail.com")) {
    errors.push("Please enter a valid @gmail.com email address.");
  }
  if (!password || password.trim().length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

module.exports = { validateRegister, validateLogin };
