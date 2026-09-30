import express from "express";

import {
    showProjectsPage,
    showProjectDetailsPage,
    processAddVolunteer,
    processRemoveVolunteer,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    showProjectCategoriesForm,
    processProjectCategoriesForm,
    processDeleteProject
} from "../controllers/projects.js";

import { requireLogin, requireRole } from "../controllers/users.js";

const router = express.Router();

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

router.post(
    "/project/:id/volunteer",
    requireLogin,
    processAddVolunteer
);

router.post(
    "/project/:id/unvolunteer",
    requireLogin,
    processRemoveVolunteer
);

router.get(
    "/new-project",
    requireRole("admin"),
    showNewProjectForm
);

router.post(
    "/new-project",
    requireRole("admin"),
    processNewProjectForm
);

router.get(
    "/edit-project/:id",
    requireRole("admin"),
    showEditProjectForm
);

router.post(
    "/edit-project/:id",
    requireRole("admin"),
    processEditProjectForm
);

router.get(
    "/edit-project/:id/categories",
    requireRole("admin"),
    showProjectCategoriesForm
);

router.post(
    "/edit-project/:id/categories",
    requireRole("admin"),
    processProjectCategoriesForm
);

router.post(
    "/delete-project/:id",
    requireRole("admin"),
    processDeleteProject
);

export default router;