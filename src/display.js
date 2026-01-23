const project_container = document.querySelector(".project_container");

export default class Display {
    constructor(handle_display_project_click) {
        this.local_key = "projects";
        this.handle_display_project_click = handle_display_project_click;
    }

    display_projects() {
        const projects = JSON.parse(localStorage.getItem(this.local_key));

        console.log(projects);

        project_container.innerHTML = "";

        for (let project of projects) {
            const project_button = document.createElement("button");
            console.log(project);
            project_button.textContent = project.name;
            project_button.classList.add("project_button");

            project_button.addEventListener("click", () => {
                this.handle_display_project_click(project);
            });

            project_container.appendChild(project_button);
        }
    }
}
