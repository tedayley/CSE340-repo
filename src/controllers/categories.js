import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategory,
    createCategory,
    updateCategory
} from "../models/categories.js";

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

    if (!name || name.trim().length < 3 || name.trim().length > 100) {
        return res.status(400).render("new-category", {
            title: "New Category",
            error: "Category name must be between 3 and 100 characters.",
            name
        });
    }

    await createCategory(name.trim());

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

    if (!name || name.trim().length < 3 || name.trim().length > 100) {
        const category = await getCategoryDetails(id);

        return res.status(400).render("edit-category", {
            title: `Edit ${category.name}`,
            category: {
                ...category,
                name
            },
            error: "Category name must be between 3 and 100 characters."
        });
    }

    await updateCategory(id, name.trim());

    res.redirect(`/category/${id}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};