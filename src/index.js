import "./styles.css";
import Project from "./project.js";

const create_project_button = document.querySelector(".create_project_button");
const project_name_text = document.querySelector(".project_name_text");
const open_project_create_popup = document.querySelector(
    ".open_project_create_popup",
);
const create_project_modal = document.querySelector(".create_project_modal");
const modal_background = document.querySelector(".modal_background");
const close_popup_btn = document.querySelector(".close_popup_btn");
const add_todo = document.querySelector(".add_todo");

// Create task input values
const task_name = document.querySelector(".task_name");
const task_desc = document.querySelector(".task_desc");
const task_due_date = document.querySelector(".task_due_date");
const task_priority = document.querySelector(".task_priority");

const project_instance = new Project();

(function () {
    project_instance.create_project("Default Project");
})();

add_todo.addEventListener("click", () => {
    project_instance.add_todo(
        task_name.value,
        crypto.randomUUID(),
        task_desc.value,
        task_due_date.value,
        task_priority.value,
        false,
    );
});

const toggle_create_popup = () => {
    create_project_modal.classList.toggle("display_flex");
    modal_background.classList.toggle("display_flex");
    project_name_text.value = "";
};

open_project_create_popup.addEventListener("click", () => {
    toggle_create_popup();
});

close_popup_btn.addEventListener("click", () => {
    toggle_create_popup();
});

create_project_button.addEventListener("click", () => {
    const project_name = project_name_text.value;
    project_instance.create_project(project_name);
    toggle_create_popup();
});
