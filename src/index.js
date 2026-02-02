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
const add_todo_popup = document.querySelector(".add_todo_popup");
const close_popup_btn_task = document.querySelector(".close_popup_btn_task");
const add_task_button = document.querySelector(".add_task_button");

const project_instance = new Project();

const reset_field_values = () => {
    task_name.value = "";
    task_desc.value = "";
    task_due_date.value = "";
    task_priority.value = "";
};

const toggle_create_project_popup = () => {
    create_project_modal.classList.toggle("display_flex");
    modal_background.classList.toggle("display_flex");
    project_name_text.value = "";
};

open_project_create_popup.addEventListener("click", () => {
    toggle_create_project_popup();
});

close_popup_btn.addEventListener("click", () => {
    toggle_create_project_popup();
});

const toggle_create_task_popup = () => {
    add_todo_popup.classList.toggle("display_flex");
    modal_background.classList.toggle("display_flex");
};

add_todo.addEventListener("click", () => {
    toggle_create_task_popup();
});

close_popup_btn_task.addEventListener("click", () => {
    toggle_create_task_popup();
});

create_project_button.addEventListener("click", () => {
    const project_name = project_name_text.value;

    if (!project_name) {
        project_name_text.classList.add("input_error");
        return;
    } else {
        project_name_text.classList.remove("input_error");
    }

    project_instance.create_project(project_name);
    toggle_create_project_popup();
});

add_task_button.addEventListener("click", () => {
    const input_errors = {
        name: false,
        due_date: false,
        priority: false,
    };

    if (!task_name.value || task_name.value.length <= 1) {
        input_errors.name = true;
        task_name.classList.add("input_error");
    } else {
        task_name.classList.remove("input_error");
    }

    if (!task_due_date.value) {
        input_errors.due_date = true;
        task_due_date.classList.add("input_error");
    } else {
        task_due_date.classList.remove("input_error");
    }

    console.log(task_priority.value);

    if (!task_priority.value) {
        input_errors.priority = true;
        task_priority.classList.add("input_error");
    } else {
        task_priority.classList.remove("input_error");
    }

    if (input_errors.name || input_errors.due_date || input_errors.priority) {
        return;
    }

    try {
        project_instance.add_todo(
            task_name.value,
            crypto.randomUUID(),
            task_desc.value,
            task_due_date.value,
            task_priority.value,
            false,
        );

        reset_field_values();
        toggle_create_task_popup();
    } catch (err) {
        console.log(err);
    }
});

document.addEventListener("keydown", (e) => {
    const tag = e.target.tagName;

    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) {
        return;
    }
    if (e.key == "a") {
        toggle_create_task_popup();
    } else if (e.key == "p") {
        toggle_create_project_popup();
    }
});
