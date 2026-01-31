const project_container = document.querySelector(".project_container");
const todo_container = document.querySelector(".todo_container");
const current_project_display_text = document.querySelector(".current_project");
const delete_project_button = document.querySelector(".delete_project_button");
const total_todo_count = document.querySelector(".total_todo_count");

export default class Display {
    constructor(
        handle_display_project_click,
        handle_todo_delete,
        delete_project,
        switch_todo_completed_status,
    ) {
        this.local_key = "projects";
        this.handle_display_project_click = handle_display_project_click;
        this.handle_todo_delete = handle_todo_delete;
        this.delete_project = delete_project;
        this.switch_todo_completed_status = switch_todo_completed_status;

        delete_project_button.addEventListener("click", () => {
            this.delete_project();
        });
    }

    display_projects(projects, active_project) {
        project_container.innerHTML = "";

        for (let project of projects) {
            const project_button = document.createElement("button");
            project_button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z"/></svg> <p>${project.name}</p>
            `;
            project_button.classList.add("project_button");

            if (active_project && project === active_project) {
                project_button.classList.add("active");
                current_project_display_text.textContent = active_project.name;
            } else {
                project_button.classList.add("inactive");
            }

            project_button.addEventListener("click", () => {
                this.handle_display_project_click(project);
            });

            project_container.appendChild(project_button);
        }
    }

    display_empty_project_state() {
        const no_projects = document.createElement("p");
        no_projects.innerHTML = `Please add a project above!`;
        project_container.appendChild(no_projects);
    }

    display_project_todos(project_id) {
        const projects = JSON.parse(localStorage.getItem(this.local_key));

        const current_project = projects.find((item) => item.id === project_id);

        todo_container.innerHTML = ``;

        if (current_project.todos.length <= 0) {
            const no_todo_text = document.createElement("p");
            no_todo_text.textContent =
                "No tasks found! Click the add button to start adding tasks.";
            no_todo_text.classList.add("no_todo_text");
            todo_container.appendChild(no_todo_text);
            return;
        }

        const completed_task_int = current_project.todos.filter(
            (todo) => todo.completed === true,
        ).length;

        total_todo_count.textContent = `Total Tasks: ${current_project.todos.length} | Total Completed Tasks: ${completed_task_int}`;

        for (let todo of current_project.todos) {
            const todo_display = document.createElement("div");
            todo_display.classList.add("todo");
            todo_container.appendChild(todo_display);

            const todo_priority_color_indicator = document.createElement("div");
            todo_priority_color_indicator.classList.add(
                "todo_priority_color_indicator",
            );

            if (todo.priority == "low_priority") {
                todo_priority_color_indicator.classList.add("low_priority");
            } else if (todo.priority == "medium_priority") {
                todo_priority_color_indicator.classList.add("medium_priority");
            } else {
                todo_priority_color_indicator.classList.add("high_priority");
            }

            todo_display.appendChild(todo_priority_color_indicator);

            const todo_checkbox = document.createElement("div");
            todo_checkbox.classList.add("todo_checkbox");
            todo_display.appendChild(todo_checkbox);

            const custom_checkbox = document.createElement("label");
            custom_checkbox.classList.add("custom-checkbox");
            todo_checkbox.appendChild(custom_checkbox);

            const checkbox_input = document.createElement("input");
            checkbox_input.type = "checkbox";
            checkbox_input.classList.add("checkbox_input");
            custom_checkbox.appendChild(checkbox_input);

            const checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");
            custom_checkbox.appendChild(checkmark);

            const todo_content = document.createElement("div");
            todo_content.classList.add("todo_content");
            todo_display.appendChild(todo_content);

            const todo_content_header = document.createElement("div");
            todo_content_header.classList.add("todo_content_header");
            todo_content.appendChild(todo_content_header);

            const todo_title = document.createElement("h3");
            todo_title.classList.add("todo_title");
            todo_title.textContent = todo.name;
            todo_content_header.appendChild(todo_title);

            const todo_due_date = document.createElement("p");
            todo_due_date.classList.add("todo_due_date");
            todo_due_date.textContent = `Due date: ${todo.due_date}`;
            todo_content_header.appendChild(todo_due_date);

            const todo_content_description = document.createElement("div");
            todo_content_description.classList.add("todo_content_description");
            todo_content_description.textContent = todo.description;
            todo_content.appendChild(todo_content_description);

            const todo_description = document.createElement("p");
            todo_content_description.appendChild(todo_description);

            const todo_delete_button = document.createElement("button");
            todo_delete_button.classList.add("todo_delete_button");
            todo_delete_button.innerHTML = `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                >
                    <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path
                        fill="currentColor"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                    />
                </svg>
            `;

            // CHECKBOX INPUTS
            // This is where everything that goes into displaying the checkbox input will go
            checkbox_input.addEventListener("click", () => {
                if (checkbox_input.checked) {
                    todo_title.style.textDecoration = "line-through";
                    todo_title.style.color = "#4b5563";
                    todo_content_description.style.textDecoration =
                        "line-through";
                    todo_content_description.style.color = "#4b5563";
                    todo_due_date.style.textDecoration = "line-through";
                    todo_due_date.style.color = "#4b5563";
                    this.switch_todo_completed_status(
                        todo.id,
                        checkbox_input.checked,
                    );
                } else {
                    todo_title.style.textDecoration = "none";
                    todo_title.style.color = "#111";
                    todo_content_description.style.textDecoration = "none";
                    todo_content_description.style.color = "#111";
                    todo_due_date.style.textDecoration = "none";
                    todo_due_date.style.color = "#111";
                    this.switch_todo_completed_status(
                        todo.id,
                        checkbox_input.checked,
                    );
                }
            });

            // Checks to see if the todo is completed, if completed will visually represent the completed todo
            if (todo.completed == true) {
                todo_title.style.textDecoration = "line-through";
                todo_title.style.color = "#4b5563";
                todo_content_description.style.textDecoration = "line-through";
                todo_content_description.style.color = "#4b5563";
                todo_due_date.style.textDecoration = "line-through";
                todo_due_date.style.color = "#4b5563";
                checkbox_input.checked = true;
            } else {
                todo_title.style.textDecoration = "none";
                todo_title.style.color = "#111";
                todo_content_description.style.textDecoration = "none";
                todo_content_description.style.color = "#111";
                todo_due_date.style.textDecoration = "none";
                todo_due_date.style.color = "#111";
            }

            // Todo delete button
            todo_delete_button.addEventListener("click", () => {
                todo_display.classList.add("deleting");

                setTimeout(() => {
                    todo_display.remove();
                    this.handle_todo_delete(todo.id, project_id);
                }, 250);
            });

            todo_display.appendChild(todo_delete_button);
        }
    }
}
