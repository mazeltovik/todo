const React = require('react')
const {Link} = require('react-router')
const { connect } = require('react-redux')
const {
    fetchTaskActionCreator
  } = require('modules/tasks.js')
class Main extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.arr = [];
    }
    handleClick(event){
        this.props.fetchTask(event.target.value);
    }
    render() {
        
        return (
        <div>
            <input onBlur={this.handleClick}></input>
            <div>
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
            {this.props.children}
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
    fetchTask:fetchTaskActionCreator
})(Main)