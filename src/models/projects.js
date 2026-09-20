import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        ORDER BY sp.date;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.date >= CURRENT_DATE
        ORDER BY sp.date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM service_project sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const updateProject = async (
    project_id,
    organization_id,
    title,
    description,
    location,
    date
) => {
    const query = `
        UPDATE service_project
        SET
            organization_id = $1,
            title = $2,
            description = $3,
            location = $4,
            date = $5
        WHERE project_id = $6
        RETURNING *;
    `;

    const result = await db.query(query, [
        organization_id,
        title,
        description,
        location,
        date,
        project_id
    ]);

    if (result.rowCount === 0) {
        throw new Error("Project not found");
    }

    return result.rows[0];
};

export {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    updateProject
};