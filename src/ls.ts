import { Todo, Todos } from "./types.js"

const defaultTodos = {
    nextId: 0,
    todos: []
}

const TODO_NAME = "Todo-List-Typescript";

export function getTodosLS(): Todos {
    try {
        const lsTodos = localStorage.getItem(TODO_NAME);
        return lsTodos ? JSON.parse(lsTodos) : defaultTodos;
    } catch(error) {
        console.error(error);
        return defaultTodos;
    }
}

export function setTodosLS(todosObj: Todos): void {
    try {
        localStorage.setItem(TODO_NAME, JSON.stringify(todosObj));
    } catch(error) {
        console.error(error);
    }
}