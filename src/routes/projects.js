import express from "express";

import {
    showProjectsPage,
    showProjectDetailsPage,
    showEditProjectForm,
    processEditProjectForm
} from "../controllers/projects.js";

const router = express.Router();

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

router.get("/edit-project/:id", showEditProjectForm);

router.post("/edit-project/:id", processEditProjectForm);

export default router;