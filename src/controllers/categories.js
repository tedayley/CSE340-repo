import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "../models/categories.js";

import { setFlash } from "../utils/flash.js";
import { validateCategory } from "../utils/validation.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = "Service Project Categories";

    res.render("categories", { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryDetails(id);

    if (!category) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const projects = await getProjectsByCategory(id);

    const title = category.name;

    res.render("category", {
        title,
        category,
        projects
    });
};

const showNewCategoryForm = (req, res) => {
    const title = "New Category";

    res.render("new-category", { title });
};


const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;
    const error = validateCategory(name);

    if (error) {
        return res.status(400).render("new-category", {
            title: "New Category",
            error,
            name
        });
    }

    await createCategory(name.trim());
    setFlash(req, "success", "Category created successfully.");

    res.redirect("/categories");
};


const showEditCategoryForm = async (req, res) => {
    const id = req.params.id;

    const category = await getCategoryDetails(id);

    if (!category) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const title = `Edit ${category.name}`;

    res.render("edit-category", {
        title,
        category
    });
};


const processEditCategoryForm = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const category = await getCategoryDetails(id);

    if (!category) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const error = validateCategory(name);

    if (error) {
        return res.status(400).render("edit-category", {
            title: "Edit Category",
            category: {
                ...category,
                name
            },
            error
        });
    }

    await updateCategory(id, name.trim());
    setFlash(req, "success", "Category updated successfully.");

    res.redirect(`/category/${id}`);
};

const processDeleteCategory = async (req, res) => {
    await deleteCategory(req.params.id);
    setFlash(req, "success", "Category deleted successfully.");
    res.redirect("/");
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    processDeleteCategory
};