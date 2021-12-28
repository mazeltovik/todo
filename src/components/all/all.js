const React = require('react')
const ReactDOM = require('react-dom');
const { connect } = require('react-redux')
const { Link } = require('react-router')
const {
  fetchToogleTaskActionCreator
} = require('modules/tasks.js')
const {
  fetchDeleteTaskActionCreator
} = require('modules/tasks.js')
class All extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }
  handleClick(event){
    let div = event.target.closest('.todo');
    this.props.toggleTask(div.id)
  }
  removeTask(event){
    let div = event.target.closest('.todo');
    this.props.removeTask(div.id)
  }
  
  render() {
    const {
      children,
      tasks,
    } = this.props
    return (
      <div>
        <div 
        id = 'all_tasks' 
        // onClick = {this.handleClick}
        style = {{backgroundColor:(this.props.mode.mode=='moon')?'#25273c':'#ffffff'}}>
          {(!Array.isArray(tasks))? <div className='empty'><p style={{color:(this.props.mode.mode=='moon')? 'hsl(236, 33%, 92%)':'hsl(235, 19%, 35%)'}}>Empty</p></div>: 
            tasks.map((v,i)=>{
              return (
              <div key = {v.id} id = {v.id} className='todo'>
                <ul className={(this.props.mode.mode=='moon')? 'containerTaskDark':'containerTaskLight'}>
                  <li style={{textDecoration: v.completed ? 'line-through' : 'none',
                              textDecorationColor:v.completed? 'hsl(237, 14%, 26%)':'none',
                              color:(v.completed)?'hsl(237, 14%, 26%)':''}}>
                    <div className='check_todo' onClick = {this.handleClick}>
                      <div 
                      className='circleCheck'
                      style = {{background:(v.completed)? 'linear-gradient(to left, hsl(280, 87%, 65%),hsl(192, 100%, 67%))':''}}>
                      {(v.completed)? <img src="images/icon-check.svg" className='checkTrue'></img>:''}
                      </div>
                      <p>{v.text}</p>
                    </div>
                    </li>
                  <li className='containerTaskImg' onClick={this.removeTask}><img src="images/icon-cross.svg"></img></li>
              </ul>
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
  removeTask:fetchDeleteTaskActionCreator
})(All)