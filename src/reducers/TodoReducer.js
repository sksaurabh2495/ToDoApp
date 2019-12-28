import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, EDIT_TODO} from '../actions/actionsTypes'

const INITIAL_DATA =  [
  {
    id: 0,
    text: 'Walk the Dog',
  },
  {
    id:1,
    text: 'Saturday morning run',
  },
  {
    id:2,
    text: 'Buy socks',
  },
  {
    id:3,
    text: 'Call mom',
  },
  {
    id:4,
    text: 'Coorg trip',
  },
  {
    id:5,
    text: 'Finish video',
  }
 ]

const TodoReducer = (state=INITIAL_DATA, action) => {
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
    default:
      return state
  }
}

export default TodoReducer
