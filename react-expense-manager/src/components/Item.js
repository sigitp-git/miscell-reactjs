import React from 'react'
import { NavLink } from 'react-router-dom'
import { removeExpense } from '../actions/expenses'
import { connect } from 'react-redux'

const Item = ({ id, description, note, amount, createdAt, dispatch }) => {
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
    <NavLink to={`edit/${id}`}><h3>{description}</h3></NavLink>
      <p>
        Amount: ${amount / 100} - Created On: {date}
      </p>
      <p>Note: {note}</p>
      <button onClick={() => dispatch(removeExpense(id))}>remove</button>
    </div>
  )
}

const ConnectedItem = connect()(Item)

export default ConnectedItem
