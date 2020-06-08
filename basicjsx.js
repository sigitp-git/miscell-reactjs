// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// React uses React.createElement() calls to interpret JSX
// JSX makes it easy to write HTML inside JS files
// To refer to JS expression inside JSX, use {}
// JSX can't handle object, only object props
// Conditional rendering if logged in show logout, etc: if, logical, ternary
// JSX ignores boolean+null+undefined, support string, number, does not support object, only object props, 
// JSX support arrays
// we can render JSX inside JSX 

const name1 = 'Mici'
const name2 = 'Bici'
const age1 = 2
const age2 = 3

const cats = {
  one: 'Mici',
  two: 'Bici',
  location: 'Dallas',
  //location: 'Dallas'
}

const getLocation = (location) => {
  if (location) {
    return location
  } else {
    return 'Unknown'
  }
}

const template = (
  <div>
    <h1>Indecision App</h1>
    <p>Hello World</p>
    <ul>
      <li>
        Name: {name1.toUpperCase()}, Age: {age1}
      </li>
      <li>
        Name: {name1 + ' ' + name2}, Age: {age2}
      </li>
      <li>Cat 1: {cats.one} </li>
      {cats.location && <li>Location: {getLocation(cats.location)} </li>}
      {cats.location ? (
        <li>Location: {getLocation(cats.location)} </li>
      ) : (
        <li> No Location </li>
      )}
    </ul>
  </div>
)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// id supported, class became className (camelCased)
// JSX does not have built-in data binding, you have to re-render (ReactDOM.render()) to show changes
// React only Re-Render changes, using virtualDOM, not entire renderCounter(), 
// the virtualDOM only change the count number
// onClick, onSubmit we only refer the function name, not calling it, it will only be called when event is executed
// so onClick={function} and not onClick={function()}

let count = 0
const myId = 'myid'

const plusOne = () => {
  count += 1
  renderCounter()
}
const minusOne = () => {
  count -= 1
  renderCounter()
}
const resetZero = () => {
  count = 0
  renderCounter()
}

const renderCounter = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button id={myId} className='button' onClick={plusOne}>
        +1
      </button>
      <button id={myId} className='button' onClick={minusOne}>
        -1
      </button>
      <button id={myId} className='button' onClick={resetZero}>
        reset
      </button>
    </div>
  )
  ReactDOM.render(templateTwo, appRoot)
}

const appRoot = document.getElementById('app')
renderCounter()



let isShown = true
const toggleApp = () => {
    isShown = !isShown
    renderOptions()
}

<button onClick={toggleApp}>{ isShown ? 'Hide App Title' : 'Show App Title'}</button>
{isShown && <h1>{app.title}</h1>}




// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
////



const app = {
  title: 'Indecision App',
  subtitle: 'Let the computer decide',
  options: ['Workout', 'Study'],
}

const onFormSubmit = (e) => {
  e.preventDefault()
  // console.log(e.target.elements.option.value)
  const option = e.target.elements.option.value

  if (option) {
    app.options.push(option)
    e.target.elements.option.value = ''
  }

  renderOptions()
  // else undefined
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  const picked = app.options[randomNum]
  alert(picked)
}

const clearOptions = () => {
  app.options = []
  renderOptions()
}

const appRoot = document.getElementById('app')

const renderOptions = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options ' : 'No Options'}</p>

      <ol>
        {app.options.map((opt, i) => (
          <li key={i}>{opt}</li>
        ))}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option' />
        <button>Add Option</button>
      </form>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
      <button onClick={clearOptions}>Clear</button>
    </div>
  )

  ReactDOM.render(template, appRoot)
}

renderOptions()


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Using state in React Class Components

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlusOne = this.handlePlusOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.state = {
      count: 0,
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


// second example of RCC state
class ToggleVisibility extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
    this.state = {
      visibility: true,
    }
  }

  handleToggleVisibility() {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility,
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? 'Hide' : 'Show'}
        </button>
        {this.state.visibility && <h1>Visibility</h1>}
      </div>
    )
  }
}