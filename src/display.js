const project_container = document.querySelector(".project_container");

export default class Display {
    constructor(on_project_select) {
        this.local_key = "projects";
        this.active_project = JSON.parse(
            localStorage.getItem(this.local_key),
        )[0];
        this.on_project_select = on_project_select;
    }

    display_projects() {
        const projects = JSON.parse(localStorage.getItem(this.local_key));

        project_container.innerHTML = "";

        for (let project of projects) {
            const project_button = document.createElement("button");
            project_button.textContent = project.name;
            project_button.classList.add("project_button");

            project_button.addEventListener("click", () => {
                this.on_project_select(project);
            });

            project_container.appendChild(project_button);
        }
    }

    handle_button_click(project) {
        this.active_project = project.id;
        console.log(this.active_project);
    }
}
