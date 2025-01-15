import { Todo, Todos } from "./types.js"
import { getTodosLS, setTodosLS } from "./ls.js";

// Enums
enum modeEnum {UNKNOWN, ADD, UPDATE};

// Global Variables
let todos = getTodosLS();
let dialogMode = modeEnum.UNKNOWN;

// Main Window
const addTodoBtn = document.getElementById("add-todo-btn");
const updateTodoBtn = document.getElementById("update-todo-btn");
const clearTodoListBtn = document.getElementById("clear-todo-list-btn");

// ToDo Dialog
const todoDialog = document.getElementById("todo-dialog");
const todoDialogTextArea = document.getElementById("todo-dialog-textarea") as HTMLTextAreaElement;
const todoDialogOkBtn = document.getElementById("todo-dialog-ok-btn");
const todoDialogCancelBtn = document.getElementById("todo-dialog-cancel-btn");

// Main Window event listeners
if(addTodoBtn !== null)
    addTodoBtn.addEventListener('click', AddTodoBtnClicked);
else
    console.error("addTodoBtn===null");

if(updateTodoBtn !== null)
    updateTodoBtn.addEventListener('click', UpdateTodoBtnClicked);
else
    console.error("updateTodoBtn===null");
    
if(clearTodoListBtn !== null)
    clearTodoListBtn.addEventListener('click', clearTodos);
else
    console.error("clearTodoListBtn===null");

// Main Window event handlers

function AddTodoBtnClicked(e: Event) {
    dialogMode = modeEnum.ADD;
    showTodoDialog("");
}

function UpdateTodoBtnClicked(e: Event) {
    dialogMode = modeEnum.UPDATE;
    showTodoDialog("Current todo text");
}

function addTodo(text: string) {
    const todo = {
        id: todos.nextId++,
        text: todoDialogTextArea.value,
        done: false
    }
    todos.todos.push(todo);
    setTodosLS(todos);
}

function updateTodo(todo: Todo) {

}

function clearTodos() {
    todos = {
        nextId: 0,
        todos: []
    }
    setTodosLS(todos);
}

// ToDo Dialog
if(todoDialogOkBtn !== null)
    todoDialogOkBtn.addEventListener('click', todoDialogOkClicked);
else
    console.error("todoDialogOkBtn===null");

if(todoDialogCancelBtn !== null)
    todoDialogCancelBtn.addEventListener('click', todoDialogCancelClicked);
else
    console.error("todoDialogCancelBtn===null");
    

function showTodoDialog(todoText: string) {
    if(todoDialog !== null) {
        todoDialogTextArea.value = todoText;
        (todoDialog as HTMLDialogElement).showModal();
    }
}

function closeTodoDialog() {
    if(todoDialogTextArea !== null)
        (todoDialogTextArea as HTMLTextAreaElement).value = "";

    if(todoDialog !== null)
        (todoDialog as HTMLDialogElement).close();
}

function todoDialogOkClicked(e: MouseEvent) {
    if(todoDialogTextArea === null || (todoDialogTextArea as HTMLTextAreaElement).value === "") {
        return;
    }

    switch(dialogMode) {
        case modeEnum.ADD:
            addTodo(todoDialogTextArea.value);
            break;
        case modeEnum.UPDATE:
            break;
        case modeEnum.UNKNOWN:
            break;
    }

    e.preventDefault();
    closeTodoDialog();
}

function todoDialogCancelClicked(e: MouseEvent) {
    closeTodoDialog();
}

