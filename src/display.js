const project_container = document.querySelector(".project_container");
const todo_container = document.querySelector(".todo_container");
const current_project_display_text = document.querySelector(".current_project");
const delete_project_button = document.querySelector(".delete_project_button");

export default class Display {
    constructor(
        handle_display_project_click,
        handle_todo_delete,
        delete_project,
    ) {
        this.local_key = "projects";
        this.handle_display_project_click = handle_display_project_click;
        this.handle_todo_delete = handle_todo_delete;
        this.delete_project = delete_project;

        delete_project_button.addEventListener("click", () => {
            this.delete_project();
        });
    }

    display_projects(projects, active_project) {
        project_container.innerHTML = "";

        console.log(projects);

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
