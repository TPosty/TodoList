import Display from "./display";
const project_buttons = document.querySelectorAll(".project_button");

export default class Project {
    constructor(project_name) {
        this.project_name = project_name;
        this.project_id = crypto.randomUUID();
        this.todos = [];
        this.local_key = "projects";
        this.display = new Display(this.test_display_click);
        this.active_project = JSON.parse(
            localStorage.getItem(this.local_key),
        )[0];
    }

    test_display_click() {
        console.log(this.display.display_projects);
    }

    create_default_project() {
        const default_project_data = [
            {
                name: "Default Project",
                id: this.project_id,
                todos: [],
            },
        ];

        localStorage.setItem(
            this.local_key,
            JSON.stringify(default_project_data),
        );
    }

    add_user_created_project() {
        const local_json_string = JSON.parse(
            localStorage.getItem(this.local_key),
        );

        local_json_string.push({
            name: this.project_name,
            id: this.project_id,
            todos: [],
        });

        localStorage.setItem(this.local_key, JSON.stringify(local_json_string));

        this.display.display_projects();
    }

    add_todo() {
        this.todos.push({
            name: "testing",
            id: crypto.randomUUID(),
        });
    }
}
