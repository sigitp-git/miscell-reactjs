import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters'

// props passed by mapStateToProps(), the props contains props.filters
const Filters = (props) => (
  <div>
    <input
      type='text'
      value={props.filters.text}
      onChange={(e) => props.dispatch(setTextFilter(e.target.value))}
    />
    <select value={props.filters.sortBy} onChange={(e) => {
      if (e.target.value === 'date') {
        props.dispatch(sortByDate())
      } else if (e.target.value === 'amount') {
        props.dispatch(sortByAmount())
      }
    }}>
      <option value='date'>Date</option>
      <option value='amount'>Amount</option>
    </select>
  </div>
)

// state as argument passed by the connect() method
const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  }
}

const ConnectedFilters = connect(mapStateToProps)(Filters)
export default ConnectedFilters
