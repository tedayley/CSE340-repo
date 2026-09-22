import {
    getAllOrganizations,
    getOrganizationDetails,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
} from "../models/organizations.js";

import { setFlash } from "../utils/flash.js";
import {
    normalizeOrganization,
    validateOrganization
} from "../utils/validation.js";

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

const showNewOrganizationForm = (req, res) => {
    res.render("new-organization", {
        title: "New Organization",
        organization: {}
    });
};

const processNewOrganizationForm = async (req, res) => {
    const organization = normalizeOrganization(req.body);
    const error = validateOrganization(organization);

    if (error) {
        return res.status(400).render("new-organization", {
            title: "New Organization",
            organization,
            error
        });
    }

    const createdOrganization = await createOrganization(
        organization.name,
        organization.description,
        organization.contact_email,
        organization.logo_filename
    );

    setFlash(req, "success", "Organization created successfully.");
    res.redirect(`/organization/${createdOrganization.organization_id}`);
};

const showEditOrganizationForm = async (req, res) => {
    const organization = await getOrganizationDetails(req.params.id);

    if (!organization) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    res.render("edit-organization", {
        title: `Edit ${organization.name}`,
        organization
    });
};

const processEditOrganizationForm = async (req, res) => {
    const organization = normalizeOrganization(req.body);
    const existingOrganization = await getOrganizationDetails(req.params.id);

    if (!existingOrganization) {
        return res.status(404).render("404", { title: "Page Not Found" });
    }

    const error = validateOrganization(organization);

    if (error) {
        return res.status(400).render("edit-organization", {
            title: `Edit ${existingOrganization.name}`,
            organization: {
                ...existingOrganization,
                ...organization
            },
            error
        });
    }

    await updateOrganization(
        req.params.id,
        organization.name,
        organization.description,
        organization.contact_email,
        organization.logo_filename
    );

    setFlash(req, "success", "Organization updated successfully.");
    res.redirect(`/organization/${req.params.id}`);
};

const processDeleteOrganization = async (req, res) => {
    await deleteOrganization(req.params.id);
    setFlash(req, "success", "Organization deleted successfully.");
    res.redirect("/");
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    processDeleteOrganization
};