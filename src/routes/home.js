import express from "express";

import { showDashboardPage, showHomePage } from "../controllers/home.js";
import { requireLogin } from "../controllers/users.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/dashboard", requireLogin, showDashboardPage);

export default router;