const React = require('react')
const ReactDOM = require('react-dom');
const { connect } = require('react-redux')
const { Link } = require('react-router')
const styles = require('./all.css')
const {
  fetchToogleTaskActionCreator
} = require('modules/tasks.js')

class All extends React.Component{
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
    console.log(tasks);
    console.log(this.props)
    return (
      <div>
      <div id = 'all_tasks' onClick = {this.handleClick}>
        {(!Array.isArray(tasks))? <div>Empty</div>: tasks.map((v,i)=>{
          return(
          <div key = {v.id} id = {v.id} style={{textDecoration: v.completed ? 'line-through' : 'none'}}>
            {v.text}
          </div>)
        })}
      </div>
      {children}
      </div>
    )
  }
}

module.exports = connect(function(state){
  return state;
},{
  toggleTask:fetchToogleTaskActionCreator,
  
})(All)