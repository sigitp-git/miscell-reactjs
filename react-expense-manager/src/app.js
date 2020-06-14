import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'
// redux store --> connecting redux state and reducers, reducer returns new states objects based on dispatched action types
import configureStore from './store/configureStore'
// redux actions --> called by store.dispatch() --> sending objects of reducer types + required arguments
import { addExpense, removeExpense, editExpense } from './actions/expenses'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters'
// redux selectors --> using current states to show select results to render
import getFilteredExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 4500, createdAt: 1599998899999}))
const expense2 = store.dispatch(addExpense({ description: 'Car', amount: 500, createdAt: 1499998899999 }))
const expense3 = store.dispatch(addExpense({ description: 'Water', amount: 200, createdAt: 1577798899999 }))
const expense4 = store.dispatch(addExpense({ description: 'Gas', amount: 300, createdAt: 1598898666666 }))


// const state = store.getState()
// const filteredExpenses = getFilteredExpenses(state.expenses, state.filters)
// console.log(filteredExpenses)

// setTimeout(() => {
//     store.dispatch(addExpense({ description: 'Laptop', amount: 3000, createdAt: 2000 }))
//     store.dispatch(setTextFilter('gas'))
// }, 3000)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))