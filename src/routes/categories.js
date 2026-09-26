import express from "express";

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    processDeleteCategory
} from "../controllers/categories.js";

import { requireRole } from "../controllers/users.js";

const router = express.Router();

router.get("/categories", showCategoriesPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get(
    "/new-category",
    requireRole("admin"),
    showNewCategoryForm
);

router.post(
    "/new-category",
    requireRole("admin"),
    processNewCategoryForm
);

router.get(
    "/edit-category/:id",
    requireRole("admin"),
    showEditCategoryForm
);

router.post(
    "/edit-category/:id",
    requireRole("admin"),
    processEditCategoryForm
);

router.post(
    "/delete-category/:id",
    requireRole("admin"),
    processDeleteCategory
);

export default router;