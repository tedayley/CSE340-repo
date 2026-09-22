import db from "./db.js";

const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};


const getCategoryDetails = async (id) => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};


const getCategoriesByProject = async (project_id) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(query, [project_id]);

    return result.rows;
};


const getProjectsByCategory = async (category_id) => {

    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_project sp
        JOIN project_category pc
            ON sp.project_id = pc.project_id
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY sp.date;
    `;

    const result = await db.query(query, [category_id]);

    return result.rows;
};

const createCategory = async (name) => {

    const query = `
        INSERT INTO category (name)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await db.query(query, [name]);

    return result.rows[0];
};


const updateCategory = async (category_id, name) => {

    const query = `
        UPDATE category
        SET name = $1
        WHERE category_id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [name, category_id]);

    if (result.rowCount === 0) {
        throw new Error("Category not found");
    }

    return result.rows[0];
};

const deleteCategory = async (category_id) => {
    const result = await db.query(
        "DELETE FROM category WHERE category_id = $1",
        [category_id]
    );

    if (result.rowCount === 0) {
        throw new Error("Category not found");
    }
};

const updateProjectCategories = async (project_id, category_ids) => {
    const client = await db.connect();

    try {
        await client.query("BEGIN");
        await client.query(
            "DELETE FROM project_category WHERE project_id = $1",
            [project_id]
        );

        if (category_ids.length > 0) {
            await client.query(
                `
                    INSERT INTO project_category (project_id, category_id)
                    SELECT $1, category_id
                    FROM category
                    WHERE category_id = ANY($2::int[]);
                `,
                [project_id, category_ids]
            );
        }

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};


export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProject,
    getProjectsByCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    updateProjectCategories
};