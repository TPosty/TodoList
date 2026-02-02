import Display from "./display";
import Todo from "./todo";
const filter_buttons = document.querySelectorAll(".filter_button");

export default class Project {
    constructor() {
        this.project_id = crypto.randomUUID();
        this.todos = [];
        this.local_key = "projects";
        this.handle_display_project_click =
            this.handle_display_project_click.bind(this);

        this.delete_project = this.delete_project.bind(this);
        this.switch_todo_completed_status =
            this.switch_todo_completed_status.bind(this);

        this.display = new Display(
            this.handle_display_project_click,
            this.delete_todo,
            this.delete_project,
            this.switch_todo_completed_status,
        );

        let projects = JSON.parse(localStorage.getItem(this.local_key));

        this.projects = projects;
        this.active_project = null;

        if (!projects) {
            projects = [];
            localStorage.setItem(this.local_key, JSON.stringify(projects));
        } else {
            this.active_project = projects[0];
        }

        if (this.active_project) {
            this.display.display_projects(this.projects, this.active_project);
        } else {
            this.display.display_empty_project_state();
        }
        if (this.active_project == null) {
            return;
        } else {
            this.display.display_project_todos(this.active_project.id);
        }

        filter_buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                filter_buttons.forEach((btn) => btn.classList.remove("active"));
                e.currentTarget.classList.add("active");
                if (button.dataset.filter == "az") {
                    this.filter_todos("AZ");
                    button.classList.add("active");
                } else if (button.dataset.filter == "za") {
                    this.filter_todos("ZA");
                } else {
                    return;
                }
            });
        });
    }

    switch_todo_completed_status = (id, type) => {
        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        const object_index = stored_projects.findIndex(
            (obj) => obj.id == this.active_project.id,
        );

        // Need to find the index of the changed todo (completed status) --> splice at that index --> add todo to the end of the array

        const todo_index = stored_projects[object_index].todos.findIndex(
            (todo) => todo.id == id,
        );

        // const completed_task = stored_projects[object_index].todos.splice(
        //     todo_index,
        //     1,
        // );

        // stored_projects[object_index].todos.push(completed_task);

        stored_projects[object_index].todos[todo_index].completed =
            !stored_projects[object_index].todos[todo_index].completed;

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));
        this.display.display_project_todos(this.active_project.id);
    };

    filter_todos = (filter_type) => {
        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        const current_project_id = this.active_project.id;

        const object_index = stored_projects.findIndex(
            (obj) => obj.id == current_project_id,
        );

        if (filter_type == "AZ") {
            stored_projects[object_index].todos = stored_projects[
                object_index
            ].todos.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter_type == "ZA") {
            stored_projects[object_index].todos = stored_projects[
                object_index
            ].todos
                .sort((a, b) => a.name.localeCompare(b.name))
                .reverse();
        }

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));
        this.display.display_project_todos(current_project_id);
    };

    handle_display_project_click = (project) => {
        const stored_projects = localStorage.getItem(this.local_key);
        const projects_local = stored_projects
            ? JSON.parse(stored_projects)
            : [];

        this.active_project = project;
        this.display.display_projects(this.projects, this.active_project);
        this.display.display_project_todos(this.active_project.id);
    };

    create_project(project_name) {
        console.log(project_name);
        const stored_projects = localStorage.getItem(this.local_key);
        const projects_local = stored_projects
            ? JSON.parse(stored_projects)
            : [];

        projects_local.push({
            name: project_name,
            id: this.project_id,
            todos: [],
        });
        localStorage.setItem(this.local_key, JSON.stringify(projects_local));
        // Sets the active_project to the most recently created project
        this.active_project = projects_local[projects_local.length - 1];

        this.display.display_projects(projects_local, this.active_project);
        this.projects = projects_local;
        this.display.display_project_todos(this.active_project.id);
    }

    delete_project = () => {
        const id = this.active_project.id;

        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        if (stored_projects.length <= 1) {
            console.log("Cannot delete since it's one left!");
            return;
        }

        const object_index = stored_projects.findIndex((obj) => obj.id == id);

        // Eventually will want to call a "are you sure you want to delete window"
        stored_projects.splice(object_index, 1);

        this.projects = stored_projects;

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));
        this.display.display_projects(stored_projects, this.active_project);
        this.display.display_project_todos(this.active_project.id);
    };

    add_todo(name, id, description, due_date, priority, completed) {
        const new_todo = new Todo(
            name,
            id,
            description,
            due_date,
            priority,
            completed,
        );

        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        const array_index = stored_projects.findIndex(
            (obj) => obj.id == this.active_project.id,
        );

        stored_projects[array_index].todos.push(new_todo);

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));

        this.display.display_project_todos(this.active_project.id);
    }

    delete_todo = (id, active_project_id) => {
        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        const object_index = stored_projects.findIndex(
            (obj) => obj.id == active_project_id,
        );

        const todo_index = stored_projects[object_index].todos.findIndex(
            (todo) => todo.id == id,
        );

        stored_projects[object_index].todos.splice(todo_index, 1);

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));
        this.display.display_project_todos(active_project_id);
    };
}
