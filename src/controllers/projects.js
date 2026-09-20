import {
    getUpcomingProjects,
    getProjectDetails,
    updateProject
} from "../models/projects.js";

import {
    getCategoriesByProject
} from "../models/categories.js";

import {
    getAllOrganizations
} from "../models/organizations.js";

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

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    res.render("edit-project", {
        project,
        organizations
    });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const {
        organization_id,
        title,
        description,
        location,
        date
    } = req.body;

    await updateProject(
        projectId,
        organization_id,
        title,
        description,
        location,
        date
    );

    res.redirect(`/project/${projectId}`);
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showEditProjectForm,
    processEditProjectForm
};