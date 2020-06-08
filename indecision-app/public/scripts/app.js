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
    _this.handleAddOptions = _this.handleAddOptions.bind(_this);
    _this.handlePickOptions = _this.handlePickOptions.bind(_this);
    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
      console.log('delete all');
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
          handleDeleteOptions: this.handleDeleteOptions
        }),
        React.createElement(AddOption, { handleAddOptions: this.handleAddOptions })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

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

var Options = function (_React$Component2) {
  _inherits(Options, _React$Component2);

  function Options() {
    _classCallCheck(this, Options);

    return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
  }

  _createClass(Options, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'There are ',
          this.props.options.length,
          ' options:'
        ),
        React.createElement(
          'ol',
          null,
          this.props.options.map(function (opt, i) {
            return React.createElement(Option, { key: i, optionText: opt });
          })
        ),
        React.createElement(
          'button',
          { onClick: this.props.handleDeleteOptions },
          'Remove All'
        )
      );
    }
  }]);

  return Options;
}(React.Component);

var Option = function Option(props) {
  return React.createElement(
    'li',
    null,
    props.optionText
  );
};

var AddOption = function (_React$Component3) {
  _inherits(AddOption, _React$Component3);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this3.addOption = _this3.addOption.bind(_this3);
    _this3.state = {
      error: undefined
    };
    return _this3;
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

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('AppDiv'));
