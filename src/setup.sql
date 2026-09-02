-- ============================================
-- ORGANIZATIONS
-- ============================================

DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;


CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'BrightFuture Builders creates sustainable community infrastructure and works to improve neighborhoods through environmentally responsible construction projects.',
    'info@brightfuturebuilders.org',
    'community.svg'
),
(
    'GreenHarvest Growers',
    'GreenHarvest Growers promotes urban farming, local food production, and sustainable food systems within the community.',
    'contact@greenharvest.org',
    'education.svg'
),
(
    'UnityServe Volunteers',
    'UnityServe Volunteers coordinates volunteers and connects them with local charities and community service opportunities.',
    'hello@unityserve.org',
    'environment.svg'
);


-- ============================================
-- SERVICE PROJECTS
-- ============================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);


-- ============================================
-- BRIGHTFUTURE BUILDERS PROJECTS
-- ============================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES
(
    1,
    'Community Garden Construction',
    'Help build raised garden beds and prepare a community garden for local residents.',
    'Riverside Community Center',
    '2026-09-12'
),
(
    1,
    'Neighborhood Park Renovation',
    'Assist with repairing benches, planting trees, and improving walking paths in a neighborhood park.',
    'Oakwood Park',
    '2026-09-19'
),
(
    1,
    'Habitat Restoration Day',
    'Help restore a local natural area by removing invasive plants and planting native vegetation.',
    'Greenway Nature Reserve',
    '2026-10-03'
),
(
    1,
    'Community Center Cleanup',
    'Volunteer to clean, repair, and improve facilities at a local community center.',
    'Eastside Community Center',
    '2026-10-10'
),
(
    1,
    'Sustainable Housing Workshop',
    'Assist with a workshop teaching residents about sustainable building and energy-efficient home improvements.',
    'BrightFuture Workshop Center',
    '2026-10-24'
);


-- ============================================
-- GREENHARVEST GROWERS PROJECTS
-- ============================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES
(
    2,
    'Urban Garden Planting',
    'Help plant seasonal vegetables and maintain garden beds at a local urban farm.',
    'Downtown Urban Farm',
    '2026-09-13'
),
(
    2,
    'Community Harvest',
    'Assist with harvesting fresh produce that will be distributed to local families.',
    'GreenHarvest Community Farm',
    '2026-09-26'
),
(
    2,
    'Food Sustainability Workshop',
    'Help prepare and organize a workshop focused on sustainable food production and gardening.',
    'Central Library',
    '2026-10-04'
),
(
    2,
    'Seedling Preparation Day',
    'Prepare seedlings and garden supplies for upcoming community growing projects.',
    'GreenHarvest Greenhouse',
    '2026-10-17'
),
(
    2,
    'Neighborhood Compost Project',
    'Help establish a neighborhood composting program and teach residents how to participate.',
    'Maple Street Community Garden',
    '2026-10-31'
);


-- ============================================
-- UNITYSERVE VOLUNTEERS PROJECTS
-- ============================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES
(
    3,
    'Food Bank Volunteer Day',
    'Sort donated food and help prepare food boxes for families in need.',
    'Community Food Bank',
    '2026-09-14'
),
(
    3,
    'Neighborhood Cleanup',
    'Join volunteers in removing litter and improving public spaces throughout the neighborhood.',
    'Westside Neighborhood',
    '2026-09-27'
),
(
    3,
    'Senior Center Assistance',
    'Help organize activities and provide assistance to residents at a local senior center.',
    'Sunrise Senior Center',
    '2026-10-11'
),
(
    3,
    'Charity Donation Drive',
    'Collect, sort, and organize donated clothing and household items for local charities.',
    'UnityServe Volunteer Center',
    '2026-10-18'
),
(
    3,
    'Holiday Outreach Preparation',
    'Help prepare supplies and organize volunteers for upcoming holiday community outreach programs.',
    'UnityServe Community Hall',
    '2026-11-07'
);


-- ============================================
-- VERIFICATION
-- ============================================

SELECT * FROM organization;

SELECT * FROM service_project;

SELECT
    sp.project_id,
    sp.title,
    o.name AS organization_name,
    sp.location,
    sp.date
FROM service_project sp
JOIN organization o
    ON sp.organization_id = o.organization_id
ORDER BY sp.date;