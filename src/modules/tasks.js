const { handleActions } = require('redux-actions')

const FETCH_TASK = 'task/FETCH_TASK'
const TOOGLE_TASK  = 'task/TOOGLE_TASK'
let nextTodoId = 0

let arr_all = []
let remove_arr = []
function toogle(value){
  arr_all.push(value);
  console.log(arr_all);
  return arr_all||[];
}
function remove(value){
  remove_arr.push(value);
  return [...new Set(remove_arr)];
}
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
  reducer: handleActions({
    [FETCH_TASK]: (state = [], action) => ([
      ...state,
      {
        id: action.id,
        text: action.task,
        completed: false
      }
    ]),
    [TOOGLE_TASK]: (state,action)=>([
      ...state.map(task=>{
        return (task.id==action.id)? {...task, completed: !task.completed}
        : task
      })
    ])
  }, {
    tasks: [], 
  })
}