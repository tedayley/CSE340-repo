import db from "./db.js";
import bcrypt from "bcrypt";

/* ***************************
 * Create a new user
 * ************************** */
const createUser = async (name, email, passwordHash) => {
    const query = `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role_id
        )
        VALUES (
            $1,
            $2,
            $3,
            (
                SELECT role_id
                FROM role
                WHERE name = 'user'
            )
        )
        RETURNING user_id, name, email, role_id
    `;

    const queryParams = [
        name,
        email,
        passwordHash
    ];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};


/* ***************************
 * Find user by email
 * ************************** */
const findUserByEmail = async (email) => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            r.name AS role_name
        FROM users u
        JOIN role r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const queryParams = [email];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};


/* ***************************
 * Verify password
 * ************************** */
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};


/* ***************************
 * Authenticate user
 * ************************** */
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordMatch = await verifyPassword(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        return null;
    }

    delete user.password_hash;

    return user;
};


/* ***************************
 * Get all users with their roles
 * ************************** */
const getAllUsers = async () => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            r.name AS role_name
        FROM users u
        JOIN role r ON u.role_id = r.role_id
        ORDER BY u.name ASC
    `;

    const result = await db.query(query);

    return result.rows;
};


/* ***************************
 * Export functions
 * ************************** */
export {
    createUser,
    authenticateUser,
    findUserByEmail,
    getAllUsers,
};