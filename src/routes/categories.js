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

const router = express.Router();

router.get("/categories", showCategoriesPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/new-category", showNewCategoryForm);

router.post("/new-category", processNewCategoryForm);

router.get("/edit-category/:id", showEditCategoryForm);

router.post("/edit-category/:id", processEditCategoryForm);
router.post("/delete-category/:id", processDeleteCategory);

export default router;