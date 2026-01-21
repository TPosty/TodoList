const project_container = document.querySelector(".project_container");

export default class Project {
    // constructor(project_name) {
    //     this.project_name = project_name;
    // }

    create_project(project_name) {
        const project_button = document.createElement("button");
        project_button.textContent = project_name;
        project_button.classList.add("project_button");

        project_container.appendChild(project_button);
    }
}
