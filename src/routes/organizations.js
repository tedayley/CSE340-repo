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

import { requireRole } from "../controllers/users.js";

const router = express.Router();

router.get("/organizations", showOrganizationsPage);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get(
    "/new-organization",
    requireRole("admin"),
    showNewOrganizationForm
);

router.post(
    "/new-organization",
    requireRole("admin"),
    processNewOrganizationForm
);

router.get(
    "/edit-organization/:id",
    requireRole("admin"),
    showEditOrganizationForm
);

router.post(
    "/edit-organization/:id",
    requireRole("admin"),
    processEditOrganizationForm
);

router.post(
    "/delete-organization/:id",
    requireRole("admin"),
    processDeleteOrganization
);

export default router;