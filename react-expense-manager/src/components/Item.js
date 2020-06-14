import React from 'react'
import { removeExpense } from '../actions/expenses'
import { connect } from 'react-redux'

const Item = ({ id, description, amount, createdAt, dispatch }) => {
  const dateObj = new Date(createdAt)
  const date = dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div>
      <h3>{description}</h3>
      <p>
        ${amount / 100} - Created On: {date}
      </p>
      <button onClick={() => dispatch(removeExpense(id))}>remove</button>
    </div>
  )
}

const ConnectedItem = connect()(Item)

export default ConnectedItem
