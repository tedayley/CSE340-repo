import "dotenv/config";

import express from "express";
import categoryRoutes from "./src/routes/categories.js";
import organizationRoutes from "./src/routes/organizations.js";
import projectRoutes from "./src/routes/projects.js";
import homeRoutes from "./src/routes/home.js";

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static("public"));

app.use(categoryRoutes);
app.use(organizationRoutes);
app.use(projectRoutes);
app.use(homeRoutes);

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