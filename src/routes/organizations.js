import express from "express";

import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from "../controllers/organizations.js";

const router = express.Router();

router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);

export default router;