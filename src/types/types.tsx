export interface DefaultOption { label: string; value: string }
export type Task = {
    id?: string
    title: string,
    description: string,
    startDate: Date,
    piority: DefaultOption,
    isChecked?: boolean,
    isOpenToggle?: boolean
}
export type TaskError = {
    titleError: boolean,
    dateError: boolean
}