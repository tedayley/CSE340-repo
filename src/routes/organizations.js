import express from "express";

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    processDeleteOrganization
} from "../controllers/organizations.js";

const router = express.Router();

router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);
router.get("/new-organization", showNewOrganizationForm);
router.post("/new-organization", processNewOrganizationForm);
router.get("/edit-organization/:id", showEditOrganizationForm);
router.post("/edit-organization/:id", processEditOrganizationForm);
router.post("/delete-organization/:id", processDeleteOrganization);

export default router;