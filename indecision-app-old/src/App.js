import React from 'react'
import ReactDOM from 'react-dom'

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.handleAddOptions = this.handleAddOptions.bind(this)
    this.handlePickOptions = this.handlePickOptions.bind(this)
    this.state = {
      //// use IndecisionApp.defaultProps = { options: [] }
      // options: props.options,
      options: [],
    }
  }

  // React LifeCycle Methods, only no class based Components
  componentDidMount() {
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)

      if (options) {
        this.setState(() => ({ options: options }))
      }
    } catch (e) {
      // do nothing
    }
  }

  // React LifeCycle Methods, only no class based Components
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  handleDeleteOption(optext) {
    this.setState((prevState) => ({
      options: prevState.options.filter((op) => op !== optext),
    }))
  }

  handleAddOptions(opt) {
    if (!opt) {
      return 'Enter valid option'
    } else if (this.state.options.indexOf(opt) > -1) {
      return 'This option already exists'
    } else {
      this.setState((prevState) => ({ options: prevState.options.concat(opt) }))
    }
  }

  handlePickOptions() {
    const rand = Math.floor(Math.random() * this.state.options.length)
    const picked = this.state.options[rand]
    alert(picked)
  }

  render() {
    const title = 'Indecision App'
    const subtitle = 'Let the computer decide'

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePickOptions={this.handlePickOptions}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOptions={this.handleAddOptions} />
        <Counter />
      </div>
    )
  }
}
// // DefaultProps, commented since we are using localStorage
// IndecisionApp.defaultProps = {
//   options: [],
// }

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  )
}

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePickOptions}>
        What should I do?
      </button>
    </div>
  )
}

const Options = (props) => {
  return (
    <div>
      <h3>There are {props.options.length} options:</h3>
      {props.options.length === 0 && <p>Empty Options</p>}
      <ol>
        {props.options.map((opt, i) => (
          <Option
            key={i}
            optionText={opt}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))}
      </ol>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
  )
}

// inline arrow function onClick since onClick works with (e) as input,
// but we want to use props.optionText as input instead
const Option = (props) => {
  return (
    <div>
      <li>
        {props.optionText}{' '}
        <button
          onClick={(e) => {
            props.handleDeleteOption(props.optionText)
          }}
        >
          remove
        </button>
      </li>
    </div>
  )
}

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

////// @@@@@@@@@@@@@@@@@@ Counter Example
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlusOne = this.handlePlusOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.state = {
      //// use Counter.defaultProps = { count: 0 }
      // count: props.option,
      count: 0,
    }
  }

  componentDidMount() {
    try {
      const stringCount = localStorage.getItem('count')
      const count = parseInt(stringCount, 10)

      if (!isNaN(count)) {
        this.setState(() => ({ count: count }))
      }
    } catch (e) {
      // do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count)
      //// making sure only store when there is change, reset 0 from 0 should not call storage update
      // console.log('updated')
    }
  }

  handlePlusOne() {
    this.setState((prevState) => {
      return { count: prevState.count + 1 }
    })
  }

  handleMinusOne() {
    this.setState((prevState) => {
      return { count: prevState.count - 1 }
    })
  }

  handleReset() {
    this.setState(() => {
      return { count: 0 }
    })
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handlePlusOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    )
  }
}

// // Default Props Commented for localStorage usage
// Counter.defaultProps = { count: 0 }
////// @@@@@@@@@@@@@@@@@@ Counter Example



// // uses IndecisionApp.defaultProps = { options: [] }
// ReactDOM.render(<IndecisionApp options={['one', 'two']}/>, document.getElementById('AppDiv'))
ReactDOM.render(<IndecisionApp />, document.getElementById('AppDiv'))
