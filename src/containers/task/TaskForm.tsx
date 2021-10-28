import React, { FC, useState } from "react"
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { Input, Label, Row, Col, Button } from "reactstrap"
import { Formik } from 'formik';
import * as yup from "yup"

import { DefaultOption, Task, TaskError } from "../../types/types"
import { CustomDatePicker } from "../../components/CustomDatePicker"
import ErrorHandler from "../../components/ErrorHandler"

let piorityOptions: DefaultOption[] = [
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' }]

interface Props {
    task: Task
    onSave: (task: Task) => void
}

var currentDate = new Date()
currentDate.setDate(currentDate.getDate() - 1)
const schema = yup.object({
    title: yup.string().required("Title is required"),
    startDate: yup.date().min(currentDate, "Due date not less than current date")
})

const TaskForm: FC<Props> = ({ task, onSave }) => {
    return (
        <Formik
            initialValues={task}
            validationSchema={schema}
            onSubmit={(values, actions) => {
                onSave(values)
                // actions.resetForm()
            }}>
            {formikProps => {
                const {
                    values,
                    touched,
                    errors,
                    handleSubmit,
                } = formikProps
                return (
                    <div>
                        {!!task && !task.id && <Label className="label-task">New Task</Label>}
                        <Input value={values.title} placeholder="Add new task..." onChange={(e) => {
                            formikProps.setFieldValue(
                                "title",
                                e.target.value
                            )
                        }} />
                        {touched.title && errors.title && (
                            <ErrorHandler
                                text={errors.title as string}
                            />
                        )}
                        <Label for="Description" className="label-custom mt-3">Description</Label>
                        <Input type="textarea" name="text" className="description" id="Description" value={values.description} onChange={(e) => {
                            formikProps.setFieldValue(
                                "description",
                                e.target.value
                            )
                        }} />
                        <Row>
                            <Col xs={6}>
                                <Label for="Description" className="label-custom mt-3">Due Date</Label>
                                <DatePicker selected={values.startDate} onChange={(date: Date) => {
                                    formikProps.setFieldValue(
                                        "startDate",
                                        date
                                    )
                                }}
                                    customInput={<CustomDatePicker ref={null} />} />
                                {touched.startDate && errors.startDate && (
                                    <ErrorHandler
                                        text={errors.startDate as string}
                                    />
                                )}
                            </Col>
                            <Col xs={6}>
                                <Label for="Description" className="label-custom mt-3">Piority</Label>
                                <Select
                                    value={values.piority}
                                    onChange={(value) => {
                                        formikProps.setFieldValue(
                                            "piority",
                                            value
                                        )
                                    }}
                                    options={piorityOptions}
                                />
                            </Col>
                        </Row>
                        <Button className="btn-add" onClick={() => handleSubmit()}>
                            {!!task && !task.id ? "Add" : "Update"}</Button>
                    </div>
                )
            }}
        </Formik>
    )
}


export default TaskForm