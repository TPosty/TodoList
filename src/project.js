import Display from "./display";
import Todo from "./todo";

export default class Project {
    constructor() {
        this.project_id = crypto.randomUUID();
        this.todos = [];
        this.local_key = "projects";
        this.handle_display_project_click =
            this.handle_display_project_click.bind(this);
        this.display = new Display(this.handle_display_project_click);
        let projects = JSON.parse(localStorage.getItem(this.local_key));

        if (!projects) {
            projects = [
                {
                    name: "Default Project",
                    id: this.project_id,
                    todos: [],
                },
            ];

            localStorage.setItem(this.local_key, JSON.stringify(projects));
        }

        this.active_project = projects[0];
    }

    handle_display_project_click(project) {
        this.active_project = project;
        console.log(this.active_project);
    }

    create_project(project_name) {
        this.display.display_projects();
        const stored_projects = localStorage.getItem(this.local_key);
        const projects = stored_projects ? JSON.parse(stored_projects) : [];

        const default_project_exists = projects.some(
            (p_name) => p_name.name === project_name,
        );

        if (default_project_exists) return;

        projects.push({
            name: project_name,
            id: this.project_id,
            todos: [],
        });

        localStorage.setItem(this.local_key, JSON.stringify(projects));

        this.display.display_projects();
    }

    add_todo(name, id, description, due_date, priority, completed) {
        const new_todo = new Todo(
            name,
            id,
            description,
            due_date,
            priority,
            completed,
        );

        console.log(new_todo);

        const stored_projects = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        const array_index = stored_projects.findIndex(
            (obj) => obj.id == this.active_project.id,
        );

        stored_projects[array_index].todos.push(new_todo);

        localStorage.setItem(this.local_key, JSON.stringify(stored_projects));
    }
}
