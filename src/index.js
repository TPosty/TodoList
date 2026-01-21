import "./styles.css";
import Project from "./project.js";

const create_project_button = document.querySelector(".create_project_button");
const project_name_text = document.querySelector(".project_name_text");
const project_instance = new Project();

create_project_button.addEventListener("click", () => {
    const project_name = project_name_text.value;
    project_instance.create_project(project_name);
});
