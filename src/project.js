import Display from "./display";
import Todo from "./todo";

export default class Project {
    constructor() {
        this.project_id = crypto.randomUUID();
        this.todos = [];
        this.local_key = "projects";
        this.handle_display_project_click =
            this.handle_display_project_click.bind(this);

        this.display = new Display(
            this.handle_display_project_click,
            this.delete_todo,
        );

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

        this.projects = projects;
        this.active_project = projects[0];
        this.display.display_projects(this.projects, this.active_project);
        this.display.display_project_todos(this.active_project.id);
    }

    handle_display_project_click = (project) => {
        const stored_projects = localStorage.getItem(this.local_key);
        const projects_local = stored_projects
            ? JSON.parse(stored_projects)
            : [];

        this.active_project = project;
        // this.projects = projects_local;
        console.log("projects local");
        console.log(projects_local);
        console.log("this.projects");
        console.log(this.projects);
        this.display.display_projects(this.projects, this.active_project);
        this.display.display_project_todos(this.active_project.id);
    };

    create_project(project_name) {
        // this.display.display_projects(this.projects, this.active_project);
        const stored_projects = localStorage.getItem(this.local_key);
        const projects_local = stored_projects
            ? JSON.parse(stored_projects)
            : [];

        const default_project_exists = projects_local.some(
            (p_name) => p_name.name === project_name,
        );

        if (default_project_exists) return;
        projects_local.push({
            name: project_name,
            id: this.project_id,
            todos: [],
        });
        localStorage.setItem(this.local_key, JSON.stringify(projects_local));
        console.log(projects_local);
        this.display.display_projects(projects_local, this.active_project);
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
