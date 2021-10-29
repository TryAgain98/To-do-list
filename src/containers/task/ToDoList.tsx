import React, { FC, useEffect, useCallback } from "react"
import { Input, Label} from "reactstrap"
import { Collapse } from 'reactstrap';

import { Task } from "../../types/types"
import TaskForm from "./TaskForm"
import { getTasks, setTasksInLocalStorage } from "../../services/taskLocalStorage"

interface Props {
    search: string,
    setSearch: (search: string) => void
    taskList: Task[]
    setTaskList: (tasks: Task[]) => void
}

const ToDoList: FC<Props> = ({ search, setSearch, taskList, setTaskList }) => {

    const onChangeTaskToggle = (task: Task) => {
        var index = taskList.findIndex((t) => t.id === task.id)
        if (index > -1) {
            setTaskList([
                ...taskList.slice(0, index),
                { ...taskList[index], isOpenToggle: !taskList[index].isOpenToggle },
                ...taskList.slice(index + 1)
            ])
        }
    }

    const updateTask = (task: Task) => {
        var index = taskList.findIndex((t) => t.id === task.id)
        if (index > -1) {
            const newTasks = [
                ...taskList.slice(0, index),
                { ...task },
                ...taskList.slice(index + 1)
            ]
            setTaskList([...newTasks])
            setTasksInLocalStorage(newTasks)
        }
    }

    const deleteTask = (task: Task) => {
        var index = taskList.findIndex((t) => t.id === task.id)
        if (index > -1) {
            const newTasks = [
                ...taskList.slice(0, index),
                ...taskList.slice(index + 1)
            ]
            setTaskList([
                ...newTasks
            ])
            setTasksInLocalStorage(newTasks)
        }
    }

    const deleteTasks = () => {
        const newTasks = taskList.filter((task) => !task.isChecked)
        setTaskList([...newTasks])
        setTasksInLocalStorage(newTasks)
    }

    const onChangeTaskCheck = (task: Task, checked: boolean) => {
        var index = taskList.findIndex((t) => t.id === task.id)
        if (index > -1) {
            setTaskList([
                ...taskList.slice(0, index),
                { ...taskList[index], isChecked: checked },
                ...taskList.slice(index + 1)
            ])
        }
    }

    const filterTasks = useCallback(() => {
        let tasksLocalStorage = formatDate(getTasks()) 
        let newtaskList = tasksLocalStorage.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setTaskList([...newtaskList])
    }, [search])

    const formatDate = (tasks: Task[]) => {
        for(let task of tasks) {
            task.startDate = new Date(task.startDate)
        }
        return tasks
    }

    useEffect(() => {
        filterTasks()
    }, [search])

    const showBulkAction = () => {
        var index = taskList.findIndex((task) => task.isChecked)
        if (index > -1) {
            return true
        }
        return false
    }

    return (
        <div>
            <Label className="label-task">To Do List</Label>
            <Input value={search} placeholder="Search..." onChange={(e) => {
                setSearch(e.target.value)
            }} onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    // filterTask()
                }
            }} />
            {
                !!taskList && taskList.map((task) => (
                    <div key={task.id} className="task-item-container">
                        <div className="task-item">
                            <div>
                                <Input
                                    type="checkbox"
                                    checked={task.isChecked}
                                    onChange={(e) => { onChangeTaskCheck(task, e.target.checked) }}
                                />
                                <span className="task-title">{task.title}</span>
                            </div>
                            <div className="btn-action">
                                <div className="btn-detail" onClick={() => { onChangeTaskToggle(task) }}>Detail</div>
                                <div className="btn-remove" onClick={() => { deleteTask(task) }}>Remove</div>
                            </div>
                        </div>
                        <Collapse isOpen={task.isOpenToggle} className="task-edit">
                            <TaskForm task={task} onSave={updateTask} />
                        </Collapse>
                    </div>
                ))
            }
            <div className="mb-5" />
            {
                showBulkAction() &&
                <div className="bulk-action-container">
                    <span>Bulk Action:</span>
                    <div className="btn-action">
                        <div className="btn-detail" onClick={() => { }}>Done</div>
                        <div className="btn-remove" onClick={deleteTasks}>Remove</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ToDoList