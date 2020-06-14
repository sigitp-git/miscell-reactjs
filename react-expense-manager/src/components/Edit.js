import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { editExpense } from '../actions/expenses'

const Edit = (props) => {
  return (
      <Form expense={props.expense} onSubmit={(expense) => {
          props.dispatch(editExpense(props.match.params.id, expense))
          props.history.push('/')
      }}/>
  )
}

// current state provided by connec()
// current props can be taken as well as second argument
// expense object thrown to Edit component as part of props
const mapStateToProps = (state, props) => {
    return {
        expense : state.expenses.find((exp) => exp.id === props.match.params.id)
    }
}

const ConnectedEdit = connect(mapStateToProps)(Edit)
export default ConnectedEdit