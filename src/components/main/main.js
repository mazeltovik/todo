const React = require('react')
const {Link} = require('react-router')
const { connect } = require('react-redux')
const {
    fetchTaskActionCreator
  } = require('modules/tasks.js')
  const {
    fetchClearTasksActionCreator
  } = require('modules/tasks.js')
  const {
    fetchToogleModeActionCreator
  } = require('modules/mode.js')
  
class Main extends React.Component{
    constructor(props){
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.deleteInputText = this.deleteInputText.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.clear = this.clear.bind(this);
    }
    handleKeyDown(event){
        (event.key=='Enter'&&event.target.value)? this.props.fetchTask(event.target.value):'';
        if(event.key=='Enter'){
            event.target.value = '';
            document.querySelector('.add_todo svg').style.display = 'none'
        }
    }
    deleteInputText(event){
        let input = document.querySelector('.add_todo input');
        input.value = '';
        document.querySelector('.add_todo svg').style.display = 'none';
        input.focus();
    }
    handleInput(event){
        if(event.target.value){
            document.querySelector('.add_todo svg').style.display = 'block';
          }
          else{
            document.querySelector('.add_todo svg').style.display = 'none';
          }
    }
    accumulator(arr){
        return (Array.isArray(this.props.tasks))? arr.reduce((acc,curr)=>{
            return (curr.completed==false)? ++acc:acc;
        },0):'0';
    }
    changeMode(event){
        let mode = event.target.src.match(/sun|moon/g);
        this.props.toogleMode(mode); 
    }
    clear(){
        this.props.clearTasks()
    }
    componentDidMount(){
        let width = window.screen.width;
        let body = document.querySelector('body');
        body.style.backgroundImage = (this.props.mode.mode[0]=='moon'&&width>1200)? 'url(images/bg-desktop-dark.jpg)':
                                     (this.props.mode.mode[0]=='moon'&&width<1200)? 'url(images/bg-mobile-dark.jpg)':
                                     (this.props.mode.mode[0]=='sun'&&width>1200)? 'url(images/bg-desktop-light.jpg)': 'url(images/bg-mobile-light.jpg)';
    }
    componentWillUpdate(nextProps){
        let width = window.screen.width;
        let body = document.querySelector('body');
        body.style.backgroundColor = (nextProps.mode.mode[0]=='sun')? 'hsl(0, 0%, 98%)':'#181824';
        body.style.backgroundImage = (nextProps.mode.mode[0]=='sun'&&width>1200)? 'url(images/bg-desktop-light.jpg)':
                                     (nextProps.mode.mode[0]=='sun'&&width<1200)? 'url(images/bg-mobile-light.jpg)':
                                     (nextProps.mode.mode[0]=='moon'&&width>1200)? 'url(images/bg-desktop-dark.jpg)': 'url(images/bg-mobile-dark.jpg)';
    }
    render() {
        
        return (
        <div>
            <div className='mainContainer'>
                <div className = 'logo'>
                    <div>
                        <h1>todo</h1>
                    </div>
                    <div>
                        <img src={(this.props.mode.mode[0]=='sun')? "images/icon-moon.svg":"images/icon-sun.svg"} onClick={this.changeMode}/>
                    </div>
                </div>
                <div className = 'add_todo'>
                    <i 
                    className="fas fa-plus"
                    style = {{color:(this.props.mode.mode=='moon')? 'hsl(236, 33%, 92%)':' hsl(235, 21%, 11%)'}}>
                    </i>
                <input 
                    type='text' 
                    onKeyDown={this.handleKeyDown} 
                    onInput={this.handleInput} 
                    placeholder="Add TODO..."
                    style = {{backgroundColor:(this.props.mode.mode=='moon')? '#25273c':' hsl(0, 0%, 98%)',
                              color:(this.props.mode.mode=='moon')?'hsl(236, 33%, 92%)':'hsl(235, 19%, 35%)'}}>
                </input>
                    <svg 
                    viewBox="0 0 640 512" 
                    width="100" 
                    title="backspace" 
                    onClick = {this.deleteInputText}
                    style = {{fill:(this.props.mode.mode=='moon')?'hsl(236, 33%, 92%)':'hsl(235, 19%, 35%)'}}>
                        <path d="M576 64H205.26A63.97 63.97 0 0 0 160 82.75L9.37 233.37c-12.5 12.5-12.5 32.76 0 45.25L160 429.25c12 12 28.28 18.75 45.25 18.75H576c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zm-84.69 254.06c6.25 6.25 6.25 16.38 0 22.63l-22.62 22.62c-6.25 6.25-16.38 6.25-22.63 0L384 301.25l-62.06 62.06c-6.25 6.25-16.38 6.25-22.63 0l-22.62-22.62c-6.25-6.25-6.25-16.38 0-22.63L338.75 256l-62.06-62.06c-6.25-6.25-6.25-16.38 0-22.63l22.62-22.62c6.25-6.25 16.38-6.25 22.63 0L384 210.75l62.06-62.06c6.25-6.25 16.38-6.25 22.63 0l22.62 22.62c6.25 6.25 6.25 16.38 0 22.63L429.25 256l62.06 62.06z" />
                    </svg>
                </div>
                {this.props.children}
                <div 
                className='footer'
                style={{backgroundColor:(this.props.mode.mode=='moon')? '#25273c':'#ffffff',
                        color:(this.props.mode.mode=='moon')? 'hsl(237, 14%, 26%)':'hsl(236, 9%, 61%)'}}>
                    <div>
                        <p>{this.accumulator(this.props.tasks)} items left</p>
                    </div>
                    <div className='routes'>
                        <ul>
                            <li className={(this.context.router.isActive('/all'))? 'active': ''}>
                            <Link to="/all" activeClassName="active">
                                All
                            </Link>
                            </li>
                            <li className={(this.context.router.isActive('/active'))? 'active': ''}>
                            <Link to="/active" activeClassName="active">
                                Active
                            </Link>
                            </li>
                            <li className={(this.context.router.isActive('/completed'))? 'active': ''}>
                            <Link to="/completed" activeClassName="active">
                                Completed
                            </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='footerClear' onClick={this.clear}>Clear Completed</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}
module.exports = connect(function(state){
    return state;
},{
    fetchTask:fetchTaskActionCreator,
    toogleMode:fetchToogleModeActionCreator,
    clearTasks:fetchClearTasksActionCreator
})(Main)