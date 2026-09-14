import express from "express";

import {
    showCategoriesPage,
    showCategoryDetailsPage
} from "../controllers/categories.js";

const router = express.Router();

router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

export default router;