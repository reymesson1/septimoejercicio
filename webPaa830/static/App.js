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
var Label = ReactBootstrap.Label;
var ListGroup = ReactBootstrap.ListGroup;
var Radio = ReactBootstrap.Radio;
var ProgressBar = ReactBootstrap.ProgressBar;
var ListGroupItem = ReactBootstrap.ListGroupItem;
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

var API_URL = 'http://159.203.156.208:8082';

var API_HEADERS = {

    'Content-Type': 'application/json',
    Authentication: 'any-string-you-like'
};

var languageActive = false;

var time = void 0;

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
            customerAPI: [],
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
            });
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this4.setState({

                    customerAPI: responseData
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
                    }),
                    customerAPI: this.state.customerAPI
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

            var added = void 0;

            if (obj) {

                name = obj.name.toUpperCase();

                added = obj.item[0].itemDetail;

                var total = 0;

                for (var x = 0; x < added.length; x++) {
                    total += parseInt(added[x].project);
                }

                added = total;
            }

            var today = moment(new Date()).format('DD-MM-YYYY');

            var customerAPICust = this.props.customerAPI;

            var telefono = void 0;

            for (var x = 0; x < nextState.length; x++) {
                if (nextState[x].id == this.props.parameter) {
                    telefono = nextState[x].item[0].telefono;
                }
            }

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
                                'EL TENDEDERO LAVANDERIA'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'RNC: 131213367'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'GALERIA 360, LOCAL S1-02'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Santo Domingo. D.N.'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Tel.: (809)-378-0140'
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
                                'IdCliente : ',
                                telefono
                            ),
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
                                            { style: { 'width': '15px', 'font-size': '25px', 'border-spacing': '030px' } },
                                            '#'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px' } },
                                            'Cant.'
                                        ),
                                        React.createElement(
                                            'th',
                                            { style: { 'width': '15px', 'font-size': '25px' } },
                                            'Descripcion'
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
                                React.createElement(ActionsTableBodyFooter, {
                                    parameter: this.props.parameter,
                                    masterAPI: this.props.masterAPI,
                                    added: added
                                })
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

            var days = moment(new Date()).add(3, 'days').format('dddd');
            if (days == 'Monday') {
                days = 'Lunes';
            } else if (days == 'Tuesday') {
                days = 'Martes';
            } else if (days == 'Wednesday') {
                days = 'Miercoles';
            } else if (days == 'Thursday') {
                days = 'Jueves';
            } else if (days == 'Friday') {
                days = 'Viernes';
            } else if (days == 'Saturday') {
                days = 'Sabado';
            } else {
                days = 'Domingo';
            }

            var today = moment(new Date()).add(3, 'days').format('DD/MM/YYYY');
            //moment().add(3, 'days').calendar();

            var nextState = this.props.masterAPI;

            var zoom = 0;

            var items = void 0;

            var piezas = 0;

            var servicio = void 0;

            var fechaentrega = void 0;

            var horaentrega = void 0;

            var agregado = void 0;

            var descuento = void 0;

            if (nextState[0]) {

                zoom = nextState[0].project.toFixed(2);
                items = nextState[0].item.length;
                servicio = nextState[0].item[0].development;
                fechaentrega = nextState[0].fechaentrega;
                horaentrega = nextState[0].horaentrega;
                agregado = nextState[0].agregado.toFixed(2);
                descuento = nextState[0].desc.toFixed(2);
                for (var x = 0; x < nextState[0].item.length; x++) {

                    piezas += parseInt(nextState[0].item[x].quantity);
                }
            }

            var itbis = 18 / 100 * zoom;
            itbis += 18 / 100 * this.props.added;

            var grandTotal = zoom + this.props.added + itbis;

            grandTotal -= descuento;

            var nextStateFecha = this.props.masterAPI;

            return React.createElement(
                'tfoot',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        items,
                        'Items'
                    ),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        null,
                        piezas,
                        'Piezas'
                    ),
                    React.createElement('td', null)
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        'SubTotal:'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        zoom
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        '+Agregado:'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        agregado
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        'Desc.:'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        descuento
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        'Itbis:'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        itbis.toFixed(2)
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        'Grand Total:'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'width': '15px', 'font-size': '20px' } },
                        grandTotal.toFixed(2)
                    )
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        'F/Entrega: '
                    ),
                    React.createElement(
                        'td',
                        { colSpan: 2 },
                        fechaentrega
                    ),
                    React.createElement('td', null),
                    React.createElement('td', null)
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        'Hora: '
                    ),
                    React.createElement(
                        'td',
                        null,
                        horaentrega
                    ),
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { colSpan: 3 },
                        servicio
                    ),
                    React.createElement('td', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement('td', null),
                    React.createElement('td', null),
                    React.createElement(
                        'td',
                        { colSpan: 2 },
                        'Aprobacion Cliente'
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { colSpan: 2 },
                        'Le Atendio:'
                    ),
                    React.createElement(
                        'td',
                        null,
                        'Admin'
                    ),
                    React.createElement('td', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('br', null)
                )
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
                        quantity: master.quantity,
                        item: master.item,
                        itemDetail: master.itemDetail,
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

            console.log(this.props.itemDetail);

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    '\u200A\u200A'
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.quantity,
                    ' \u200A '
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    '\u200A',
                    this.props.item,
                    React.createElement(
                        'table',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            this.props.itemDetail.map(function (detail) {
                                return React.createElement(
                                    'td',
                                    null,
                                    '   ',
                                    detail.name
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    ' \u200A\u200A\u200A\u200A\u200A\u200A ',
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
                                        'Lavanderia El Tendedero'
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
                                                { className: 'btn btn-lg btn-success btn-block' },
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
                            { to: '/', onClick: this.onClicked.bind(this) },
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
                            'Ordenes'
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
                        { eventKey: 3, title: 'Reportes', id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: '/partials' },
                                'Cuadre'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { to: '/loader' },
                                'Tracking'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            React.createElement(
                                Link,
                                { to: '/customer' },
                                'Clientes'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            React.createElement(
                                Link,
                                { to: '/partialstwo' },
                                'Cuadre Articulos'
                            )
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
                        { style: { 'float': 'right', 'position': 'absolute', 'left': '80%' } },
                        React.createElement(
                            Link,
                            { onClick: this.onClicked, to: '/logout' },
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
                            { to: '/', onClick: this.onClicked.bind(this) },
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
                        { eventKey: 3, title: 'DropDown', id: 'basic-nav-dropdown' },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: '/partials' },
                                'Draw'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { to: '/loader' },
                                'loaded'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            React.createElement(
                                Link,
                                { to: '/customer' },
                                'Clientes'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.3 },
                            React.createElement(
                                Link,
                                { to: '/partialstwo' },
                                'Draw2'
                            )
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
            detailAdded: [],
            temp: '',
            list: [],
            customerAPI: []
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
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this13.setState({

                    customerAPI: responseData
                });
            });
            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this13.setState({

                    detailData: responseData
                });
            });
            fetch(API_URL + '/list', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this13.setState({

                    list: responseData
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

            var agregado = 0;

            var itbis = 0;

            for (var x = 0; x < details.length; x++) {
                if (details[x].itemDetail.length > 0) {
                    for (var y = 0; y < details[x].itemDetail.length; y++) {
                        zoom += parseInt(details[x].itemDetail[y].project);
                        agregado += parseInt(details[x].itemDetail[y].project);
                    }
                }
            }

            //items sumado sin agregado
            for (var x = 0; x < details.length; x++) {
                zoom += parseInt(details[x].project);
            }

            itbis = 18 / 100 * zoom;
            itbis += 18 / 100 * agregado;

            var grandTotal = zoom + agregado + itbis;

            var nextStateCustomer = this.state.customerAPI;

            var descuento = void 0;

            for (var x = 0; x < nextStateCustomer.length; x++) {

                var completename = nextStateCustomer[x].name + ' ' + nextStateCustomer[x].apellido;

                if (completename == name) {
                    descuento = nextStateCustomer[x].descuento;
                }
            }

            //console.log((parseInt(descuento)/100)*grandTotal);

            var grandDescuento = parseInt(descuento) / 100 * grandTotal;

            grandTotal -= grandDescuento;

            var days = moment(new Date()).add(3, 'days').format('dddd');

            if (days == 'Monday') {
                days = 'Lunes';
            } else if (days == 'Tuesday') {
                days = 'Martes';
            } else if (days == 'Wednesday') {
                days = 'Miercoles';
            } else if (days == 'Thursday') {
                days = 'Jueves';
            } else if (days == 'Friday') {
                days = 'Viernes';
            } else if (days == 'Saturday') {
                days = 'Sabado';
            } else {
                days = 'Domingo';
            }

            var fechaentrega = moment(new Date()).add(3, 'days').format('DD/MM/YYYY');

            var horaentrega = '06:00 PM';

            var newMaster = {

                "id": Date.now(),
                "date": today,
                "name": name,
                "item": this.state.masterDetail,
                "project": zoom,
                "agregado": agregado,
                "desc": grandDescuento,
                "itbis": itbis,
                "grandTotal": grandTotal,
                "fechaentrega": days + ' ' + fechaentrega,
                "horaentrega": horaentrega,
                "balance": 0,
                "pending": 0,
                "current": 0,
                "tipopago": "",
                "ncf": "A00000000000001",
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

            var itemFirst = event.target.suggest.value;

            var project = void 0;

            var category = void 0;

            for (var x = 0; x < detailTotal.length; x++) {
                if (detailTotal[x].name == itemFirst) {
                    if (event.target.environment) {

                        if (event.target.environment.value.length > 0) {

                            project = event.target.environment.value;
                        }
                    } else {

                        project = detailTotal[x].environment;
                    }
                    category = detailTotal[x].category;
                }
            }

            var newItem = void 0;

            var newStateDetailAdded = [];

            var temp = void 0;

            if (project) {

                newStateDetailAdded = this.state.detailAdded;

                //if(category=='shine'||category=='properties'){
                if (category == 'colores' || category == 'propiedades') {

                    var newItemAdded = {

                        "name": itemFirst,
                        "project": project

                    };

                    newStateDetailAdded.push(newItemAdded);

                    this.setState({

                        detailAdded: newStateDetailAdded
                    });
                } else if (category == 'servicio') {
                    //}else if(category=='service'){

                    this.setState({

                        temp: event.target.suggest.value
                    });

                    temp = event.target.suggest.value;

                    if (this.state.temp != event.target.suggest.value) {
                        newStateDetailAdded = [];
                        this.setState({
                            detailAdded: []
                        });
                    }

                    project = project * parseInt(event.target.quantity.value);

                    var nextStateCust = this.state.customerAPI;

                    var fullname = void 0;

                    var telefono = void 0;

                    for (var x = 0; x < nextStateCust.length; x++) {

                        if (nextStateCust[x].telefono == event.target.firstname.value) {
                            fullname = nextStateCust[x].name + ' ' + nextStateCust[x].apellido;
                            telefono = event.target.firstname.value;
                        }
                    }

                    newItem = {

                        "id": Date.now(),
                        "firstname": fullname,
                        "telefono": telefono,
                        "item": event.target.suggest.value,
                        "itemDetail": this.state.detailAdded,
                        "development": event.target.development.value,
                        "quantity": event.target.quantity.value,
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
                'Agregar Orden'
            );

            var MasterTableEN = "Master List";

            var MasterTableES = "Listado de Ordenes";

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

                            detailAdded: this.state.detailAdded,

                            masterDetail: this.state.masterDetail,
                            detail: this.state.detail,
                            showModal: this.state.showModal,
                            list: this.state.list,
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
                    { header: 'Busqueda de Ordenes' },
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
                    'Fecha de Entrega'
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

                                fechaentrega: todo.fechaentrega,

                                horaentrega: todo.horaentrega,

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
        key: 'onExchange',
        value: function onExchange(data) {

            fetch(API_URL + '/main', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": data })
            });

            var nextState = this.props.masterAPI;

            browserHistory.push("/main");
        }
    }, {
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
                    this.props.fechaentrega,
                    this.props.horaentrega
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
                        { className: 'btn btn-default', to: '/actions/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-eye', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/updatedelivery/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-edit', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/payment/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-dollar', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Button,
                        { onClick: this.onExchange.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-exchange', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Button,
                        { onClick: this.props.masterCallback.ondeletemaster.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0'
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
                'Agregar Ordenes'
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
                            list: this.props.list,
                            masterCallback: this.props.masterCallback
                        }),
                        React.createElement('br', null),
                        this.props.detailAdded.map(function (added) {
                            return React.createElement(MasterModalLabel, {
                                name: added.name
                            });
                        }),
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

var MasterModalLabel = function (_React$Component15) {
    _inherits(MasterModalLabel, _React$Component15);

    function MasterModalLabel() {
        _classCallCheck(this, MasterModalLabel);

        return _possibleConstructorReturn(this, (MasterModalLabel.__proto__ || Object.getPrototypeOf(MasterModalLabel)).apply(this, arguments));
    }

    _createClass(MasterModalLabel, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'span',
                null,
                React.createElement(
                    Label,
                    { bsStyle: 'warning' },
                    this.props.name
                ),
                '\xA0'
            );
        }
    }]);

    return MasterModalLabel;
}(React.Component);

var AwesompleteInput = function (_React$Component16) {
    _inherits(AwesompleteInput, _React$Component16);

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

            //window.addEventListener("awesomplete-selectcomplete",this.onSelectComplete,false);

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

var AwesompleteInputList = function (_React$Component17) {
    _inherits(AwesompleteInputList, _React$Component17);

    function AwesompleteInputList() {
        _classCallCheck(this, AwesompleteInputList);

        return _possibleConstructorReturn(this, (AwesompleteInputList.__proto__ || Object.getPrototypeOf(AwesompleteInputList)).apply(this, arguments));
    }

    _createClass(AwesompleteInputList, [{
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

            //window.addEventListener("awesomplete-selectcomplete",this.onSelectComplete,false);

            this.state = {
                value: this.props.value || this.props.defaultValue || ''
            };

            if (this.props.id != null) this._id = this.props.id;else this._id = 'awesompletelist-' + Math.random().toString(36).substring(7);
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
            var className = "awesompletelist";
            var placeholder = this.props.placeholder || '';
            if (this.props.className) className += ' ' + this.props.className;

            return React.createElement('input', { style: { "width": "181%", "color": "black" },
                id: this._id,
                value: this.state.value,
                onChange: this.onChange,
                className: className,
                placeholder: placeholder,
                name: 'firstname'
            });
        }
    }]);

    return AwesompleteInputList;
}(React.Component);

var MasterModalField = function (_React$Component18) {
    _inherits(MasterModalField, _React$Component18);

    function MasterModalField() {
        _classCallCheck(this, MasterModalField);

        var _this23 = _possibleConstructorReturn(this, (MasterModalField.__proto__ || Object.getPrototypeOf(MasterModalField)).call(this));

        _this23.state = {

            value: '',
            alter: false
        };
        return _this23;
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
        key: 'onChangeAlter',
        value: function onChangeAlter(event) {

            var nextState = this.state.alter;

            if (event.target.value == 'Alteracion') {
                this.setState({

                    alter: true
                });
            }
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
                                React.createElement(AwesompleteInputList, { name: 'firstname', className: 'form-control', list: this.props.list })
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
                                React.createElement(FormControl, { type: 'number', name: 'quantity', placeholder: 'Project', required: true })
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

            var MasterModalFieldAlteration = void 0;

            if (this.state.alter) {

                MasterModalFieldAlteration = React.createElement(
                    Row,
                    null,
                    React.createElement(
                        FormGroup,
                        { controlId: 'formHorizontalQuantity' },
                        React.createElement(
                            Col,
                            { componentClass: ControlLabel, md: 1, sm: 2 },
                            'Precio'
                        ),
                        React.createElement(
                            Col,
                            { md: 4, sm: 6 },
                            React.createElement(FormControl, { type: 'text', name: 'environment', placeholder: 'Precio' })
                        )
                    )
                );
            } else {

                MasterModalFieldAlteration = React.createElement('div', null);
            }

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
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(AwesompleteInputList, { name: 'firstname', className: 'form-control', list: this.props.list })
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
                                    { onChange: this.onChangeAlter.bind(this), componentClass: 'select', name: 'development', placeholder: 'Tipo de Servicio', required: true },
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
                            )
                        )
                    ),
                    React.createElement('br', null),
                    MasterModalFieldAlteration,
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalQuantity' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: 'number', name: 'quantity', placeholder: 'Cantidad', required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
                                )
                            )
                        )
                    ),
                    React.createElement('br', null)
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

var MasterModalTable = function (_React$Component19) {
    _inherits(MasterModalTable, _React$Component19);

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
                    'Star'
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
                    'Cantidad'
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

                                project: masterdetail.project,

                                quantity: masterdetail.quantity
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterModalTable;
}(React.Component);

var MasterModalTableBodyAdded = function (_React$Component20) {
    _inherits(MasterModalTableBodyAdded, _React$Component20);

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
                    React.createElement('i', { className: 'fa fa-arrow-circle-o-right',
                        'aria-hidden': 'true' })
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

var MasterModalTableBodyAddedTotal = function (_React$Component21) {
    _inherits(MasterModalTableBodyAddedTotal, _React$Component21);

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

var MasterModalTableBody = function (_React$Component22) {
    _inherits(MasterModalTableBody, _React$Component22);

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
                        this.props.quantity
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

var Detail = function (_React$Component23) {
    _inherits(Detail, _React$Component23);

    function Detail() {
        _classCallCheck(this, Detail);

        var _this28 = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this));

        _this28.state = {
            showModal: false,
            showModalLoader: false,
            filterText: '',
            detailData: []
        };
        return _this28;
    }

    _createClass(Detail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this29 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this29.setState({

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
        key: 'closeLoader',
        value: function closeLoader() {
            this.setState({
                showModalLoader: false
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
        key: 'openLoader',
        value: function openLoader() {
            this.setState({
                showModalLoader: true
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
                        }),
                        React.createElement(DetailLoaderModal, { showModal: this.state.showModalLoader,
                            detailCallback: {
                                open: this.openLoader,
                                close: this.closeLoader.bind(this),
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

var DetailSearch = function (_React$Component24) {
    _inherits(DetailSearch, _React$Component24);

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

var DetailTable = function (_React$Component25) {
    _inherits(DetailTable, _React$Component25);

    function DetailTable() {
        _classCallCheck(this, DetailTable);

        var _this31 = _possibleConstructorReturn(this, (DetailTable.__proto__ || Object.getPrototypeOf(DetailTable)).call(this));

        _this31.state = {
            todos: [{ id: '123', date: '2017-10-09', name: 'sas', item: 'test.item', environment: 'dev' }, { id: '454758778052139', date: '2017-10-09', name: 'sas', item: 'test.item', environment: 'dev' }],
            currentPage: 1,
            todosPerPage: 10
        };
        _this31.handleClick = _this31.handleClick.bind(_this31);
        return _this31;
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
            var _this32 = this;

            var filteredTable = this.props.detailData.filter(function (detail) {
                return detail.name.indexOf(_this32.props.filterText) !== -1;
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
                        onClick: _this32.handleClick
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

                                detailCallback: _this32.props.detailCallback
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

                                detailCallback: _this32.props.detailCallback
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

var DetailModalUpdate = function (_React$Component26) {
    _inherits(DetailModalUpdate, _React$Component26);

    function DetailModalUpdate() {
        _classCallCheck(this, DetailModalUpdate);

        var _this33 = _possibleConstructorReturn(this, (DetailModalUpdate.__proto__ || Object.getPrototypeOf(DetailModalUpdate)).call(this));

        _this33.state = {

            parameter: '',
            showModal: true,
            detailData: []
        };

        return _this33;
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
            var _this34 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this34.setState({

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
            var _this35 = this;

            event.preventDefault();

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this35.state.parameter;
            });

            nextState[index].environment = event.target.environment.value;

            var today = moment(new Date()).format('YYYY-MM-DD');

            nextState[index].date = today;

            this.setState({

                detailData: nextState
            });

            fetch(API_URL + '/updatedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "environment": event.target.environment.value, "date": today })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this36 = this;

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this36.state.parameter;
            });

            var name = void 0;
            var environment = void 0;
            var item = void 0;
            var category = void 0;

            if (nextState[index]) {

                name = nextState[index].name;
                environment = nextState[index].environment;
                item = nextState[index].item;
                category = nextState[index].category;
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
                            'Editando a ',
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
                                React.createElement(FormControl, { value: this.state.parameter, type: 'id', placeholder: 'id', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Descripcion'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'name', value: name, type: 'text', placeholder: 'Descripcion', disabled: true })
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
                                React.createElement(FormControl, { name: 'environment', type: 'text', placeholder: 'Precio' })
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
                                React.createElement(FormControl, { name: 'item', type: 'text', placeholder: item, disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalCategory' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Categoria'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'category', type: 'text', value: category, disabled: true })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit' },
                            'Guardar'
                        )
                    )
                )
            );
        }
    }]);

    return DetailModalUpdate;
}(React.Component);

var DetailTableBody = function (_React$Component27) {
    _inherits(DetailTableBody, _React$Component27);

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

var DetailModal = function (_React$Component28) {
    _inherits(DetailModal, _React$Component28);

    function DetailModal() {
        _classCallCheck(this, DetailModal);

        return _possibleConstructorReturn(this, (DetailModal.__proto__ || Object.getPrototypeOf(DetailModal)).apply(this, arguments));
    }

    _createClass(DetailModal, [{
        key: 'render',
        value: function render() {

            var DetailModalEN = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
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
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'ID'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'id', placeholder: 'ID' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Name'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'name', placeholder: 'Name' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Environment'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'environment', placeholder: 'Environment' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Item'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'item', placeholder: 'Item' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalHost' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Host'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'host', placeholder: 'Host' })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: 'submit',
                                pullRight: true },
                            'Save'
                        )
                    )
                )
            );
            var DetailModalES = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
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
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalid' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Codigo'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'id', placeholder: 'Codigo' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalname' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Descripcion'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'name', placeholder: 'Descripcion' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalEnvironment' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Precio'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'environment', placeholder: 'Precio' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Cantidad'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: 'text', name: 'item', placeholder: 'Cantidad' })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                'Categoria'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(
                                    FormControl,
                                    {
                                        name: 'category', componentClass: 'select', placeholder: 'select' },
                                    React.createElement(
                                        'option',
                                        {
                                            value: 'servicio' },
                                        'Servicio'
                                    ),
                                    React.createElement(
                                        'option',
                                        {
                                            value: 'colores' },
                                        'Colores'
                                    ),
                                    React.createElement(
                                        'option',
                                        {
                                            value: 'propiedades' },
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
                            { type: 'submit',
                                pullRight: true },
                            'Guardar'
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

var DetailLoaderModal = function (_React$Component29) {
    _inherits(DetailLoaderModal, _React$Component29);

    function DetailLoaderModal() {
        _classCallCheck(this, DetailLoaderModal);

        return _possibleConstructorReturn(this, (DetailLoaderModal.__proto__ || Object.getPrototypeOf(DetailLoaderModal)).apply(this, arguments));
    }

    _createClass(DetailLoaderModal, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Modal,
                { style: { 'margin-top': '15%', 'overflow': 'hidden' }, show: this.props.showModal },
                React.createElement(
                    Modal.Header,
                    null,
                    React.createElement(
                        Modal.Title,
                        null,
                        'Loading...'
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(ProgressBar, { active: true, now: 99 })
                )
            );
        }
    }]);

    return DetailLoaderModal;
}(React.Component);

var Partials = function (_React$Component30) {
    _inherits(Partials, _React$Component30);

    function Partials() {
        _classCallCheck(this, Partials);

        var _this40 = _possibleConstructorReturn(this, (Partials.__proto__ || Object.getPrototypeOf(Partials)).call(this));

        _this40.state = {

            masterAPI: [],
            searchData: '2017-10-06',
            total: 0
        };

        return _this40;
    }

    _createClass(Partials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this41 = this;

            fetch(API_URL + '/reporte', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this41.setState({

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
            var _this42 = this;

            var nextState = this.state.masterAPI.filter(function (master) {
                return master.date == _this42.state.searchData;
            });

            var grand = 0;

            for (var x = 0; x < nextState.length; x++) {
                grand += parseInt(nextState[x].grandTotal);
            }

            this.setState({

                total: grand
            });

            window.print();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this43 = this;

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
                            return master.date == _this43.state.searchData;
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

var PartialsSearch = function (_React$Component31) {
    _inherits(PartialsSearch, _React$Component31);

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

var PartialsTable = function (_React$Component32) {
    _inherits(PartialsTable, _React$Component32);

    function PartialsTable() {
        _classCallCheck(this, PartialsTable);

        return _possibleConstructorReturn(this, (PartialsTable.__proto__ || Object.getPrototypeOf(PartialsTable)).apply(this, arguments));
    }

    _createClass(PartialsTable, [{
        key: 'render',
        value: function render() {
            var _this46 = this;

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
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Precio'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'TP'
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
                                    grandTotal: master.grandTotal,
                                    tipopago: master.tipopago,
                                    total: _this46.props.total
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
                                    this.props.total.toFixed(2)
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

var PartialsTableBody = function (_React$Component33) {
    _inherits(PartialsTableBody, _React$Component33);

    function PartialsTableBody() {
        _classCallCheck(this, PartialsTableBody);

        return _possibleConstructorReturn(this, (PartialsTableBody.__proto__ || Object.getPrototypeOf(PartialsTableBody)).apply(this, arguments));
    }

    _createClass(PartialsTableBody, [{
        key: 'render',
        value: function render() {

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
                    { style: { 'font-size': '20px' } },
                    this.props.name
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.grandTotal.toFixed(2)
                ),
                React.createElement(
                    'td',
                    { style: { 'font-size': '20px' } },
                    this.props.tipopago.toUpperCase().substring(0, 1)
                )
            );
        }
    }]);

    return PartialsTableBody;
}(React.Component);

var Loader = function (_React$Component34) {
    _inherits(Loader, _React$Component34);

    function Loader() {
        _classCallCheck(this, Loader);

        var _this48 = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));

        _this48.state = {

            showModal: false,
            inputText: '',
            masterAPI: []
        };
        return _this48;
    }

    _createClass(Loader, [{
        key: 'close',
        value: function close() {
            this.setState({ showModal: false });

            window.clearTimeout(time);
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({ showModal: true });

            time = window.setTimeout(function (msg) {
                var _this49 = this;

                fetch(API_URL + '/loader', {

                    method: 'post',
                    headers: API_HEADERS,
                    body: JSON.stringify({ "id": this.state.inputText })
                }).then(function (response) {
                    return response.json();
                }).then(function (responseData) {
                    _this49.setState({

                        masterAPI: responseData
                    });
                });

                this.close();
            }.bind(this), 3000);
        }
    }, {
        key: 'onSubmitSearch',
        value: function onSubmitSearch(event) {

            event.preventDefault();

            this.setState({

                inputText: event.target.loadersearch.value
            });

            this.open();
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Panel,
                        { header: 'Search Loader' },
                        React.createElement(LoaderSearch, {
                            showModal: this.state.showModal,
                            loaderCallback: {
                                open: this.open.bind(this),
                                close: this.close.bind(this),
                                onsubmitsearch: this.onSubmitSearch.bind(this)
                            }
                        }),
                        React.createElement('br', null),
                        React.createElement(Col, { componentClass: ControlLabel, sm: 2 }),
                        React.createElement(
                            Col,
                            { componentClass: ControlLabel, sm: 10 },
                            React.createElement(LoaderModal, {
                                showModal: this.state.showModal,
                                loaderCallback: {
                                    open: this.open.bind(this),
                                    close: this.close.bind(this)
                                }
                            })
                        )
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement('h4', null)
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(LoaderListGroup, {
                        masterAPI: this.state.masterAPI
                    })
                )
            );
        }
    }]);

    return Loader;
}(React.Component);

var LoaderSearch = function (_React$Component35) {
    _inherits(LoaderSearch, _React$Component35);

    function LoaderSearch() {
        _classCallCheck(this, LoaderSearch);

        return _possibleConstructorReturn(this, (LoaderSearch.__proto__ || Object.getPrototypeOf(LoaderSearch)).apply(this, arguments));
    }

    _createClass(LoaderSearch, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Form,
                { horizontal: true, onSubmit: this.props.loaderCallback.onsubmitsearch.bind(this) },
                React.createElement(
                    FormGroup,
                    { controlId: 'formHorizontalEmail' },
                    React.createElement(
                        Col,
                        { componentClass: ControlLabel, sm: 2 },
                        'Search:'
                    ),
                    React.createElement(
                        Col,
                        { sm: 10 },
                        React.createElement(FormControl, { name: 'loadersearch', type: 'text', placeholder: 'Search', required: true })
                    )
                ),
                React.createElement(
                    Col,
                    { smOffset: 2 },
                    React.createElement(
                        Button,
                        { type: 'submit' },
                        'Get Loader'
                    )
                )
            );
        }
    }]);

    return LoaderSearch;
}(React.Component);

var LoaderListGroup = function (_React$Component36) {
    _inherits(LoaderListGroup, _React$Component36);

    function LoaderListGroup() {
        _classCallCheck(this, LoaderListGroup);

        return _possibleConstructorReturn(this, (LoaderListGroup.__proto__ || Object.getPrototypeOf(LoaderListGroup)).apply(this, arguments));
    }

    _createClass(LoaderListGroup, [{
        key: 'render',
        value: function render() {

            var nextState = this.props.masterAPI;

            var date = nextState.date;

            var datedel = nextState.fechaentrega;

            var status = nextState.status;

            return React.createElement(
                Panel,
                { header: 'This Loader' },
                React.createElement(
                    ListGroup,
                    null,
                    React.createElement(
                        ListGroupItem,
                        { href: '#link1' },
                        'Date created: ',
                        React.createElement(
                            Label,
                            { bsStyle: 'success' },
                            date
                        )
                    ),
                    React.createElement(
                        ListGroupItem,
                        { href: '#link2' },
                        'Last update: ',
                        React.createElement(
                            Label,
                            { bsStyle: 'success' },
                            datedel
                        )
                    ),
                    React.createElement(
                        ListGroupItem,
                        { href: '#link2' },
                        'Comment: ',
                        React.createElement(
                            Label,
                            { bsStyle: 'success' },
                            status
                        )
                    ),
                    React.createElement(
                        ListGroupItem,
                        { href: '#link2' },
                        'Comments: ',
                        React.createElement(
                            'span',
                            null,
                            'Coments'
                        )
                    )
                )
            );
        }
    }]);

    return LoaderListGroup;
}(React.Component);

var LoaderModal = function (_React$Component37) {
    _inherits(LoaderModal, _React$Component37);

    function LoaderModal() {
        _classCallCheck(this, LoaderModal);

        return _possibleConstructorReturn(this, (LoaderModal.__proto__ || Object.getPrototypeOf(LoaderModal)).apply(this, arguments));
    }

    _createClass(LoaderModal, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Modal,
                { style: { 'margin-top': '15%', 'overflow': 'hidden' }, show: this.props.showModal },
                React.createElement(
                    Modal.Header,
                    null,
                    React.createElement(
                        Modal.Title,
                        null,
                        'Loading...'
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(ProgressBar, { active: true, now: 99 })
                )
            );
        }
    }]);

    return LoaderModal;
}(React.Component);

var Customer = function (_React$Component38) {
    _inherits(Customer, _React$Component38);

    function Customer() {
        _classCallCheck(this, Customer);

        var _this53 = _possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).call(this));

        _this53.state = {

            showModal: false,
            customerAPI: []
        };
        return _this53;
    }

    _createClass(Customer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this54 = this;

            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this54.setState({

                    customerAPI: responseData
                });
            });

            this.setState({

                parameter: this.props.params.mainactionid
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
        key: 'onSaveCustomer',
        value: function onSaveCustomer(event) {

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var discount = void 0;

            if (event.target.descuento.value.length == 0) {
                discount = "0";
            } else {
                discount = event.target.descuento.value;
            }

            var newCustomer = {

                "id": Date.now(),
                "name": event.target.nombre.value,
                "apellido": event.target.apellido.value,
                "telefono": event.target.telefono.value,
                "rnc": event.target.rnc.value,
                "fechacumpleano": event.target.fechacumpleano.value,
                "facebook": event.target.facebook.value,
                "correoelectronico": event.target.correoelectronico.value,
                "descuento": discount,
                "created": today

            };

            console.log(newCustomer);

            fetch(API_URL + '/customer', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCustomer)
            });

            var nextState = this.state.customerAPI;

            nextState.push(newCustomer);

            this.setState({

                customerAPI: nextState
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(CustomerSearch, null)
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        React.createElement(
                            Button,
                            { onClick: this.open.bind(this) },
                            'Agregar Cliente'
                        ),
                        React.createElement(CustomerModal, {
                            showModal: this.state.showModal,
                            customerCallback: {
                                open: this.open.bind(this),
                                close: this.close.bind(this),
                                onsavecustomer: this.onSaveCustomer.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(CustomerTable, {
                        customer: this.state.customerAPI
                    })
                )
            );
        }
    }]);

    return Customer;
}(React.Component);

var CustomerTable = function (_React$Component39) {
    _inherits(CustomerTable, _React$Component39);

    function CustomerTable() {
        _classCallCheck(this, CustomerTable);

        return _possibleConstructorReturn(this, (CustomerTable.__proto__ || Object.getPrototypeOf(CustomerTable)).apply(this, arguments));
    }

    _createClass(CustomerTable, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Panel,
                { header: 'Listado de Cliente' },
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
                                'Apellido'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Telefono'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'RNC'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Fecha Cumplea\xF1o'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Facebook'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Correo Electrico'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.customer.map(function (cliente, index) {
                            return React.createElement(CustomerTablebody, {
                                key: index,
                                index: index,
                                id: cliente.id,
                                name: cliente.name,
                                apellido: cliente.apellido,
                                telefono: cliente.telefono,
                                rnc: cliente.rnc,
                                fechacumpleano: cliente.fechacumpleano,
                                facebook: cliente.facebook,
                                correoelectronico: cliente.correoelectronico
                            });
                        })
                    )
                )
            );
        }
    }]);

    return CustomerTable;
}(React.Component);

var CustomerTablebody = function (_React$Component40) {
    _inherits(CustomerTablebody, _React$Component40);

    function CustomerTablebody() {
        _classCallCheck(this, CustomerTablebody);

        return _possibleConstructorReturn(this, (CustomerTablebody.__proto__ || Object.getPrototypeOf(CustomerTablebody)).apply(this, arguments));
    }

    _createClass(CustomerTablebody, [{
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
                    this.props.apellido
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.telefono
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.rnc
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.fechacumpleano
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.facebook
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.correoelectronico
                )
            );
        }
    }]);

    return CustomerTablebody;
}(React.Component);

var CustomerSearch = function (_React$Component41) {
    _inherits(CustomerSearch, _React$Component41);

    function CustomerSearch() {
        _classCallCheck(this, CustomerSearch);

        return _possibleConstructorReturn(this, (CustomerSearch.__proto__ || Object.getPrototypeOf(CustomerSearch)).apply(this, arguments));
    }

    _createClass(CustomerSearch, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Panel,
                { header: 'Busqueda de cliente' },
                React.createElement(
                    Form,
                    { horizontal: true },
                    React.createElement(
                        FormGroup,
                        { controlId: 'formHorizontalEmail' },
                        React.createElement(
                            Col,
                            { componentClass: ControlLabel, sm: 2 },
                            'Buscar'
                        ),
                        React.createElement(
                            Col,
                            { sm: 10 },
                            React.createElement(FormControl, { type: 'text', placeholder: 'Buscar' })
                        )
                    )
                )
            );
        }
    }]);

    return CustomerSearch;
}(React.Component);

var CustomerModal = function (_React$Component42) {
    _inherits(CustomerModal, _React$Component42);

    function CustomerModal() {
        _classCallCheck(this, CustomerModal);

        return _possibleConstructorReturn(this, (CustomerModal.__proto__ || Object.getPrototypeOf(CustomerModal)).apply(this, arguments));
    }

    _createClass(CustomerModal, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Modal,
                { show: this.props.showModal, onHide: this.props.customerCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Agregar Cliente'
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true, onSubmit: this.props.customerCallback.onsavecustomer.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Nombre'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'nombre', type: 'text', placeholder: 'Nombre' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Apellido'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'apellido', type: 'text', placeholder: 'Apellido' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Telefono'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'telefono', type: 'text', placeholder: 'Telefono' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'RNC'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'rnc', type: 'text', placeholder: 'RNC' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Fecha de Cumplea\xF1os'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'fechacumpleano', type: 'date', placeholder: 'Fecha de Cumplea\xF1os' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Facebook'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'facebook', type: 'text', placeholder: 'Facebook' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Correo Electronico'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'correoelectronico', type: 'text', placeholder: 'Correo Electrico' })
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                React.createElement(
                                    Col,
                                    { componentClass: ControlLabel, sm: 2 },
                                    'Descuento'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'descuento', type: 'text', placeholder: 'Descuento' })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    'Guardar'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CustomerModal;
}(React.Component);

var UpdateDelivery = function (_React$Component43) {
    _inherits(UpdateDelivery, _React$Component43);

    function UpdateDelivery() {
        _classCallCheck(this, UpdateDelivery);

        var _this59 = _possibleConstructorReturn(this, (UpdateDelivery.__proto__ || Object.getPrototypeOf(UpdateDelivery)).call(this));

        _this59.state = {

            showModal: true,
            parameter: 0,
            masterAPI: []
        };
        return _this59;
    }

    _createClass(UpdateDelivery, [{
        key: 'close',
        value: function close() {

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this60 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this60.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.deliveryid
            });
        }
    }, {
        key: 'onSubmitted',
        value: function onSubmitted(event) {
            var _this61 = this;

            event.preventDefault();

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this61.state.parameter;
            });

            var newUpdate = {

                "index": index,
                "fechaentrega": event.target.fechaentrega.value
            };

            fetch(API_URL + '/updatedelivery', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newUpdate)
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Actualizacion de Fecha Entrega'
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(
                        Form,
                        { horizontal: true, onSubmit: this.onSubmitted.bind(this) },
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEmail' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Fecha de Entrega'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'fechaentrega', type: 'date', placeholder: 'Fecha de Entrega' }),
                                React.createElement(
                                    Button,
                                    { type: 'submit' },
                                    'Actualizar'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return UpdateDelivery;
}(React.Component);

var Payment = function (_React$Component44) {
    _inherits(Payment, _React$Component44);

    function Payment() {
        _classCallCheck(this, Payment);

        var _this62 = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this));

        _this62.state = {

            showModal: true,
            parameter: 0,
            masterAPI: [],
            balance: 0,
            pendiente: 0,
            actual: 0
        };
        return _this62;
    }

    _createClass(Payment, [{
        key: 'close',
        value: function close() {

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this63 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this63.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.paymentid
            });
        }
    }, {
        key: 'onSubmitted',
        value: function onSubmitted(event) {
            var _this64 = this;

            event.preventDefault();

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this64.state.parameter;
            });

            var newUpdate = {

                "index": index,
                "fechaentrega": event.target.fechaentrega.value
            };
        }
    }, {
        key: 'close',
        value: function close() {

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'onChanged',
        value: function onChanged(event) {

            this.setState({
                pendiente: event.target.value
            });
        }
    }, {
        key: 'onSubmitted',
        value: function onSubmitted(event) {

            event.preventDefault();

            var newPago = {

                "id": this.state.parameter,
                "balance": event.target.balance.value,
                "current": event.target.current.value,
                "pending": event.target.pending.value,
                "tipopago": event.target.radioGroup.value
            };

            fetch(API_URL + '/payment', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPago)
            });

            time = window.setTimeout(function (msg) {

                this.setState({

                    showModal: false
                });

                browserHistory.push("/printpayment/" + this.state.parameter);
            }.bind(this), 3000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this65 = this;

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this65.state.parameter;
            });

            var balance = 0;

            var pendiente = 0;

            if (nextState[index]) {

                balance = nextState[index].grandTotal;
                pendiente = nextState[index].grandTotal - parseInt(this.state.pendiente);
            }

            return React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close.bind(this) },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Proceso de Pago | Orden No. ',
                        this.props.params.paymentid
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(
                        Form,
                        { horizontal: true, onSubmit: this.onSubmitted.bind(this) },
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalEmail' },
                            React.createElement('br', null),
                            React.createElement(
                                Row,
                                null,
                                React.createElement(
                                    Col,
                                    { sm: 4 },
                                    React.createElement(
                                        'label',
                                        null,
                                        'Balance'
                                    ),
                                    React.createElement(FormControl, { name: 'balance', type: 'number', value: balance.toFixed(2), placeholder: 'Balance', disabled: true })
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 4 },
                                    React.createElement(
                                        'label',
                                        null,
                                        'Actual'
                                    ),
                                    React.createElement(FormControl, { name: 'current', onChange: this.onChanged.bind(this), type: 'number', placeholder: 'Actual' })
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 4 },
                                    React.createElement(
                                        'label',
                                        null,
                                        'Pendiente'
                                    ),
                                    React.createElement(FormControl, { name: 'pending', value: pendiente.toFixed(2), type: 'number', placeholder: 'Pendiente', disabled: true })
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                Row,
                                null,
                                React.createElement(
                                    Col,
                                    { smOffset: 4 },
                                    React.createElement(
                                        FormGroup,
                                        null,
                                        React.createElement(
                                            Radio,
                                            { value: 'tarjeta', name: 'radioGroup', inline: true },
                                            React.createElement(
                                                'h1',
                                                null,
                                                React.createElement('i', { className: 'fa fa-cc-visa', 'aria-hidden': 'true' })
                                            )
                                        ),
                                        ' ',
                                        React.createElement(
                                            Radio,
                                            { value: 'efectivo', name: 'radioGroup', inline: true },
                                            React.createElement(
                                                'h1',
                                                null,
                                                React.createElement('i', { className: 'fa fa-money', 'aria-hidden': 'true' })
                                            )
                                        ),
                                        ' ',
                                        React.createElement(
                                            Radio,
                                            { value: 'cheque', name: 'radioGroup', inline: true },
                                            React.createElement(
                                                'h1',
                                                null,
                                                React.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                Button,
                                { type: 'submit' },
                                'Guardar'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Payment;
}(React.Component);

var PrintPayment = function (_React$Component45) {
    _inherits(PrintPayment, _React$Component45);

    function PrintPayment() {
        _classCallCheck(this, PrintPayment);

        var _this66 = _possibleConstructorReturn(this, (PrintPayment.__proto__ || Object.getPrototypeOf(PrintPayment)).call(this));

        _this66.state = {

            masterAPI: [],
            customerAPI: [],
            detailData: [],
            list: []
        };
        return _this66;
    }

    _createClass(PrintPayment, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this67 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this67.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this67.setState({

                    customerAPI: responseData
                });
            });
            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this67.setState({

                    detailData: responseData
                });
            });
            fetch(API_URL + '/list', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this67.setState({

                    list: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this68 = this;

            var filteredTable = this.state.masterAPI.filter(function (master) {
                return master.id == _this68.props.params.printid;
            });

            var name = void 0;

            var ncf = void 0;

            if (filteredTable[0]) {

                name = filteredTable[0].name;
                ncf = filteredTable[0].ncf;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { sm: 4 },
                        React.createElement(
                            Table,
                            { striped: true, bordered: true, condensed: true, hover: true },
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { colspan: '4' },
                                    'Factura'
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    'Nombre'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    name
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    'NCF'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    ncf
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { sm: 4 },
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
                                        'Balance'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Actual'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Pendiente'
                                    )
                                )
                            ),
                            React.createElement(
                                'tbody',
                                null,
                                filteredTable.map(function (master, index) {
                                    return React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            null,
                                            master.balance
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            master.current
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            master.pending
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PrintPayment;
}(React.Component);

var Home = function (_React$Component46) {
    _inherits(Home, _React$Component46);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'panel panel-warning' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { xs: 6 },
                                        React.createElement('i', { className: 'fa fa-usd fa-5x' })
                                    ),
                                    React.createElement(
                                        Col,
                                        { xs: 6, className: 'text-right' },
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-heading' },
                                            'R$ 950 mil'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-text' },
                                            'Revenue'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'panel panel-info' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { xs: 6 },
                                        React.createElement('i', { className: 'fa fa-list-ol fa-5x' })
                                    ),
                                    React.createElement(
                                        Col,
                                        { xs: 6, className: 'text-right' },
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-heading' },
                                            '4'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-text' },
                                            'Customers'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'panel panel-danger' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { xs: 6 },
                                        React.createElement('i', { className: 'fa fa-area-chart fa-5x' })
                                    ),
                                    React.createElement(
                                        Col,
                                        { xs: 6, className: 'text-right' },
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-heading' },
                                            '2,3 Months'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-text' },
                                            'Average time'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'panel panel-success' },
                            React.createElement(
                                'div',
                                { className: 'panel-heading' },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { xs: 6 },
                                        React.createElement('i', { className: 'fa fa-money fa-5x' })
                                    ),
                                    React.createElement(
                                        Col,
                                        { xs: 6, className: 'text-right' },
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-heading' },
                                            '$ 250 k'
                                        ),
                                        React.createElement(
                                            'p',
                                            { className: 'announcement-text' },
                                            'Recovered'
                                        )
                                    )
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
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'tile-progress tile-primary', style: { "padding": "12px" } },
                            React.createElement(
                                'div',
                                { 'class': 'tile-header' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Visitors'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog, and our website.'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-progressbar' },
                                React.createElement('span', { 'data-fill': '65.5%', style: { "width": "65.5%" } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-footer' },
                                React.createElement(
                                    'h4',
                                    null,
                                    React.createElement(
                                        'span',
                                        { className: 'pct-counter' },
                                        '65.5'
                                    ),
                                    '% increase'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog and our website'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'tile-progress tile-red', style: { "padding": "12px" } },
                            React.createElement(
                                'div',
                                { 'class': 'tile-header' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Visitors'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog, and our website.'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-progressbar' },
                                React.createElement('span', { 'data-fill': '65.5%', style: { "width": "65.5%" } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-footer' },
                                React.createElement(
                                    'h4',
                                    null,
                                    React.createElement(
                                        'span',
                                        { className: 'pct-counter' },
                                        '65.5'
                                    ),
                                    '% increase'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog and our website'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'tile-progress tile-blue', style: { "padding": "12px" } },
                            React.createElement(
                                'div',
                                { 'class': 'tile-header' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Visitors'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog, and our website.'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-progressbar' },
                                React.createElement('span', { 'data-fill': '65.5%', style: { "width": "65.5%" } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-footer' },
                                React.createElement(
                                    'h4',
                                    null,
                                    React.createElement(
                                        'span',
                                        { className: 'pct-counter' },
                                        '65.5'
                                    ),
                                    '% increase'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog and our website'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 3 },
                        React.createElement(
                            'div',
                            { className: 'tile-progress tile-aqua', style: { "padding": "12px" } },
                            React.createElement(
                                'div',
                                { 'class': 'tile-header' },
                                React.createElement(
                                    'h3',
                                    null,
                                    'Visitors'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog, and our website.'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-progressbar' },
                                React.createElement('span', { 'data-fill': '65.5%', style: { "width": "65.5%" } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'tile-footer' },
                                React.createElement(
                                    'h4',
                                    null,
                                    React.createElement(
                                        'span',
                                        { className: 'pct-counter' },
                                        '65.5'
                                    ),
                                    '% increase'
                                ),
                                React.createElement(
                                    'span',
                                    null,
                                    'so far in our blog and our website'
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
                        Col,
                        { md: 4 },
                        React.createElement(
                            'div',
                            { className: 'panel-group', id: 'accordion' },
                            React.createElement(
                                'div',
                                { className: 'panel panel-default' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'h4',
                                        { className: 'panel-title' },
                                        React.createElement(
                                            'a',
                                            { 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapse1' },
                                            'Files'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse1', className: 'panel-collapse collapse in' },
                                    React.createElement(
                                        'ul',
                                        { className: 'list-group' },
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '253'
                                            ),
                                            ' New'
                                        ),
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '17'
                                            ),
                                            ' Deleted'
                                        ),
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '3'
                                            ),
                                            ' Reported'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel panel-default' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'h4',
                                        { className: 'panel-title' },
                                        React.createElement(
                                            'a',
                                            { 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapse2' },
                                            'Blog'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse2', className: 'panel-collapse collapse' },
                                    React.createElement(
                                        'ul',
                                        { className: 'list-group' },
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '12'
                                            ),
                                            ' New'
                                        ),
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '5'
                                            ),
                                            ' Deleted'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel panel-default' },
                                React.createElement(
                                    'div',
                                    { className: 'panel-heading' },
                                    React.createElement(
                                        'h4',
                                        { className: 'panel-title' },
                                        React.createElement(
                                            'a',
                                            { 'data-toggle': 'collapse', 'data-parent': '#accordion', href: '#collapse3' },
                                            'Settings'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse3', className: 'panel-collapse collapse' },
                                    React.createElement(
                                        'ul',
                                        { className: 'list-group' },
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '1'
                                            ),
                                            ' Users Reported'
                                        ),
                                        React.createElement(
                                            'li',
                                            { className: 'list-group-item' },
                                            React.createElement(
                                                'span',
                                                { className: 'badge' },
                                                '5'
                                            ),
                                            ' User Waiting Activation'
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 4 },
                        React.createElement(
                            'h4',
                            null,
                            'Today Stats'
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    'Visit'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '- 15%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-danger', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "15%" } },
                                '15%'
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    '20 New Users'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '+ 8%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-success', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "8%" } },
                                '8%'
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    '359 Downloads'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '- 15%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-warning', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "15%" } },
                                '15%'
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 4 },
                        React.createElement(
                            'h4',
                            null,
                            'Today Stats'
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    'Visit'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '- 15%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-success', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "45%" } },
                                '15%'
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    '20 New Users'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '+ 8%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-success', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "58%" } },
                                '8%'
                            )
                        ),
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    null,
                                    '359 Downloads'
                                )
                            ),
                            React.createElement(
                                Col,
                                { xs: 6 },
                                React.createElement(
                                    'span',
                                    { className: 'pull-right strong' },
                                    '- 15%'
                                )
                            )
                        ),
                        React.createElement(
                            Row,
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'progress-bar progress-bar-success', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { "width": "88%" } },
                                '15%'
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'progress' },
                        React.createElement('div', { className: 'one primary-color' }),
                        React.createElement('div', { className: 'two primary-color' }),
                        React.createElement('div', { className: 'three no-color' }),
                        React.createElement('div', { className: 'progress-bar', style: { "width": "70%" } })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'progress' },
                        React.createElement('div', { className: 'one success-color' }),
                        React.createElement('div', { className: 'two success-color' }),
                        React.createElement('div', { className: 'three success-color' }),
                        React.createElement('div', { className: 'progress-bar progress-bar-success', style: { "width": "100%" } })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'progress' },
                        React.createElement('div', { className: 'one danger-color' }),
                        React.createElement('div', { className: 'two no-color' }),
                        React.createElement('div', { className: 'three no-color' }),
                        React.createElement('div', { className: 'progress-bar progress-bar-danger', style: { "width": "30%" } })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'progress' },
                        React.createElement('div', { className: 'one warning-color' }),
                        React.createElement('div', { className: 'two warning-color' }),
                        React.createElement('div', { className: 'three no-color' }),
                        React.createElement('div', { className: 'progress-bar progress-bar-warning', style: { "width": "60%" } })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'progress' },
                        React.createElement('div', { className: 'one info-color' }),
                        React.createElement('div', { className: 'two no-color' }),
                        React.createElement('div', { className: 'three no-color' }),
                        React.createElement('div', { className: 'progress-bar progress-bar-info', style: { "width": "35%" } })
                    )
                )
            );
        }
    }]);

    return Home;
}(React.Component);

var PartialsTwo = function (_React$Component47) {
    _inherits(PartialsTwo, _React$Component47);

    function PartialsTwo() {
        _classCallCheck(this, PartialsTwo);

        var _this70 = _possibleConstructorReturn(this, (PartialsTwo.__proto__ || Object.getPrototypeOf(PartialsTwo)).call(this));

        _this70.state = {

            masterAPI: []
        };
        return _this70;
    }

    _createClass(PartialsTwo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this71 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this71.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            console.log(this.state.masterAPI);

            return React.createElement(
                Col,
                { sm: 6 },
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
                                '#'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Id'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Item'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.state.masterAPI.map(function (master, index) {
                            return React.createElement(PartialsTwoTableBody, {
                                index: index,
                                id: master.id,
                                item: master.item
                            });
                        })
                    )
                )
            );
        }
    }]);

    return PartialsTwo;
}(React.Component);

var PartialsTwoTableBody = function (_React$Component48) {
    _inherits(PartialsTwoTableBody, _React$Component48);

    function PartialsTwoTableBody() {
        _classCallCheck(this, PartialsTwoTableBody);

        return _possibleConstructorReturn(this, (PartialsTwoTableBody.__proto__ || Object.getPrototypeOf(PartialsTwoTableBody)).apply(this, arguments));
    }

    _createClass(PartialsTwoTableBody, [{
        key: 'render',
        value: function render() {

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
                    this.props.id
                ),
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
                                'Name'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Times'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        this.props.item.map(function (master, index) {
                            return React.createElement(PartialsTwoTableBodyDetail, {
                                index: index,
                                item: master.item,
                                quantity: master.quantity
                            });
                        })
                    )
                )
            );
        }
    }]);

    return PartialsTwoTableBody;
}(React.Component);

var PartialsTwoTableBodyDetail = function (_React$Component49) {
    _inherits(PartialsTwoTableBodyDetail, _React$Component49);

    function PartialsTwoTableBodyDetail() {
        _classCallCheck(this, PartialsTwoTableBodyDetail);

        return _possibleConstructorReturn(this, (PartialsTwoTableBodyDetail.__proto__ || Object.getPrototypeOf(PartialsTwoTableBodyDetail)).apply(this, arguments));
    }

    _createClass(PartialsTwoTableBodyDetail, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.item
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.quantity
                )
            );
        }
    }]);

    return PartialsTwoTableBodyDetail;
}(React.Component);

ReactDOM.render(React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: '/', component: App },
        React.createElement(IndexRoute, { component: Home }),
        React.createElement(Route, { path: 'printpayment/:printid', component: PrintPayment }),
        React.createElement(Route, { path: 'customer', component: Customer }),
        React.createElement(Route, { path: 'loader', component: Loader }),
        React.createElement(Route, { path: 'partialstwo', component: PartialsTwo }),
        React.createElement(Route, { path: 'partials', component: Partials }),
        React.createElement(Route, { path: 'updatedetail/:detailid', component: DetailModalUpdate }),
        React.createElement(Route, { path: 'updatedelivery/:deliveryid', component: UpdateDelivery }),
        React.createElement(Route, { path: 'payment/:paymentid', component: Payment }),
        React.createElement(Route, { path: 'actions/:actionid', component: Actions }),
        React.createElement(Route, { path: 'detail', component: Detail }),
        React.createElement(Route, { path: 'master', component: Master })
    )
), document.getElementById('contents'));