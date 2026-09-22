const stringValue = (value) => typeof value === "string" ? value.trim() : "";

const validateCategory = (name) => {
    const value = stringValue(name);

    if (value.length < 3 || value.length > 100) {
        return "Category name must be between 3 and 100 characters.";
    }

    return null;
};

const validateOrganization = (data) => {
    const name = stringValue(data.name);
    const description = stringValue(data.description);
    const contactEmail = stringValue(data.contact_email);
    const logoFilename = stringValue(data.logo_filename);

    if (name.length < 3 || name.length > 150) {
        return "Organization name must be between 3 and 150 characters.";
    }

    if (description.length < 10) {
        return "Organization description must be at least 10 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
        return "Enter a valid contact email address.";
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(logoFilename)) {
        return "Logo filename may contain only letters, numbers, dots, underscores, and hyphens.";
    }

    return null;
};

const validateProject = (data, organizations) => {
    const organizationId = Number(data.organization_id);
    const title = stringValue(data.title);
    const description = stringValue(data.description);
    const location = stringValue(data.location);
    const projectDate = stringValue(data.date);

    if (!organizations.some((organization) => organization.organization_id === organizationId)) {
        return "Select a valid organization.";
    }

    if (title.length < 3 || title.length > 150) {
        return "Project title must be between 3 and 150 characters.";
    }

    if (description.length < 10) {
        return "Project description must be at least 10 characters.";
    }

    if (location.length < 2 || location.length > 255) {
        return "Location must be between 2 and 255 characters.";
    }

    const [year, month, day] = projectDate.split("-").map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    const hasValidDate = /^\d{4}-\d{2}-\d{2}$/.test(projectDate)
        && !Number.isNaN(parsedDate.getTime())
        && parsedDate.getUTCFullYear() === year
        && parsedDate.getUTCMonth() === month - 1
        && parsedDate.getUTCDate() === day;

    if (!hasValidDate) {
        return "Enter a valid project date.";
    }

    return null;
};

const normalizeOrganization = (data) => ({
    name: stringValue(data.name),
    description: stringValue(data.description),
    contact_email: stringValue(data.contact_email),
    logo_filename: stringValue(data.logo_filename)
});

const normalizeProject = (data) => ({
    organization_id: stringValue(data.organization_id),
    title: stringValue(data.title),
    description: stringValue(data.description),
    location: stringValue(data.location),
    date: stringValue(data.date)
});

export {
    normalizeOrganization,
    normalizeProject,
    stringValue,
    validateCategory,
    validateOrganization,
    validateProject
};