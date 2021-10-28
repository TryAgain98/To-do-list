import React, { useState, useEffect } from "react"
import { Row, Col } from "reactstrap"
import { v4 as uuidv4 } from 'uuid';

import { Task } from "../../types/types"

import TaskForm from "./TaskForm"
import ToDoList from "./ToDoList"

import { setTasksInLocalStorage, getTasks } from "../../services/taskLocalStorage"

const initTask: Task = {
    title: '',
    startDate: new Date(),
    description: '',
    piority: { value: 'normal', label: 'Normal' }
}
const TaskContainer = () => {
    const [search, setSearch] = useState<string>('')
    const [taskList, setTaskList] = useState<Task[]>([])

    const addTask = (newTask: Task) => {
        const id = uuidv4()
        var newTasks = [...taskList, { ...newTask, id: id, isOpenToggle: false, isChecked: false }]
        setTasksInLocalStorage(newTasks)
        setTaskList([...newTasks])
    }

    useEffect(() => {
        let tasksLocalStorage = formatDate(getTasks())
        if (!!tasksLocalStorage) {
            setTaskList([...tasksLocalStorage])
        }
    }, [])

    const formatDate = (tasks: Task[]) => {
        for (let task of tasks) {
            task.startDate = new Date(task.startDate)
        }
        return tasks
    }


    return (
        <div className="task-container">
            <Row className="row-format">
                <Col md={6} xs={12} className="task-form-container">
                    <TaskForm task={initTask} onSave={addTask} />
                </Col>
                <Col md={6} xs={12} className="to-do-container">
                    <ToDoList search={search} setSearch={setSearch} taskList={taskList} setTaskList={setTaskList} />
                </Col>
            </Row>
        </div>
    )
}


export default TaskContainer