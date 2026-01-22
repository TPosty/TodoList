import "./styles.css";
import Project from "./project.js";

const create_project_button = document.querySelector(".create_project_button");
const project_name_text = document.querySelector(".project_name_text");

(function () {
    const project_instance = new Project("Default Project");
    project_instance.create_default_project();
})();

create_project_button.addEventListener("click", () => {
    const project_name = project_name_text.value;
    const project_instance = new Project(project_name);

    // const new_project_json = project_instance.create_project();

    // console.log(project_instance.add_todo());

    // localStorage.setItem(
    //     "projects",
    //     JSON.stringify([project_instance.create_default_project()]),
    // );

    project_instance.add_user_created_project();
});
