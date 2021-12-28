const { handleActions } = require('redux-actions')
const TOOGLE_MODE = 'mode/TOOGLE_MODE'

module.exports = {
    fetchToogleModeActionCreator: (mode) => ({
      type: TOOGLE_MODE,
      mode
    }),
    reducer: handleActions({
      [TOOGLE_MODE]: (state, action) => ({
          mode:action.mode
      }),
    }, 
    {
      mode:['moon'], 
    })
  }