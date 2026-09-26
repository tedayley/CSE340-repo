import "dotenv/config";

import express from "express";
import session from "express-session";
import categoryRoutes from "./src/routes/categories.js";
import organizationRoutes from "./src/routes/organizations.js";
import projectRoutes from "./src/routes/projects.js";
import homeRoutes from "./src/routes/home.js";
import userRoutes from "./src/routes/users.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || "service-network-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 5 }
}));

app.use((req, res, next) => {
    res.locals.flash = req.session.flash;
    delete req.session.flash;

    res.locals.isLoggedIn = false;

    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }

    next();
});

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static("public"));

app.use(categoryRoutes);
app.use(organizationRoutes);
app.use(projectRoutes);
app.use(homeRoutes);
app.use(userRoutes);

app.use((req, res) => {
    const title = "Page Not Found";

    res.status(404).render("404", { title });
});

app.use((error, req, res, next) => {
    console.error(error);

    const title = "Server Error";

    res.status(500).render("500", { title });
});

app.listen(port);