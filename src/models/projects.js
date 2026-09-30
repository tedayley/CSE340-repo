import db from './db.js';

const createProject = async (
    organization_id,
    title,
    description,
    location,
    date
) => {
    const query = `
        INSERT INTO service_project (organization_id, title, description, location, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result = await db.query(query, [
        organization_id,
        title,
        description,
        location,
        date
    ]);

    return result.rows[0];
};

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

const addVolunteer = async (project_id, user_id) => {
    const query = `
        INSERT INTO project_volunteer (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING;
    `;

    const result = await db.query(query, [project_id, user_id]);

    return result.rowCount > 0;
};

const removeVolunteer = async (project_id, user_id) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE project_id = $1 AND user_id = $2;
    `;

    const result = await db.query(query, [project_id, user_id]);

    return result.rowCount > 0;
};

const getVolunteerProjects = async (user_id) => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM project_volunteer pv
        JOIN service_project sp
            ON pv.project_id = sp.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY sp.date ASC;
    `;

    const result = await db.query(query, [user_id]);

    return result.rows;
};

const isUserVolunteering = async (project_id, user_id) => {
    const query = `
        SELECT 1
        FROM project_volunteer
        WHERE project_id = $1 AND user_id = $2;
    `;

    const result = await db.query(query, [project_id, user_id]);

    return result.rowCount > 0;
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

const deleteProject = async (project_id) => {
    const result = await db.query(
        "DELETE FROM service_project WHERE project_id = $1",
        [project_id]
    );

    if (result.rowCount === 0) {
        throw new Error("Project not found");
    }
};

export {
    createProject,
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    addVolunteer,
    removeVolunteer,
    getVolunteerProjects,
    isUserVolunteering,
    updateProject,
    deleteProject
};