import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import alertReducer from "./reducers/alertReducer"
import userReducer from "./reducers/userReducer"
import blogsReducer from "./reducers/blogsReducer"

const reducers = combineReducers({
  alert: alertReducer,
  blogs: blogsReducer,
  user: userReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store