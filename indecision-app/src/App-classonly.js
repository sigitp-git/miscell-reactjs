class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handleAddOptions = this.handleAddOptions.bind(this)
    this.handlePickOptions = this.handlePickOptions.bind(this)
    this.state = {
      options: [],
    }
  }

  handleDeleteOptions() {
    this.setState(() => {
      return { options: [] }
    })
    console.log('delete all')
  }

  handleAddOptions(opt) {
    if (!opt) {
      return 'Enter valid option'
    } else if (this.state.options.indexOf(opt) > -1) {
      return 'This option already exists'
    } else {
      this.setState((prevState) => {
        return { options: prevState.options.concat(opt) }
      })
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
        />
        <AddOption handleAddOptions={this.handleAddOptions} />
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          disabled={!this.props.hasOptions}
          onClick={this.props.handlePickOptions}
        >
          What should I do?
        </button>
      </div>
    )
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <h3>There are {this.props.options.length} options:</h3>
        <ol>
          {this.props.options.map((opt, i) => (
            <Option key={i} optionText={opt} />
          ))}
        </ol>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
      </div>
    )
  }
}

class Option extends React.Component {
  render() {
    return <li>{this.props.optionText}</li>
  }
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

    this.setState(() => {
      return { error: err }
    })

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

ReactDOM.render(<IndecisionApp />, document.getElementById('AppDiv'))
