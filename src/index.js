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

(function () {
    const project_instance = new Project("Default Project");
    project_instance.create_default_project();
})();

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
    const project_instance = new Project(project_name);

    project_instance.add_user_created_project();
    toggle_create_popup();
});
