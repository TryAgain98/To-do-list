import { Task } from "../types/types"

const TASK_KEY = "tasks"


export const setTasksInLocalStorage = (tasks: Task[]) => {
    let tasksJson = JSON.stringify(tasks);
    localStorage.setItem(TASK_KEY, tasksJson)
}

export const getTasks = () => {
    let tasks = localStorage.getItem(TASK_KEY)
    if (!!tasks) {
        return JSON.parse(tasks)
    }
    return []
}

export const clearTasks = () => {
    localStorage.removeItem(TASK_KEY)
}