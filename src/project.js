const project_container = document.querySelector(".project_container");

export default class Project {
    constructor(project_name) {
        this.project_name = project_name;
        this.project_id = crypto.randomUUID();
        this.todos = [];
    }

    create_project() {
        const project_button = document.createElement("button");
        project_button.textContent = this.project_name;
        project_button.classList.add("project_button");

        // Should the project class really be updating the display? Probaby not...
        project_container.appendChild(project_button);

        return {
            name: this.project_name,
            id: this.project_id,
            todos: this.todos,
        };
    }

    add_todo() {
        this.todos.push({
            name: "testing",
            id: crypto.randomUUID(),
        });
    }
}
