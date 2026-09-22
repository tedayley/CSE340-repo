import express from "express";

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    showProjectCategoriesForm,
    processProjectCategoriesForm,
    processDeleteProject
} from "../controllers/projects.js";

const router = express.Router();

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);
router.get("/new-project", showNewProjectForm);
router.post("/new-project", processNewProjectForm);

router.get("/edit-project/:id", showEditProjectForm);

router.post("/edit-project/:id", processEditProjectForm);

router.get("/edit-project/:id/categories", showProjectCategoriesForm);
router.post("/edit-project/:id/categories", processProjectCategoriesForm);
router.post("/delete-project/:id", processDeleteProject);

export default router;