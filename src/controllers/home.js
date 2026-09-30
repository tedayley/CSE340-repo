import { getVolunteerProjects } from "../models/projects.js";

const showHomePage = (req, res) => {
    const title = "Home";

    res.render("home", { title });
};

const showDashboardPage = async (req, res) => {
    const projects = await getVolunteerProjects(req.session.user.user_id);

    res.render("dashboard", {
        title: "Dashboard",
        projects
    });
};

export { showHomePage, showDashboardPage };