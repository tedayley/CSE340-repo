import {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    deleteProject
} from "../models/projects.js";

import {
    getAllCategories,
    getCategoriesByProject,
    updateProjectCategories
} from "../models/categories.js";

import {
    getAllOrganizations
} from "../models/organizations.js";

import { setFlash } from "../utils/flash.js";
import {
    normalizeProject,
    validateProject
} from "../utils/validation.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = "Upcoming Service Projects";

    res.render("projects", { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;

    const project = await getProjectDetails(id);

    if (!project) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const categories = await getCategoriesByProject(id);

    const title = project.title;

    res.render("project", {
        title,
        project,
        categories
    });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render("new-project", {
        title: "New Service Project",
        project: {},
        organizations
    });
};

const processNewProjectForm = async (req, res) => {
    const project = normalizeProject(req.body);
    const organizations = await getAllOrganizations();
    const error = validateProject(project, organizations);

    if (error) {
        return res.status(400).render("new-project", {
            title: "New Service Project",
            project,
            organizations,
            error
        });
    }

    const createdProject = await createProject(
        Number(project.organization_id),
        project.title,
        project.description,
        project.location,
        project.date
    );

    setFlash(req, "success", "Project created successfully.");
    res.redirect(`/project/${createdProject.project_id}`);
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    if (!project) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    res.render("edit-project", {
        project,
        organizations
    });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const project = normalizeProject(req.body);
    const organizations = await getAllOrganizations();
    const existingProject = await getProjectDetails(projectId);

    if (!existingProject) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const error = validateProject(project, organizations);

    if (error) {
        return res.status(400).render("edit-project", {
            title: "Edit Service Project",
            project: { ...existingProject, ...project },
            organizations,
            error
        });
    }

    await updateProject(
        projectId,
        Number(project.organization_id),
        project.title,
        project.description,
        project.location,
        project.date
    );

    setFlash(req, "success", "Project updated successfully.");
    res.redirect(`/project/${projectId}`);
};

const showProjectCategoriesForm = async (req, res) => {
    const project = await getProjectDetails(req.params.id);

    if (!project) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const categories = await getAllCategories();
    const selectedCategories = await getCategoriesByProject(req.params.id);

    res.render("edit-project-categories", {
        title: `Update Categories for ${project.title}`,
        project,
        categories,
        selectedCategoryIds: selectedCategories.map((category) => category.category_id)
    });
};

const processProjectCategoriesForm = async (req, res) => {
    const project = await getProjectDetails(req.params.id);

    if (!project) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const submittedIds = Array.isArray(req.body.category_ids)
        ? req.body.category_ids
        : req.body.category_ids ? [req.body.category_ids] : [];
    const categoryIds = submittedIds
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0);

    await updateProjectCategories(req.params.id, [...new Set(categoryIds)]);
    setFlash(req, "success", "Project categories updated successfully.");
    res.redirect(`/project/${req.params.id}`);
};

const processDeleteProject = async (req, res) => {
    await deleteProject(req.params.id);
    setFlash(req, "success", "Project deleted successfully.");
    res.redirect("/");
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    showProjectCategoriesForm,
    processProjectCategoriesForm,
    processDeleteProject
};