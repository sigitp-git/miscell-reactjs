import React from 'react'

class AddOption extends React.Component {
    constructor(props) {
      super(props)
      this.addOption = this.addOption.bind(this)
      this.state = {
        error: undefined,
      }
    }
  
    addOption(e) {
      e.preventDefault()
      const option = e.target.elements.optionsubmit.value.trim()
      const err = this.props.handleAddOptions(option)
  
      this.setState(() => ({ error: err }))
  
      if (!err) {
        e.target.elements.optionsubmit.value = ''
      }
    }
  
    render() {
      return (
        <div>
          {this.state.error && <p>Error: {this.state.error}</p>}
          <form onSubmit={this.addOption}>
            <input type='text' name='optionsubmit' />
            <button>Add Option</button>
          </form>
        </div>
      )
    }
  }

export default AddOption