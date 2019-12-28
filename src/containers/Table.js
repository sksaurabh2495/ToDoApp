import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo, toggleTodo, setVisibilityFilter, editTodo } from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";
import "../App.css";

class Table extends Component {

  constructor () {
    super();
    this.state = {
      editId : 0
    };
  }

  editTodo2(id) {
    this.setState({editId : id});
    var ele = document.querySelectorAll("[data-key='"+id+"']");
    document.getElementById('modal-input').value = ele[0].textContent;
  }

  editTodoSave() {
    var newValue = document.getElementById('modal-input').value;
    this.props.editTodo(this.state.editId, newValue);
  }

  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        <div className="modal" tabindex="-1" role="dialog" id="exampleModalLong">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" id="modal-input" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => this.editTodoSave()} data-dismiss="modal">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        {this.props.todos.length !== 0 ? (
          <table
            className="table table-hover table-dark"
          >
            <thead>
              <tr>
                <th scope="col">Todos</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo.id}>
                  <td data-key={todo.id}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none"
                    }}
                  >
                    {todo.text}
                  </td>
                  <td>
                  <span  data-toggle="modal" data-target="#exampleModalLong"
                    className="fas fa-pen"
                    onClick={() => this.editTodo2(todo.id)}
                    style={{ color: "white", fontSize: "20pt", marginRight: "20px" }}
                  />
                    <span
                      className="fas fa-minus-circle"
                      onClick={() => this.props.deleteTodo(todo.id)}
                      style={{
                        color: "white",
                        fontSize: "20pt",
                        marginRight: "20px"
                      }}
                    />
                    <span
                      className="fas fa-check-circle"
                      onClick={() => this.props.toggleTodo(todo.id)}
                      style={{ color: "white", fontSize: "20pt" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert">
              Todo List is empty or Filter results show no results
            </div>
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
      setVisibilityFilter,
      editTodo
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
