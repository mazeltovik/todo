const { handleActions } = require('redux-actions')

const FETCH_TASK = 'task/FETCH_TASK'
const TOOGLE_TASK  = 'task/TOOGLE_TASK'
const CLEAR_TASKS = 'task/CLEAR_TASKS'
const DELETE_TASK = 'task/DELETE_TASK'
let nextTodoId = 0

module.exports = {
  fetchTaskActionCreator: (task) => ({
    type: FETCH_TASK,
    id: nextTodoId++,
    task
  }),
  fetchToogleTaskActionCreator:(id)=>({
    type:TOOGLE_TASK,
    id
  }),
  fetchClearTasksActionCreator:()=>({
    type:CLEAR_TASKS
  }),
  fetchDeleteTaskActionCreator:(id)=>({
    type:DELETE_TASK,
    id
  }),
  reducer: handleActions({
    [FETCH_TASK]: (state = [], action) => ([
      ...state,
      {
        id: action.id,
        text: action.task,
        completed: false,
      }
    ]),
    [TOOGLE_TASK]: (state,action)=>([
      ...state.map(task=>{
        return (task.id==action.id)? {...task, completed: !task.completed}
        : task
      })
    ]),
    [CLEAR_TASKS]:(state,action)=>([
      ...state.filter(task=>{
        return !task.completed;
      })
    ]),
    [DELETE_TASK]:(state,action)=>([
      ...state.filter(task=>{
        return task.id!=action.id
      })
    ])
  }, {
    tasks: [], 
  })
}