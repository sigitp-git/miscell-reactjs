'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.handleAddOptions = _this.handleAddOptions.bind(_this);
    _this.handlePickOptions = _this.handlePickOptions.bind(_this);
    _this.state = {
      // use IndecisionApp.defaultProps = { options: [] }
      options: props.options
    };
    return _this;
  }

  // React LifeCycle Methods, only no class based Components


  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('mount, fetch data');
    }

    // React LifeCycle Methods, only no class based Components

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      console.log('update, save data');
      // console.log(prevProps, this.props)
      // console.log(prevState, this.state)
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('unmount');
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optext) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (op) {
            return op !== optext;
          })
        };
      });
    }
  }, {
    key: 'handleAddOptions',
    value: function handleAddOptions(opt) {
      if (!opt) {
        return 'Enter valid option';
      } else if (this.state.options.indexOf(opt) > -1) {
        return 'This option already exists';
      } else {
        this.setState(function (prevState) {
          return { options: prevState.options.concat(opt) };
        });
      }
    }
  }, {
    key: 'handlePickOptions',
    value: function handlePickOptions() {
      var rand = Math.floor(Math.random() * this.state.options.length);
      var picked = this.state.options[rand];
      alert(picked);
    }
  }, {
    key: 'render',
    value: function render() {
      var title = 'Indecision App';
      var subtitle = 'Let the computer decide';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePickOptions: this.handlePickOptions
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { handleAddOptions: this.handleAddOptions })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { disabled: !props.hasOptions, onClick: props.handlePickOptions },
      'What should I do?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h3',
      null,
      'There are ',
      props.options.length,
      ' options:'
    ),
    React.createElement(
      'ol',
      null,
      props.options.map(function (opt, i) {
        return React.createElement(Option, {
          key: i,
          optionText: opt,
          handleDeleteOption: props.handleDeleteOption
        });
      })
    ),
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'Remove All'
    )
  );
};

// inline arrow function onClick since onClick works with (e) as input,
// but we want to use props.optionText as input instead
var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'li',
      null,
      props.optionText,
      ' ',
      React.createElement(
        'button',
        {
          onClick: function onClick(e) {
            props.handleDeleteOption(props.optionText);
          }
        },
        'remove'
      )
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.addOption = _this2.addOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'addOption',
    value: function addOption(e) {
      e.preventDefault();
      var option = e.target.elements.optionsubmit.value.trim();
      var err = this.props.handleAddOptions(option);

      this.setState(function () {
        return { error: err };
      });

      e.target.elements.optionsubmit.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          'Error: ',
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.addOption },
          React.createElement('input', { type: 'text', name: 'optionsubmit' }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

// // uses IndecisionApp.defaultProps = { options: [] }
// ReactDOM.render(<IndecisionApp options={['one', 'two']}/>, document.getElementById('AppDiv'))


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('AppDiv'));
