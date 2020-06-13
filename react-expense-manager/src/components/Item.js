import React from 'react'
import { removeExpense } from '../actions/expenses'
import { connect } from 'react-redux'

const Item = ({ id, description, amount, createdAt, dispatch} ) => (
  <div>
    <h3>{description}</h3>
    <p>
      ${amount} - Created At: {createdAt}
    </p>
    <button onClick={() => dispatch(removeExpense(id))}>
      remove
    </button>
  </div>
)

const ConnectedItem = connect()(Item)

export default ConnectedItem
