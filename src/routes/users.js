import express from "express";

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    requireLogin,
    requireRole,
    showUsersPage,
    processLogout,
} from "../controllers/users.js";

const router = express.Router();

/* ***************************
 * Registration Routes
 * *************************** */

// Display registration form
router.get("/register", showUserRegistrationForm);

// Process registration
router.post("/register", processUserRegistrationForm);

/* ***************************
 * Login Routes
 * *************************** */

// Display login form
router.get("/login", showLoginForm);

// Process login
router.post("/login", processLoginForm);

// Users page for admins
router.get("/users", requireLogin, requireRole("admin"), showUsersPage);

// Process logout
router.get("/logout", processLogout);

export default router;