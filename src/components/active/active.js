const React = require('react')
const ReactDOM = require('react-dom');
const { connect } = require('react-redux')
const { Link } = require('react-router')
const {
    fetchToogleTaskActionCreator
  } = require('modules/tasks.js')
class Active extends React.Component{ 
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(event){
        let div = event.target.closest('div');
        this.props.toggleTask(div.id)
      }   
  render() {
    const {
      children,
      tasks,
    } = this.props
    return (
      <div>
      <div id = 'completed_tasks' onClick = {this.handleClick}>
      {(!Array.isArray(tasks))? <div>Empty</div>: tasks.map((v,i)=>{
          return (!v.completed)? <div key = {v.id} id = {v.id}>{v.text}</div>:''
        })}
      </div>
      {children}
      </div>
    )
  }
}

module.exports = connect(function(state){
  return state;},
  {
    toggleTask:fetchToogleTaskActionCreator,
    
  })(Active)