class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.handleAddOptions = this.handleAddOptions.bind(this)
    this.handlePickOptions = this.handlePickOptions.bind(this)
    this.state = {
      // use IndecisionApp.defaultProps = { options: [] }
      options: props.options,
    }
  }

  // React LifeCycle Methods, only no class based Components
  componentDidMount() {
    console.log('mount, fetch data')
  }

  // React LifeCycle Methods, only no class based Components
  componentDidUpdate(prevProps, prevState) {
    console.log('update, save data')
    // console.log(prevProps, this.props)
    // console.log(prevState, this.state)
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
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: [],
}

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

    e.target.elements.optionsubmit.value = ''
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

// // uses IndecisionApp.defaultProps = { options: [] }
// ReactDOM.render(<IndecisionApp options={['one', 'two']}/>, document.getElementById('AppDiv'))
ReactDOM.render(<IndecisionApp />, document.getElementById('AppDiv'))
