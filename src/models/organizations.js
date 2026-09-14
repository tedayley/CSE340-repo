import db from "./db.js";

const getAllOrganizations = async () => {

    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getOrganizationDetails = async (id) => {

    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};


const getProjectsByOrganization = async (organization_id) => {

    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const result = await db.query(query, [organization_id]);

    return result.rows;
};

export { getAllOrganizations, getOrganizationDetails, getProjectsByOrganization };