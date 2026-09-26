import bcrypt from "bcrypt";
import { authenticateUser, createUser } from "../models/users.js";

/* ***************************
 * Display Registration Form
 * ************************** */
const showUserRegistrationForm = async (req, res) => {
    res.render("register");
};

/* ***************************
 * Process Registration
 * ************************** */
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, passwordHash);

        if (newUser) {
            req.session.flash = {
                type: "success",
                message: "Registration was successful. Please log in."
            };

            return res.redirect("/login");
        }

        req.session.flash = {
            type: "error",
            message: "Registration failed. Please try again."
        };

        return res.redirect("/register");
    } catch (error) {
        console.error("Registration error:", error);

        req.session.flash = {
            type: "error",
            message: "There was a problem creating your account. Please try again."
        };

        return res.redirect("/register");
    }
};

/* ***************************
 * Display Login Form
 * ************************** */
const showLoginForm = async (req, res) => {
    res.render("login");
};

/* ***************************
 * Process Login
 * ************************** */
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (user) {
        req.session.user = user;

        req.session.flash = {
            type: "success",
            message: "You have successfully logged in."
        };

        console.log("Logged in user:", user);

        return res.redirect("/");
    }

    req.session.flash = {
        type: "error",
        message: "Login failed. Please check your email and password."
    };

    return res.redirect("/login");
};

/* ***************************
 * Process Logout
 * ************************** */
const processLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect("/");
        }

        res.redirect("/login");
    });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role_name === role) {
            return next();
        }

        req.session.flash = {
            type: "error",
            message: "You do not have permission to access this page."
        };

        return res.redirect("/");
    };
};

/* ***************************
 * Export Controller Functions
 * ************************** */
export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    requireRole,
    processLogout,
};