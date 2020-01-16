import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, EDIT_TODO, UPDATE_TASK} from '../actions/actionsTypes'


var INITIAL_DATA = [];
var stateRef;

const TodoReducer = (state=INITIAL_DATA, action) => {
  stateRef = state;
  switch (action.type){
    case ADD_TODO:
      return [
        ...state,{
          id: action.id,
          text: action.text,
          completed: false,
          }
      ]
    case TOGGLE_TODO:
      return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo)
    case REMOVE_TODO:
      const numIndex = parseInt(action.id)
      return state.filter(todo => todo.id !== numIndex);
    case EDIT_TODO:
      const numIndex2 = parseInt(action.id)
      return state.map(todo => (todo.id === numIndex2) ? {...todo, text: action.value} : todo)
    case UPDATE_TASK:
      //const newState = (action.value);
      const axios = require('axios');
      let newState = [];
      axios.get('https://todo-backend-express-csp.herokuapp.com/')
        .then(function (response) {
        // handle success
        newState = (response.data);
        })
        .catch(function (error) {
        // handle error
          console.log(error);
        })
        .finally(function () {
        // always executed
          return [...state, newState]
        });
    default:
      return state
  }

}

export default TodoReducer
