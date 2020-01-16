import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, EDIT_TODO, UPDATE_TASK } from './actionsTypes'

let TodoId = 10

export const addTodo = text => ({
    type: ADD_TODO,
    id: TodoId++,
    text
})

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id: id
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const editTodo = (id, value) => ({
    type: EDIT_TODO,
    id: id,
    value: value
})

export const updateTask = (value) => ({
    type: UPDATE_TASK,
    value: value
})
