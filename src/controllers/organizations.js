import {
    getAllOrganizations,
    getOrganizationDetails,
    getProjectsByOrganization
} from "../models/organizations.js";

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = "Organizations";

    res.render("organizations", { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const id = req.params.id;

    const organization = await getOrganizationDetails(id);

    if (!organization) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const projects = await getProjectsByOrganization(id);

    const title = organization.name;

    res.render("organization", {
        title,
        organization,
        projects
    });
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};