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

const createOrganization = async (
    name,
    description,
    contact_email,
    logo_filename
) => {
    const query = `
        INSERT INTO organization (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const result = await db.query(query, [
        name,
        description,
        contact_email,
        logo_filename
    ]);

    return result.rows[0];
};

const updateOrganization = async (
    organization_id,
    name,
    description,
    contact_email,
    logo_filename
) => {
    const query = `
        UPDATE organization
        SET name = $1, description = $2, contact_email = $3, logo_filename = $4
        WHERE organization_id = $5
        RETURNING *;
    `;

    const result = await db.query(query, [
        name,
        description,
        contact_email,
        logo_filename,
        organization_id
    ]);

    if (result.rowCount === 0) {
        throw new Error("Organization not found");
    }

    return result.rows[0];
};

const deleteOrganization = async (organization_id) => {
    const result = await db.query(
        "DELETE FROM organization WHERE organization_id = $1",
        [organization_id]
    );

    if (result.rowCount === 0) {
        throw new Error("Organization not found");
    }
};

export {
    getAllOrganizations,
    getOrganizationDetails,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
};