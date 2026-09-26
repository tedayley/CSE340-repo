import express from "express";

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
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

// Process logout
router.get("/logout", processLogout);

export default router;