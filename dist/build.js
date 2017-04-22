'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _thunks = require('../actions/thunks.js');

var _spinner = require('./spinner.jsx');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global someFunction FB,window,document,fjs */

var FacebookReduxLogin = function (_Component) {
  _inherits(FacebookReduxLogin, _Component);

  function FacebookReduxLogin(props) {
    _classCallCheck(this, FacebookReduxLogin);

    var _this = _possibleConstructorReturn(this, (FacebookReduxLogin.__proto__ || Object.getPrototypeOf(FacebookReduxLogin)).call(this, props));

    _this.buttonClicked = _this.buttonClicked.bind(_this);
    _this.showSpinner = _this.showSpinner.bind(_this);
    return _this;
  }

  _createClass(FacebookReduxLogin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.initLoginStatus(FacebookReduxLogin.loadSdk);
    }
  }, {
    key: 'getButtonText',
    value: function getButtonText() {
      switch (this.props.isConnected) {
        case true:
          return 'logout';
        case false:
          return 'log in';
        default:
          return 'log in';
      }
    }
  }, {
    key: 'buttonClicked',
    value: function buttonClicked() {
      if (this.props.isConnected) {
        this.props.logOut();
      } else {
        this.props.logIn();
      }
    }
  }, {
    key: 'showSpinner',
    value: function showSpinner() {
      var visibility = void 0;
      if (this.props.isWorking) {
        visibility = 'visible';
      } else {
        visibility = 'hidden';
      }
      return _react2.default.createElement(_spinner2.default, { visibility: visibility });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { style: { display: 'flex', justifyContent: 'center', width: '100%', height: 50, position: 'relative' }, onClick: this.buttonClicked },
        _react2.default.createElement('div', { style: { marginRight: 'auto' } }),
        _react2.default.createElement(
          'div',
          null,
          this.getButtonText()
        ),
        this.showSpinner()
      );
    }
  }]);

  return FacebookReduxLogin;
}(_react.Component);

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    initLoginStatus: _thunks.initLoginStatus,
    logOut: _thunks.logOut,
    logIn: _thunks.logIn
  }, dispatch);
}

function mapStateToProps(state) {
  return { isConnected: state.facebookLogin.isConnected, isWorking: state.facebookLogin.isWorking };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FacebookReduxLogin);
