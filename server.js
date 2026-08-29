import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const title = "Home";
    res.render("home", { title });
});

app.get("/organizations", async (req, res) => {
    const title = "Organizations";
    res.render("organizations", { title });
});

app.get("/projects", async (req, res) => {
    const title = "Service Projects";
    res.render("projects", { title });
});

app.get("/categories", async (req, res) => {
    const title = "Service Project Categories";
    res.render("categories", { title });
});

app.use((req, res) => {
    const title = "Page Not Found";
    res.status(404).render("404", { title });
});

app.listen(port);