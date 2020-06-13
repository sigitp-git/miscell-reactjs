import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

const configureStore = () => {
  // @@@@@@@@@@@Create the State/Store (written as 3rd part)
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    })
  )
  return store
}

export default configureStore