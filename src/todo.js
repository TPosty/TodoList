export default class Todo {
    constructor(name, id, description, due_date, priority, completed) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
        this.completed = completed;
    }
}
