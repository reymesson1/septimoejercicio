'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Panel = ReactBootstrap.Panel;

var Pagination = ReactBootstrap.Pagination;

var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Col = ReactBootstrap.Col;

var Table = ReactBootstrap.Table;

var Autosuggest = Autosuggest;

var moment = moment;

var API_URL = 'http://localhost';

var API_HEADERS = {

    'Content-Type': 'application/json',
    Authentication: 'any-string-you-like'
};

var languageActive = false;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {

            cookies: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch(API_URL + '/cookies', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this2.setState({

                    cookies: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'setCookie',
        value: function setCookie(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/cookies', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            });

            window.location.reload();
        }
    }, {
        key: 'render',
        value: function render() {

            var dashboard = React.createElement(
                'div',
                null,
                React.createElement(Toolbar, null),
                React.createElement(
                    'div',
                    { className: 'container' },
                    this.props.children
                )
            );

            var login = React.createElement(
                'div',
                null,
                React.createElement(Login, {
                    setcookie: this.setCookie
                })
            );
            if (this.state.cookies) {

                return React.createElement(
                    'div',
                    null,
                    dashboard
                );
            }
            return React.createElement(
                'div',
                null,
                login
            );
        }
    }]);

    return App;
}(React.Component);

var Actions = function (_React$Component2) {
    _inherits(Actions, _React$Component2);

    function Actions() {
        _classCallCheck(this, Actions);

        var _this3 = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this));

        _this3.state = {

            masterAPI: [],
            parameter: ''
        };

        return _this3;
    }

    _createClass(Actions, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this4.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.actionid
            });
        }
    }, {
        key: 'onPrinted',
        value: function onPrinted() {

            window.print();

            window.location.href = '/';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(ActionsTable, {
                    parameter: this.state.parameter,

                    masterAPI: this.state.masterAPI.filter(function (master) {
                        return master.id == _this5.state.parameter;
                    })
                }),
                React.createElement(
                    Button,
                    { onClick: this.onPrinted.bind(this) },
                    'i\xA0'
                )
            );
        }
    }]);

    return Actions;
}(React.Component);

var ActionsTable = function (_React$Component3) {
    _inherits(ActionsTable, _React$Component3);

    function ActionsTable() {
        _classCallCheck(this, ActionsTable);

        return _possibleConstructorReturn(this, (ActionsTable.__proto__ || Object.getPrototypeOf(ActionsTable)).apply(this, arguments));
    }

    _createClass(ActionsTable, [{
        key: 'render',
        value: function render() {

            var nextState = this.props.masterAPI;

            var obj = nextState[0];

            var name = void 0;

            if (obj) {

                name = obj.name.toUpperCase();
            }

            var today = moment(new Date()).format('DD-MM-YYYY');

            return React.createElement(
                'div',
                { id: 'printcss', style: { 'margin': '0' } },
                React.createElement(
                    Grid,
                    null,
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement('img', { src: '/logoprint.png' }),
                            React.createElement(
                                'h5',
                                null,
                                '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0EL TENDEDERO LAVANDERIA'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 \xA0\xA0\xA0\xA0\xA0\xA0 RNC: 131213367'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 AGORA MALL, LOCAL S1-03'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 Santo Domingo. D.N.'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 \xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0 Tel.: (809)-378-0140'
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'h5',
                                { className: 'col-xs-offset-7' },
                                'Fecha: ',
                                today
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'h5',
                                null,
                                'Nombre : ',
                                name
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement(
                                Table,
                                { striped: true, bordered: true, condensed: true, hover: true, style: { 'position': 'relative', 'width': '55%', 'margin': '0' } },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px', 'border-spacing': '0 30px' } },
                                            '#'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px' } },
                                            'Servicio'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px' } },
                                            'Articulo'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px' } },
                                            'Precio'
                                        )
                                    )
                                ),
                                this.props.masterAPI.map(function (master, index) {
                                    return React.createElement(ActionsTableBody, {
                                        key: index,
                                        index: index,
                                        id: master.id,
                                        item: master.item
                                    });
                                }),
                                React.createElement(
                                    'tfoot',
                                    null,
                                    React.createElement(ActionsTableBodyFooter, {
                                        parameter: this.props.parameter,
                                        masterAPI: this.props.masterAPI
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ActionsTable;
}(React.Component);

var ActionsTableBodyFooter = function (_React$Component4) {
    _inherits(ActionsTableBodyFooter, _React$Component4);

    function ActionsTableBodyFooter() {
        _classCallCheck(this, ActionsTableBodyFooter);

        return _possibleConstructorReturn(this, (ActionsTableBodyFooter.__proto__ || Object.getPrototypeOf(ActionsTableBodyFooter)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyFooter, [{
        key: 'render',
        value: function render() {

            var nextState = this.props.masterAPI;

            var zoom = 0;

            if (nextState[0]) {

                zoom = nextState[0].project;
            }

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    null,
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    { style: { 'width': '15px', 'font-size': '20px' } },
                    'Total'
                ),
                React.createElement(
                    'td',
                    { style: { 'width': '15px', 'font-size': '20px' } },
                    'RD$',
                    zoom,
                    '.00'
                ),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return ActionsTableBodyFooter;
}(React.Component);

var ActionsTableBody = function (_React$Component5) {
    _inherits(ActionsTableBody, _React$Component5);

    function ActionsTableBody() {
        _classCallCheck(this, ActionsTableBody);

        return _possibleConstructorReturn(this, (ActionsTableBody.__proto__ || Object.getPrototypeOf(ActionsTableBody)).apply(this, arguments));
    }

    _createClass(ActionsTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tbody',
                null,
                this.props.item.map(function (master, index) {
                    return React.createElement(ActionsTableBodyDetail, {
                        key: index,
                        index: index + 1,
                        id: master.id,
                        name: master.firstname,
                        item: master.item,
                        development: master.development,
                        project: master.project
                    });
                })
            );
        }
    }]);

    return ActionsTableBody;
}(React.Component);

var ActionsTableBodyDetail = function (_React$Component6) {
    _inherits(ActionsTableBodyDetail, _React$Component6);

    function ActionsTableBodyDetail() {
        _classCallCheck(this, ActionsTableBodyDetail);

        return _possibleConstructorReturn(this, (ActionsTableBodyDetail.__proto__ || Object.getPrototypeOf(ActionsTableBodyDetail)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyDetail, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    '\xA0'
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.development
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.item
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.project,
                    '.00'
                )
            );
        }
    }]);

    return ActionsTableBodyDetail;
}(React.Component);

var Login = function (_React$Component7) {
    _inherits(Login, _React$Component7);

    function Login() {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
    }

    _createClass(Login, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { id: 'login' },
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'row vertical-offset-100' },
                        React.createElement(
                            'div',
                            { className: 'col-md-4 col-md-offset-4' },
                            React.createElement(
                                'div',
                                { className: 'panel panel-default' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'h3',
                                        { className: 'panel-title' },
                                        'Please sign in'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(
                                        'form',
                                        {
                                            onSubmit: this.props.setcookie.bind(this) },
                                        React.createElement(
                                            'fieldset',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', {
                                                    className: 'form-control', placeholder: 'E-mail', name: 'email',
                                                    type: 'text' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', {
                                                    className: 'form-control', placeholder: 'Password', name: 'password',
                                                    type: 'password' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'checkbox' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    React.createElement('input', { name: 'remember',
                                                        type: 'checkbox', value: 'Remember Me' }),
                                                    ' Remember Me'
                                                )
                                            ),
                                            React.createElement(
                                                'button',
                                                { className: 'btn\r\nbtn-lg btn-success btn-block' },
                                                'Login'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(React.Component);

var Toolbar = function (_React$Component8) {
    _inherits(Toolbar, _React$Component8);

    function Toolbar() {
        _classCallCheck(this, Toolbar);

        return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
    }

    _createClass(Toolbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            document.body.style.backgroundImage = "none";
        }
    }, {
        key: 'onClicked',
        value: function onClicked() {

            window.location.reload();
        }
    }, {
        key: 'render',
        value: function render() {

            var toolbarES = React.createElement(
                Navbar,
                null,
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'div',
                        { className: 'navbar-brand' },
                        React.createElement(
                            Link,
                            { to: '/',
                                onClick: this.onClicked.bind(this) },
                            'Info-Solutions SYS'
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/master' },
                            'Facturacion'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/detail' },
                            'Inventario'
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { eventKey: 3, title: 'Reportes',
                            id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                {
                                    to: '/partials' },
                                'Cuadre'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            'Another action'
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            'Something else here'
                        ),
                        React.createElement(MenuItem, { divider: true }),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.4 },
                            'Separated link'
                        )
                    ),
                    React.createElement(
                        'li',
                        {
                            style: { 'float': 'right', 'position': 'absolute', 'left': '80%' } },
                        React.createElement(
                            Link,
                            {
                                onClick: this.onClicked, to: '/logout' },
                            'Logout'
                        )
                    )
                )
            );

            var toolbarEN = React.createElement(
                Navbar,
                null,
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'div',
                        { className: 'navbar-brand' },
                        React.createElement(
                            Link,
                            { to: '/',
                                onClick: this.onClicked.bind(this) },
                            'React-Bootstrap'
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/master' },
                            'Master'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            Link,
                            { to: '/detail' },
                            'Details'
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { eventKey: 3, title: 'DropDown',
                            id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                {
                                    to: '/partials' },
                                'Draw'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            'Another action'
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            'Something else here'
                        ),
                        React.createElement(MenuItem, { divider: true }),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.4 },
                            'Separated link'
                        )
                    ),
                    React.createElement(
                        'li',
                        {
                            style: { 'float': 'right', 'position': 'absolute', 'left': '80%' } },
                        React.createElement(
                            Link,
                            {
                                onClick: this.onClicked, to: '/logout' },
                            'Logout'
                        )
                    )
                )
            );

            if (languageActive) {

                return React.createElement(
                    'div',
                    null,
                    toolbarEN
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    toolbarES
                );
            }
        }
    }]);

    return Toolbar;
}(React.Component);

var Master = function (_React$Component9) {
    _inherits(Master, _React$Component9);

    function Master() {
        _classCallCheck(this, Master);

        var _this12 = _possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

        _this12.state = {
            showModal: false,
            filterText: '',
            activePage: 1,
            masterAPI: [],
            masterDetail: [],
            detail: [],
            detailData: [],
            detailAdded: []
        };
        return _this12;
    }

    _createClass(Master, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this13 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this13.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this13.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.actionid
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                showModal: true
            });

            var nextState = this.state.detailData;

            var detailItem = [];

            for (var x = 0; x < nextState.length; x++) {
                detailItem.push(nextState[x].name);
            }

            this.setState({

                detail: detailItem
            });
        }
    }, {
        key: 'onSaveMaster',
        value: function onSaveMaster(event) {

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var details = this.state.masterDetail;

            var name = details[0].firstname;

            var zoom = 0;

            for (var x = 0; x < details.length; x++) {
                zoom += parseInt(details[x].project);
            }

            var newMaster = {

                "id": Date.now(),
                "date": today,
                "name": name,
                "item": this.state.masterDetail,
                "project": zoom,
                "status": "pending"
            };

            var nextState = this.state.masterAPI;

            nextState.push(newMaster);

            this.setState({

                masterAPI: nextState
            });

            this.setState({
                showModal: false,
                masterDetail: []
            });

            fetch(API_URL + '/master', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
            });
        }
    }, {
        key: 'onSaveDetail',
        value: function onSaveDetail(event) {

            event.preventDefault();

            var nextState = this.state.masterDetail;

            var detailTotal = this.state.detailData;

            var articulo = event.target.suggest.value;

            var project = void 0;

            var category = void 0;

            for (var x = 0; x < detailTotal.length; x++) {
                if (detailTotal[x].name == articulo) {
                    project = detailTotal[x].environment;
                    category = detailTotal[x].category;
                    console.log(detailTotal[x].category);
                }
            }

            var newItem = void 0;

            if (project) {

                var newStateDetailAdded = this.state.detailAdded;

                if (category == 'colores' || category == 'propiedades') {

                    newStateDetailAdded.push({ "name": articulo, "project": project });

                    this.setState({

                        detailAdded: newStateDetailAdded
                    });
                } else if (category == 'servicio') {

                    newItem = {

                        "id": Date.now(),
                        "firstname": event.target.firstname.value,
                        "item": event.target.suggest.value,
                        "itemDetail": this.state.detailAdded,
                        "development": event.target.development.value,
                        "project": project
                    };

                    nextState.push(newItem);

                    this.setState({

                        masterDetail: nextState
                    });
                }
            } else {

                alert('Por favor, introducir articulo valido!');
            }
        }
    }, {
        key: 'onSaveDetailAdded',
        value: function onSaveDetailAdded(data) {

            var item = document.getElementById('awesomplete-4vs0fr');

            console.log(document.getElementById('awesomplete-4vs0fr'));
        }
    }, {
        key: 'onDeleteMaster',
        value: function onDeleteMaster(value) {

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                masterAPI: nextState
            });

            fetch(API_URL + '/deletemaster', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": index })
            });
        }
    }, {
        key: 'onHandleUserInput',
        value: function onHandleUserInput(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(eventKey) {

            this.setState({

                activePage: eventKey
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var ModalButtonEN = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Add Master'
            );

            var ModalButtonES = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Agregar Factura'
            );

            var MasterTableEN = "Master List";

            var MasterTableES = "Listado de Facturas";

            var ModalButtonActive = void 0;

            var MasterTableActive = void 0;

            if (languageActive) {

                ModalButtonActive = ModalButtonEN;
                MasterTableActive = MasterTableEN;
            } else {

                ModalButtonActive = ModalButtonES;
                MasterTableActive = MasterTableES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(MasterSearch, {
                        filterText: this.state.filterText,
                        masterCallback: {

                            onsavedetail: this.onSaveDetail.bind(this),

                            onsavemaster: this.onSaveMaster.bind(this),

                            onhandleuserinput: this.onHandleUserInput.bind(this)
                        }

                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        ModalButtonActive,
                        React.createElement(MasterModal, {

                            masterDetail: this.state.masterDetail,
                            detail: this.state.detail,
                            showModal: this.state.showModal,
                            open: this.open,
                            close: this.close.bind(this),
                            masterCallback: {

                                onsavedetail: this.onSaveDetail.bind(this),

                                onsavedetailadded: this.onSaveDetailAdded.bind(this),

                                onsavemaster: this.onSaveMaster.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Panel,
                        { header: MasterTableActive },
                        React.createElement(MasterTable, {
                            filterText: this.state.filterText,
                            masterData: this.state.masterAPI,
                            masterCallback: {

                                onsavedetail: this.onSaveDetail.bind(this),

                                onsavemaster: this.onSaveMaster.bind(this),

                                ondeletemaster: this.onDeleteMaster.bind(this)
                            }
                        })
                    )
                )
            );
        }
    }]);

    return Master;
}(React.Component);

var MasterSearch = function (_React$Component10) {
    _inherits(MasterSearch, _React$Component10);

    function MasterSearch() {
        _classCallCheck(this, MasterSearch);

        return _possibleConstructorReturn(this, (MasterSearch.__proto__ || Object.getPrototypeOf(MasterSearch)).apply(this, arguments));
    }

    _createClass(MasterSearch, [{
        key: 'render',
        value: function render() {

            var MasterSearchEN = React.createElement(
                'div',
                null,
                React.createElement(
                    Panel,
                    { header: 'Search Master' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2 col-sm-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    'Search:'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-10 col-sm-10' },
                                React.createElement('input', {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: 'text',
                                    className: 'form-control',
                                    id: 'first_name', name: 'first_name' })
                            )
                        )
                    )
                )
            );

            var MasterSearchES = React.createElement(
                'div',
                null,
                React.createElement(
                    Panel,
                    { header: 'Busqueda de Factura' },
                    React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-md-2 col-sm-2' },
                                React.createElement(
                                    'label',
                                    null,
                                    'Buscar:'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-10 col-sm-10' },
                                React.createElement('input', {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: 'text',
                                    className: 'form-control',
                                    id: 'first_name', name: 'first_name' })
                            )
                        )
                    )
                )
            );

            if (languageActive) {
                return React.createElement(
                    'div',
                    null,
                    MasterSearchEN
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    MasterSearchES
                );
            }
        }
    }]);

    return MasterSearch;
}(React.Component);

var MasterTable = function (_React$Component11) {
    _inherits(MasterTable, _React$Component11);

    function MasterTable() {
        _classCallCheck(this, MasterTable);

        var _this15 = _possibleConstructorReturn(this, (MasterTable.__proto__ || Object.getPrototypeOf(MasterTable)).call(this));

        _this15.state = {

            currentPage: 1,
            todosPerPage: 3
        };
        return _this15;
    }

    _createClass(MasterTable, [{
        key: 'handleClick',
        value: function handleClick(event) {
            this.setState({
                currentPage: Number(event.target.id)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this16 = this;

            var MasterTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Item'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Actions'
                )
            );

            var MasterTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Fecha'
                ),
                React.createElement(
                    'th',
                    null,
                    'Nombre'
                ),
                React.createElement(
                    'th',
                    null,
                    'Articulo'
                ),
                React.createElement(
                    'th',
                    null,
                    'Estatus'
                ),
                React.createElement(
                    'th',
                    null,
                    'Acciones'
                )
            );

            var MasterTableActive = void 0;

            if (languageActive) {

                MasterTableActive = MasterTableEN;
            } else {

                MasterTableActive = MasterTableES;
            }

            var filteredTable = this.props.masterData.filter(function (master) {
                return master.name.indexOf(_this16.props.filterText) !== -1;
            });
            var _state = this.state,
                todos = _state.todos,
                currentPage = _state.currentPage,
                todosPerPage = _state.todosPerPage;


            var indexOfLastTodo = currentPage * todosPerPage;
            var indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            var currentTodos = filteredTable.slice(indexOfFirstTodo, indexOfLastTodo);

            var pageNumbers = [];
            for (var i = 1; i <= Math.ceil(filteredTable.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }

            var renderPageNumbers = pageNumbers.map(function (number) {
                return React.createElement(
                    'li',
                    {
                        key: number,
                        id: number,
                        onClick: _this16.handleClick.bind(_this16)
                    },
                    React.createElement(
                        'a',
                        { role: 'button', href: '#', id: number },
                        number
                    )
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        MasterTableActive
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        currentTodos.map(function (todo, index) {
                            return React.createElement(MasterTableBody, {

                                key: index,
                                id: todo.id,

                                date: todo.date,

                                name: todo.name,

                                item: todo.name,

                                status: todo.status,

                                masterCallback: _this16.props.masterCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(
                        'ul',
                        { className: 'pagination pagination-sm' },
                        React.createElement(
                            'li',
                            { id: '1' },
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xAB'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u2039'
                            )
                        ),
                        renderPageNumbers,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u203A'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xBB'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MasterTable;
}(React.Component);

var MasterTableBody = function (_React$Component12) {
    _inherits(MasterTableBody, _React$Component12);

    function MasterTableBody() {
        _classCallCheck(this, MasterTableBody);

        return _possibleConstructorReturn(this, (MasterTableBody.__proto__ || Object.getPrototypeOf(MasterTableBody)).apply(this, arguments));
    }

    _createClass(MasterTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.date
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.items
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.status
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Link,
                        { className: 'btn btn-default',
                            to: '/actions/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-eye',
                            'aria-hidden': 'true' })
                    ),
                    ' ',
                    React.createElement(
                        Button,
                        { onClick: this.props.masterCallback.ondeletemaster.bind(this, this.props.id) },
                        React.createElement('i', {
                            className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return MasterTableBody;
}(React.Component);

var MasterModalButton = function (_React$Component13) {
    _inherits(MasterModalButton, _React$Component13);

    function MasterModalButton() {
        _classCallCheck(this, MasterModalButton);

        return _possibleConstructorReturn(this, (MasterModalButton.__proto__ || Object.getPrototypeOf(MasterModalButton)).apply(this, arguments));
    }

    _createClass(MasterModalButton, [{
        key: 'render',
        value: function render() {

            var MasterModalButtonEN = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    'Save'
                )
            );

            var MasterModalButtonES = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    'Guardar'
                )
            );

            var MasterModalButtonActive = void 0;

            if (languageActive) {

                MasterModalButtonActive = MasterModalButtonEN;
            } else {

                MasterModalButtonActive = MasterModalButtonES;
            }

            return React.createElement(
                Row,
                null,
                MasterModalButtonActive
            );
        }
    }]);

    return MasterModalButton;
}(React.Component);

var MasterModal = function (_React$Component14) {
    _inherits(MasterModal, _React$Component14);

    function MasterModal() {
        _classCallCheck(this, MasterModal);

        return _possibleConstructorReturn(this, (MasterModal.__proto__ || Object.getPrototypeOf(MasterModal)).apply(this, arguments));
    }

    _createClass(MasterModal, [{
        key: 'render',
        value: function render() {

            var MasterModalEN = React.createElement(
                Modal.Title,
                null,
                'Modal Header'
            );

            var MasterModalES = React.createElement(
                Modal.Title,
                null,
                'Agregar Factura'
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalEN;
            } else {

                MasterModalActive = MasterModalES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Modal,
                    { show: this.props.showModal, onHide: this.props.close },
                    React.createElement(
                        Modal.Header,
                        { closeButton: true },
                        MasterModalActive
                    ),
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(MasterModalField, {
                            detail: this.props.detail,
                            masterCallback: this.props.masterCallback
                        }),
                        React.createElement('br', null),
                        React.createElement(MasterModalTable, {

                            masterDetail: this.props.masterDetail,

                            masterCallback: this.props.masterCallback
                        }),
                        React.createElement(MasterModalButton, {
                            masterCallback: this.props.masterCallback
                        })
                    )
                )
            );
        }
    }]);

    return MasterModal;
}(React.Component);

var AwesompleteInput = function (_React$Component15) {
    _inherits(AwesompleteInput, _React$Component15);

    function AwesompleteInput() {
        _classCallCheck(this, AwesompleteInput);

        return _possibleConstructorReturn(this, (AwesompleteInput.__proto__ || Object.getPrototypeOf(AwesompleteInput)).apply(this, arguments));
    }

    _createClass(AwesompleteInput, [{
        key: 'componentWillMount',

        // Dont forget to add:
        // css: https://cdn.rawgit.com/LeaVerou/awesomplete/gh-pages/awesomplete.css
        // js: https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.js
        // Awesomeplete tutorial:
        //https://www.sitepoint.com/javascript-autocomplete-widget-awesomplete/
        value: function componentWillMount() {
            if (!Awesomplete) throw new Error('ERROR: Cannot find awesomplete.');

            this.onChange = this.onChange.bind(this);
            this.onSelectComplete = this.onSelectComplete.bind(this);

            //window.addEventListener("awesomplete-selectcomplete",this.onSelectComplete, false);

            this.state = {
                value: this.props.value || this.props.defaultValue || ''
            };

            if (this.props.id != null) this._id = this.props.id;else this._id = 'awesomplete-' + Math.random().toString(36).substring(7);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var list = this.props.list;
            if (!list) list = ['one', 'two', 'three'];

            var input = document.getElementById(this._id);
            this._awesomplete = new Awesomplete(input, {
                minChars: 1,
                maxItems: 5,
                autoFirst: true
            });
            this._awesomplete.list = list;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ value: event.target.value });
            if (this.props.onChange) this.props.onChange(event);
        }
    }, {
        key: 'onSelectComplete',
        value: function onSelectComplete(event) {
            if (event.target.id != this._id) return;

            this.onChange(event);

            if (this.props.onSelectComplete) this.props.onSelectComplete(event);
        }
    }, {
        key: 'render',
        value: function render() {
            var className = "awesomplete";
            var placeholder = this.props.placeholder || '';
            if (this.props.className) className += ' ' + this.props.className;

            return React.createElement('input', { style: { "width": "181%", "color": "black" },
                id: this._id,
                value: this.state.value,
                onChange: this.onChange,
                className: className,
                placeholder: placeholder,
                name: 'suggest'
            });
        }
    }]);

    return AwesompleteInput;
}(React.Component);

var MasterModalField = function (_React$Component16) {
    _inherits(MasterModalField, _React$Component16);

    function MasterModalField() {
        _classCallCheck(this, MasterModalField);

        var _this21 = _possibleConstructorReturn(this, (MasterModalField.__proto__ || Object.getPrototypeOf(MasterModalField)).call(this));

        _this21.state = {

            value: ''
        };
        return _this21;
    }

    _createClass(MasterModalField, [{
        key: 'onChange',
        value: function onChange(event, _ref) {
            var newValue = _ref.newValue,
                method = _ref.method;

            this.setState({

                value: newValue
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var precio = 0;

            var MasterModalFieldEN = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    { onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'firstname', placeholder: 'Name', required: true })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(AwesompleteInput, { className: 'form-control', list: this.props.detail })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formControlsSelect' },
                            React.createElement(
                                Col,
                                { md: 1, sm: 2 },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    'List'
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(
                                    FormControl,
                                    { componentClass: 'select', name: 'development', placeholder: 'List', required: true },
                                    React.createElement(
                                        'option',
                                        { value: 'select' },
                                        'Select'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '...' },
                                        '...'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Project'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'project', placeholder: 'Project', required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2, sm: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    )
                )
            );

            var MasterModalFieldES = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    { onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Cliente'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'text', name: 'firstname', placeholder: 'Cliente', required: true })
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formControlsSelect' },
                            React.createElement(
                                Col,
                                { md: 1, sm: 2 },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    'Tipo de Servicio'
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(
                                    FormControl,
                                    { componentClass: 'select', name: 'development', placeholder: 'Tipo de Servicio', required: true },
                                    React.createElement(
                                        'option',
                                        { value: 'Lavar y Prensa' },
                                        'Lavar y Prensa'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'Solo Lavar' },
                                        'Solo Lavar'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'Solo Plancha' },
                                        'Solo Plancha'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'Alteracion' },
                                        'Alteracion'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'Agregados' },
                                        'Agregados'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Articulo'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6, style: { "width": "31%" } },
                                React.createElement(AwesompleteInput, { className: 'form-control', list: this.props.detail })
                            ),
                            React.createElement(
                                Col,
                                { md: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-paperclip', 'aria-hidden': 'true' })
                                ),
                                ' ',
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    )
                )
            );

            var MasterModalFieldActive = void 0;

            if (languageActive) {

                MasterModalFieldActive = MasterModalFieldEN;
            } else {
                MasterModalFieldActive = MasterModalFieldES;
            }

            return React.createElement(
                Grid,
                null,
                MasterModalFieldActive
            );
        }
    }]);

    return MasterModalField;
}(React.Component);

var MasterModalTable = function (_React$Component17) {
    _inherits(MasterModalTable, _React$Component17);

    function MasterModalTable() {
        _classCallCheck(this, MasterModalTable);

        return _possibleConstructorReturn(this, (MasterModalTable.__proto__ || Object.getPrototypeOf(MasterModalTable)).apply(this, arguments));
    }

    _createClass(MasterModalTable, [{
        key: 'render',
        value: function render() {

            var MasterModalTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Name'
                ),
                React.createElement(
                    'th',
                    null,
                    'Item'
                ),
                React.createElement(
                    'th',
                    null,
                    'Development'
                ),
                React.createElement(
                    'th',
                    null,
                    'Project'
                )
            );

            var MasterModalTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    '#'
                ),
                React.createElement(
                    'th',
                    null,
                    'Nombre'
                ),
                React.createElement(
                    'th',
                    null,
                    'Articulo'
                ),
                React.createElement(
                    'th',
                    null,
                    'Tipo de Servicio'
                ),
                React.createElement(
                    'th',
                    null,
                    'Precio'
                )
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalTableEN;
            } else {

                MasterModalActive = MasterModalTableES;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        MasterModalActive
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.masterDetail.map(function (masterdetail, index) {
                            return React.createElement(MasterModalTableBody, {
                                index: index + 1,
                                key: index,
                                id: masterdetail.id,
                                firstname: masterdetail.firstname,
                                item: masterdetail.item,
                                itemDetail: masterdetail.itemDetail,
                                development: masterdetail.development,
                                project: masterdetail.project
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterModalTable;
}(React.Component);

var MasterModalTableBodyAdded = function (_React$Component18) {
    _inherits(MasterModalTableBodyAdded, _React$Component18);

    function MasterModalTableBodyAdded() {
        _classCallCheck(this, MasterModalTableBodyAdded);

        return _possibleConstructorReturn(this, (MasterModalTableBodyAdded.__proto__ || Object.getPrototypeOf(MasterModalTableBodyAdded)).apply(this, arguments));
    }

    _createClass(MasterModalTableBodyAdded, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    React.createElement('i', { className: 'fa fa-arrow-circle-o-right', 'aria-hidden': 'true' })
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                )
            );
        }
    }]);

    return MasterModalTableBodyAdded;
}(React.Component);

var MasterModalTableBodyAddedTotal = function (_React$Component19) {
    _inherits(MasterModalTableBodyAddedTotal, _React$Component19);

    function MasterModalTableBodyAddedTotal() {
        _classCallCheck(this, MasterModalTableBodyAddedTotal);

        return _possibleConstructorReturn(this, (MasterModalTableBodyAddedTotal.__proto__ || Object.getPrototypeOf(MasterModalTableBodyAddedTotal)).apply(this, arguments));
    }

    _createClass(MasterModalTableBodyAddedTotal, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.project
                )
            );
        }
    }]);

    return MasterModalTableBodyAddedTotal;
}(React.Component);

var MasterModalTableBody = function (_React$Component20) {
    _inherits(MasterModalTableBody, _React$Component20);

    function MasterModalTableBody() {
        _classCallCheck(this, MasterModalTableBody);

        return _possibleConstructorReturn(this, (MasterModalTableBody.__proto__ || Object.getPrototypeOf(MasterModalTableBody)).apply(this, arguments));
    }

    _createClass(MasterModalTableBody, [{
        key: 'render',
        value: function render() {

            if (true) {

                return React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        this.props.index
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.firstname
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'table',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    this.props.item
                                )
                            ),
                            this.props.itemDetail.map(function (detail) {
                                return React.createElement(MasterModalTableBodyAdded, {
                                    name: detail.name

                                });
                            })
                        )
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.development
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.project,
                        React.createElement(
                            'table',
                            null,
                            this.props.itemDetail.map(function (detail) {
                                return React.createElement(MasterModalTableBodyAddedTotal, {
                                    project: detail.project
                                });
                            })
                        )
                    )
                );
            } else {

                return React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        this.props.index
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.firstname
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.development
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.item
                    ),
                    React.createElement(
                        'td',
                        null,
                        this.props.project
                    )
                );
            }
        }
    }]);

    return MasterModalTableBody;
}(React.Component);

var Detail = function (_React$Component21) {
    _inherits(Detail, _React$Component21);

    function Detail() {
        _classCallCheck(this, Detail);

        var _this26 = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this));

        _this26.state = {
            showModal: false,
            filterText: '',
            detailData: []
        };
        return _this26;
    }

    _createClass(Detail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this27 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this27.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: 'onSaveDetail',
        value: function onSaveDetail(event) {
            var _newDetail;

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var newDetail = (_newDetail = {

                "id": Date.now(),
                "date": today
            }, _defineProperty(_newDetail, 'id', event.target.id.value), _defineProperty(_newDetail, "name", event.target.name.value), _defineProperty(_newDetail, "item", event.target.item.value), _defineProperty(_newDetail, "environment", event.target.environment.value), _defineProperty(_newDetail, "category", event.target.category.value), _newDetail);

            var nextState = this.state.detailData;

            nextState.push(newDetail);

            fetch(API_URL + '/detail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newDetail)
            });

            this.setState({

                detailData: nextState,
                showModal: false
            });
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: 'onUpdated',
        value: function onUpdated(value) {

            console.log(value);
        }
    }, {
        key: 'onDeleted',
        value: function onDeleted(value) {

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                detailData: nextState
            });

            fetch(API_URL + '/deletedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var DetailEN = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Add Detail'
            );

            var DetailES = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                'Agregar Articulo'
            );

            var DetailActive = void 0;

            if (languageActive) {
                DetailActive = DetailEN;
            } else {
                DetailActive = DetailES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailSearch, {
                        filterText: this.state.filterText,
                        detailCallback: {
                            onHandleChange: this.onHandleChange.bind(this)
                        }
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        DetailActive,
                        React.createElement(DetailModal, { showModal: this.state.showModal,
                            detailCallback: {
                                open: this.open,
                                close: this.close.bind(this),

                                onsavedetail: this.onSaveDetail.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailTable, {
                        filterText: this.state.filterText,
                        detailData: this.state.detailData,
                        detailCallback: {
                            onUpdated: this.onUpdated.bind(this),
                            onDeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return Detail;
}(React.Component);

var DetailPagination = function (_React$Component22) {
    _inherits(DetailPagination, _React$Component22);

    function DetailPagination() {
        _classCallCheck(this, DetailPagination);

        var _this28 = _possibleConstructorReturn(this, (DetailPagination.__proto__ || Object.getPrototypeOf(DetailPagination)).call(this));

        _this28.state = {
            activePage: 1
        };
        return _this28;
    }

    _createClass(DetailPagination, [{
        key: 'handleSelect',
        value: function handleSelect(eventKey) {
            this.setState({
                activePage: eventKey
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(Pagination, {
                prev: true,
                next: true,
                first: true,
                last: true,
                ellipsis: true,
                boundaryLinks: true,
                items: 5,
                maxButtons: 5,
                activePage: this.state.activePage,
                onSelect: this.handleSelect.bind(this)
            });
        }
    }]);

    return DetailPagination;
}(React.Component);

var DetailSearch = function (_React$Component23) {
    _inherits(DetailSearch, _React$Component23);

    function DetailSearch() {
        _classCallCheck(this, DetailSearch);

        return _possibleConstructorReturn(this, (DetailSearch.__proto__ || Object.getPrototypeOf(DetailSearch)).apply(this, arguments));
    }

    _createClass(DetailSearch, [{
        key: 'render',
        value: function render() {

            var DetailSearchEN = React.createElement(
                Panel,
                { header: 'Search Detail' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Search:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: 'text', className: 'form-control', id: 'first_name',
                                name: 'first_name' })
                        )
                    )
                )
            );

            var DetailSearchES = React.createElement(
                Panel,
                { header: 'Busqueda ' },
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-md-2 col-sm-2' },
                            React.createElement(
                                'label',
                                null,
                                'Buscar:'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-10 col-sm-10' },
                            React.createElement('input', {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: 'text', className: 'form-control', id: 'first_name',
                                name: 'first_name' })
                        )
                    )
                )
            );

            var DetailSearchActive = void 0;

            if (languageActive) {

                DetailSearchActive = DetailSearchEN;
            } else {
                DetailSearchActive = DetailSearchES;
            }

            return React.createElement(
                'div',
                null,
                DetailSearchActive
            );
        }
    }]);

    return DetailSearch;
}(React.Component);

var DetailTable = function (_React$Component24) {
    _inherits(DetailTable, _React$Component24);

    function DetailTable() {
        _classCallCheck(this, DetailTable);

        var _this30 = _possibleConstructorReturn(this, (DetailTable.__proto__ || Object.getPrototypeOf(DetailTable)).call(this));

        _this30.state = {
            todos: [{ id: '123', date: '2017-10-09', name: 'sas', item: 'test.item', environment: 'dev' }, { id: '454758778052139', date: '2017-10-09', name: 'sas', item: 'test.item', environment: 'dev' }],
            currentPage: 1,
            todosPerPage: 3
        };
        _this30.handleClick = _this30.handleClick.bind(_this30);
        return _this30;
    }

    _createClass(DetailTable, [{
        key: 'handleClick',
        value: function handleClick(event) {
            this.setState({
                currentPage: Number(event.target.id)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this31 = this;

            var filteredTable = this.props.detailData.filter(function (detail) {
                return detail.name.indexOf(_this31.props.filterText) !== -1;
            });

            var _state2 = this.state,
                todos = _state2.todos,
                currentPage = _state2.currentPage,
                todosPerPage = _state2.todosPerPage;

            // Logic for displaying current todos

            var indexOfLastTodo = currentPage * todosPerPage;
            var indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            var currentTodos = filteredTable.slice(indexOfFirstTodo, indexOfLastTodo);

            // Logic for displaying page numbers
            var pageNumbers = [];
            for (var i = 1; i <= Math.ceil(filteredTable.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }

            var renderPageNumbers = pageNumbers.map(function (number) {
                return React.createElement(
                    'li',
                    {
                        key: number,
                        id: number,
                        onClick: _this31.handleClick
                    },
                    React.createElement(
                        'a',
                        { role: 'button', href: '#', id: number },
                        number
                    )
                );
            });

            var DetailTableEN = React.createElement(
                Panel,
                { header: 'Search List' },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'ID'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Name'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Item'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Environment'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Acciones'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        currentTodos.map(function (todo, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: todo.id,
                                name: todo.name,
                                item: todo.item,

                                environment: todo.environment,

                                detailCallback: _this31.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(
                        'ul',
                        { className: 'pagination pagination-sm' },
                        React.createElement(
                            'li',
                            { id: '1' },
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xAB'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u2039'
                            )
                        ),
                        renderPageNumbers,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u203A'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xBB'
                            )
                        )
                    )
                )
            );

            var DetailTableES = React.createElement(
                Panel,
                { header: 'Listado ' },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'ID'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Descripcion'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Cantidad'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Precio'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Actions'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        currentTodos.map(function (todo, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: todo.id,
                                name: todo.name,
                                item: todo.item,

                                environment: todo.environment,

                                detailCallback: _this31.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pull-right' },
                    React.createElement(
                        'ul',
                        { className: 'pagination pagination-sm' },
                        React.createElement(
                            'li',
                            { id: '1' },
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xAB'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u2039'
                            )
                        ),
                        renderPageNumbers,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\u203A'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { role: 'button', href: '#' },
                                '\xBB'
                            )
                        )
                    )
                )
            );

            var DetailTableActive = void 0;

            if (languageActive) {
                DetailTableActive = DetailTableEN;
            } else {
                DetailTableActive = DetailTableES;
            }

            return React.createElement(
                'div',
                null,
                DetailTableActive
            );
        }
    }]);

    return DetailTable;
}(React.Component);

var DetailModalUpdate = function (_React$Component25) {
    _inherits(DetailModalUpdate, _React$Component25);

    function DetailModalUpdate() {
        _classCallCheck(this, DetailModalUpdate);

        var _this32 = _possibleConstructorReturn(this, (DetailModalUpdate.__proto__ || Object.getPrototypeOf(DetailModalUpdate)).call(this));

        _this32.state = {

            parameter: '',
            showModal: true,
            detailData: []
        };

        return _this32;
    }

    _createClass(DetailModalUpdate, [{
        key: 'close',
        value: function close() {

            this.setState({

                showModal: false
            });

            //window.location.href = '/'
        }
    }, {
        key: 'open',
        value: function open() {

            this.setState({

                showModal: true
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this33 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this33.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.detailid
            });
        }
    }, {
        key: 'onSubmitted',
        value: function onSubmitted(event) {
            var _this34 = this;

            event.preventDefault();

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this34.state.parameter;
            });

            nextState[index].item = event.target.item.value;

            this.setState({

                detailData: nextState
            });

            fetch(API_URL + '/updatedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "item": event.target.item.value })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this35 = this;

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this35.state.parameter;
            });

            var name = void 0;
            var environment = void 0;
            var item = void 0;

            if (nextState[index]) {

                name = nextState[index].name;
                environment = nextState[index].environment;
                item = nextState[index].item;
            }

            return React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close.bind(this) },
                React.createElement(
                    Modal.Header,
                    null,
                    React.createElement(
                        Modal.Title,
                        null,
                        React.createElement(
                            'h1',
                            null,
                            'Editing to ',
                            this.state.parameter
                        )
                    )
                ),
                React.createElement(
                    Form,
                    { onSubmit: this.onSubmitted.bind(this), horizontal: true },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalId' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'ID'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { value: this.state.parameter,
                                    type: 'id', placeholder: 'id', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'name', value: name,
                                    type: 'text', placeholder: 'Name', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Environment'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'environment',
                                    value: environment, type: 'text', placeholder: 'Environment', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'item', type: 'text',
                                    placeholder: item })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit' },
                            'Save'
                        )
                    )
                )
            );
        }
    }]);

    return DetailModalUpdate;
}(React.Component);

var DetailTableBody = function (_React$Component26) {
    _inherits(DetailTableBody, _React$Component26);

    function DetailTableBody() {
        _classCallCheck(this, DetailTableBody);

        return _possibleConstructorReturn(this, (DetailTableBody.__proto__ || Object.getPrototypeOf(DetailTableBody)).apply(this, arguments));
    }

    _createClass(DetailTableBody, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.id
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.item
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.environment
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Link,
                        { className: 'btn btn-default',
                            to: '/updatedetail/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-edit',
                            'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        Button,
                        {
                            onClick: this.props.detailCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement('i', {
                            className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return DetailTableBody;
}(React.Component);

var DetailModal = function (_React$Component27) {
    _inherits(DetailModal, _React$Component27);

    function DetailModal() {
        _classCallCheck(this, DetailModal);

        return _possibleConstructorReturn(this, (DetailModal.__proto__ || Object.getPrototypeOf(DetailModal)).apply(this, arguments));
    }

    _createClass(DetailModal, [{
        key: 'render',
        value: function render() {

            var DetailModalEN = React.createElement(
                Modal,
                { show: this.props.showModal, onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Modal heading'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true, onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'ID'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'id', placeholder: 'ID' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'name', placeholder: 'Name' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Environment'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'environment', placeholder: 'Item' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'item', placeholder: 'Item' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit', pullRight: true },
                            'Save'
                        )
                    )
                )
            );
            var DetailModalES = React.createElement(
                Modal,
                { show: this.props.showModal, onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Agregar Articulo'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true, onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Codigo'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'id', placeholder: 'Codigo' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Descripcion'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'name', placeholder: 'Descripcion' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Precio'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'environment', placeholder: 'Precio' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: 'text', name: 'item', placeholder: 'Cantidad' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(
                                    FormControl,
                                    { name: 'category', componentClass: 'select', placeholder: 'select' },
                                    React.createElement(
                                        'option',
                                        { value: 'servicios' },
                                        'Servicios'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'colores' },
                                        'Colores'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'propiedades' },
                                        'Propiedades'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit', pullRight: true },
                            'Guarda'
                        )
                    )
                )
            );

            var DetailModalActive = void 0;

            if (languageActive) {
                DetailModalActive = DetailModalEN;
            } else {
                DetailModalActive = DetailModalES;
            }

            return React.createElement(
                'div',
                null,
                DetailModalActive
            );
        }
    }]);

    return DetailModal;
}(React.Component);

var Partials = function (_React$Component28) {
    _inherits(Partials, _React$Component28);

    function Partials() {
        _classCallCheck(this, Partials);

        var _this38 = _possibleConstructorReturn(this, (Partials.__proto__ || Object.getPrototypeOf(Partials)).call(this));

        _this38.state = {

            masterAPI: [],
            searchData: '2017-10-06',
            total: 0
        };

        return _this38;
    }

    _createClass(Partials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this39 = this;

            fetch(API_URL + '/reporte', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this39.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            var today = moment(new Date()).format('YYYY-MM-DD');

            this.setState({

                searchData: today
            });
        }
    }, {
        key: 'onChanged',
        value: function onChanged(event) {

            this.setState({

                searchData: event.target.value
            });
        }
    }, {
        key: 'onRun',
        value: function onRun() {
            var _this40 = this;

            var nextState = this.state.masterAPI.filter(function (master) {
                return master.date == _this40.state.searchData;
            });

            var grand = 0;

            for (var x = 0; x < nextState.length; x++) {
                grand += parseInt(nextState[x].project);
            }

            this.setState({

                total: grand
            });

            window.print();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this41 = this;

            var PartialsEN = React.createElement(
                'h1',
                null,
                'Draw List'
            );

            var PartialsES = React.createElement(
                'h1',
                null,
                'Reporte Cuadre'
            );

            var PartialsActive = void 0;

            if (languageActive) {

                PartialsActive = PartialsEN;
            } else {

                PartialsActive = PartialsES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { xs: 6 },
                        PartialsActive
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(PartialsSearch, {
                        onChanged: this.onChanged.bind(this)
                    }),
                    React.createElement(PartialsTable, {

                        masterAPI: this.state.masterAPI.filter(function (master) {
                            return master.date == _this41.state.searchData;
                        }),
                        total: this.state.total
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.onRun.bind(this) },
                        'i'
                    )
                )
            );
        }
    }]);

    return Partials;
}(React.Component);

var PartialsSearch = function (_React$Component29) {
    _inherits(PartialsSearch, _React$Component29);

    function PartialsSearch() {
        _classCallCheck(this, PartialsSearch);

        return _possibleConstructorReturn(this, (PartialsSearch.__proto__ || Object.getPrototypeOf(PartialsSearch)).apply(this, arguments));
    }

    _createClass(PartialsSearch, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Col,
                { xs: 6 },
                React.createElement(
                    Form,
                    { horizontal: true,
                        onChange: this.props.onChanged.bind(this) },
                    React.createElement(
                        FormGroup,
                        { controlId: 'formHorizontalEmail' },
                        React.createElement(Col, { componentClass: ControlLabel, xs: 2 }),
                        React.createElement(
                            Col,
                            { xs: 6 },
                            React.createElement(FormControl, { type: 'date', placeholder: 'Email' })
                        )
                    )
                )
            );
        }
    }]);

    return PartialsSearch;
}(React.Component);

var PartialsTable = function (_React$Component30) {
    _inherits(PartialsTable, _React$Component30);

    function PartialsTable() {
        _classCallCheck(this, PartialsTable);

        return _possibleConstructorReturn(this, (PartialsTable.__proto__ || Object.getPrototypeOf(PartialsTable)).apply(this, arguments));
    }

    _createClass(PartialsTable, [{
        key: 'render',
        value: function render() {
            var _this44 = this;

            var partialsTableEN = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px',
                            'border-spacing': '0 30px' } },
                    '#'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Date'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Name'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px',
                            'font-size': '25px' } },
                    'Project'
                )
            );

            var partialsTableES = React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px',
                            'border-spacing': '0 30px' } },
                    '#'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Fecha'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Cliente'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px',
                            'font-size': '25px' } },
                    'Precio'
                )
            );

            var partialsTableActive = void 0;

            if (languageActive) {

                partialsTableActive = partialsTableEN;
            } else {

                partialsTableActive = partialsTableES;
            }

            return React.createElement(
                Row,
                null,
                React.createElement(
                    Col,
                    { xs: 12 },
                    React.createElement(
                        Table,
                        { striped: true, bordered: true, condensed: true, hover: true,
                            style: { 'width': '55%' } },
                        React.createElement(
                            'thead',
                            null,
                            partialsTableActive
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.props.masterAPI.map(function (master, index) {
                                return React.createElement(PartialsTableBody, {
                                    key: index,
                                    index: index + 1,
                                    id: master.id,
                                    date: master.date,
                                    name: master.name,
                                    project: master.project,
                                    total: _this44.props.total
                                });
                            })
                        ),
                        React.createElement(
                            'tfoot',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    '\xA0'
                                ),
                                React.createElement(
                                    'td',
                                    { style: { 'width': '10px',
                                            'font-size': '20px' } },
                                    'Total'
                                ),
                                React.createElement(
                                    'td',
                                    { style: { 'width': '10px',
                                            'font-size': '20px' } },
                                    'RD$',
                                    this.props.total,
                                    '.00'
                                ),
                                React.createElement('br', null),
                                React.createElement('br', null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PartialsTable;
}(React.Component);

var PartialsTableBody = function (_React$Component31) {
    _inherits(PartialsTableBody, _React$Component31);

    function PartialsTableBody() {
        _classCallCheck(this, PartialsTableBody);

        return _possibleConstructorReturn(this, (PartialsTableBody.__proto__ || Object.getPrototypeOf(PartialsTableBody)).apply(this, arguments));
    }

    _createClass(PartialsTableBody, [{
        key: 'render',
        value: function render() {

            console.log(this.props.masterAPI);

            return React.createElement(
                'tr',
                null,
                React.createElement('td', null),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.date
                ),
                React.createElement(
                    'td',
                    {
                        style: { 'font-size': '20px' } },
                    this.props.name
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.project,
                    '.00'
                )
            );
        }
    }]);

    return PartialsTableBody;
}(React.Component);

ReactDOM.render(React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: '/', component: App },
        React.createElement(Route, { path: 'partials', component: Partials }),
        React.createElement(Route, { path: 'updatedetail/:detailid', component: DetailModalUpdate }),
        React.createElement(Route, { path: 'actions/:actionid', component: Actions }),
        React.createElement(Route, { path: 'detail', component: Detail }),
        React.createElement(Route, { path: 'master', component: Master })
    )
), document.getElementById('contents'));