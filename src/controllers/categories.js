import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategory
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

export {
    showCategoriesPage,
    showCategoryDetailsPage
};