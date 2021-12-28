const { combineReducers } = require('redux')
const {
  reducer: tasks
} = require('./tasks')
const {
  reducer: mode
} = require('./mode')
module.exports = combineReducers({
  mode,
  tasks
})