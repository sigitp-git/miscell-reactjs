class IndecisionApp extends React.Component {
  render() {
    const title = 'Indecision App'
    const subtitle = 'Let the computer decide'
    const options = ['option 1', 'option 2', 'option 3']

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={options} />
        <AddOption />
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
  handlePick() {
    alert('pick!')
  }
  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    )
  }
}

class Options extends React.Component {
  removeAll() {
    alert('remove all')
  }
  render() {
    return (
      <div>
        <h3>There are {this.props.options.length} options:</h3>
        <ol>
          {this.props.options.map((opt, i) => (
            <Option key={i} optionText={opt} />
          ))}
        </ol>
        <button onClick={this.removeAll}>Remove All</button>
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
  handleSubmit(e) {
    e.preventDefault()
    if (e.target.elements.optionsubmit.value) {
      alert(e.target.elements.optionsubmit.value)
    }
    e.target.elements.optionsubmit.value = ''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='optionsubmit' />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('AppDiv'))
