-- CREATE TABLE person (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR (80) UNIQUE NOT NULL,
--     password VARCHAR (1000) NOT NULL
-- );

-- Supervisors are top-level users who monitor managers
-- and the feedback they give to their employees over time.
-- Has many managers
CREATE TABLE supervisor (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR (255) UNIQUE NOT NULL,
  username VARCHAR (80) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  email_address VARCHAR (255)
);

-- Managers are primary users who are responsible for
-- generating feedback for a given group of employees.
-- Has one supervisor. Has many employees.
CREATE TABLE manager (
  id SERIAL PRIMARY KEY,
  supervisor_ref INT NOT NULL REFERENCES "supervisor",
  employee_id VARCHAR (255) UNIQUE NOT NULL,
  username VARCHAR (80) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  email_address VARCHAR (255)
);

-- Employees are non-users for whom feedback is created.
-- Has one manager.
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  manager_ref INT NOT NULL REFERENCES "manager",
  employee_id VARCHAR (255) UNIQUE NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  image_path VARCHAR (255)
);

-- Feedback entries created by one manager for one employee
-- includes information about the feedback itself, the date it was created,
-- an optional path for an image related to the feedback, an optional follow up date,
-- and the date of the most recent edit to this feedback, if any
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  manager_ref INT NOT NULL REFERENCES "manager",
  employee_ref INT NOT NULL REFERENCES "employee",
  date_created DATETIME NOT NULL DEFAULT CURRENT_DATE,
  quality VARCHAR (50) NOT NULL,
  task_related BOOLEAN DEFAULT false,
  culture_releated BOOLEAN DEFAULT false,
  details VARCHAR (1000) NOT NULL,
  image_path VARCHAR (255),
  follow_up_date DATETIME,
  date_edited DATETIME,
);