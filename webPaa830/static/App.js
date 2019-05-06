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
var SplitButton = ReactBootstrap.SplitButton;
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

var global = 0;

// const API_URL = 'http://localhost:8082';
var API_URL = 'http://159.203.156.208:8082';

var API_HEADERS = {

    'Content-Type': 'application/json',
    Authentication: 'any-string-you-like'
};

var TOKEN_KEY = "token";

var languageActive = false;

function token() {

    return localStorage.getItem(TOKEN_KEY);
}

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
        value: function componentDidMount() {}
    }, {
        key: 'setCookie',
        value: function setCookie(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/login', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.token != undefined) {
                    localStorage.setItem(TOKEN_KEY, response.token);
                }
            });

            window.location.reload();
        }
    }, {
        key: 'isAuthenticated',
        value: function isAuthenticated() {

            return !!localStorage.getItem(TOKEN_KEY);
        }
    }, {
        key: 'setRegistration',
        value: function setRegistration(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/register', {

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

                    setcookie: this.setCookie,
                    setregistration: this.setRegistration

                })
            );
            if (this.isAuthenticated()) {

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

var Registration = function (_React$Component2) {
    _inherits(Registration, _React$Component2);

    function Registration() {
        _classCallCheck(this, Registration);

        return _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
    }

    _createClass(Registration, [{
        key: 'render',
        value: function render() {
            return React.createElement(
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
                                    'Please sign up'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-body' },
                                React.createElement(
                                    'form',
                                    { onSubmit: this.props.setregistration.bind(this) },
                                    React.createElement(
                                        'fieldset',
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement('input', { className: 'form-control', placeholder: 'E-mail', name: 'email', type: 'text' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'form-group' },
                                            React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password' })
                                        ),
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-lg btn-success btn-block' },
                                            'Save'
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

    return Registration;
}(React.Component);

var Actions = function (_React$Component3) {
    _inherits(Actions, _React$Component3);

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

            var marquilla = this.state.masterAPI.filter(function (master) {
                return master.id == _this5.state.parameter;
            });

            if (marquilla[0]) {
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
                    ),
                    '\xA0\xA0\xA0',
                    marquilla[0].item.map(function (masterMarquilla, index) {
                        return React.createElement(
                            Link,
                            { className: 'btn btn-default', to: '/matching/' + _this5.state.parameter + '/' + masterMarquilla.id + '/' + index },
                            index + 1
                        );
                    })
                );
            } else {
                return React.createElement('div', null);
            }
        }
    }]);

    return Actions;
}(React.Component);

var ActionsTable = function (_React$Component4) {
    _inherits(ActionsTable, _React$Component4);

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
                                'RNC: 131-473865'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Tel.: (809)-638-9999'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Nuestro horario'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Abiertos los sabados 8am a 1pm'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Lunes a Viernes 7:30am a 7:00pm'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Domingos Cerrado'
                            ),
                            React.createElement(
                                'h5',
                                null,
                                'Orden de Servicio'
                            ),
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
                                'ID Cliente : ',
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
                            { xs: 6 },
                            React.createElement(
                                Row,
                                { style: { 'border': '1px solid black' } },
                                React.createElement(
                                    Col,
                                    { xs: 1 },
                                    'ID'
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    'Cant.'
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 4 },
                                    'Descripcion'
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    'Precio'
                                )
                            ),
                            React.createElement(
                                Row,
                                { style: { 'border': '1px solid black' } },
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    this.props.masterAPI.map(function (master, index) {
                                        return React.createElement(
                                            Row,
                                            null,
                                            React.createElement(
                                                'h5',
                                                null,
                                                master.idOrder
                                            )
                                        );
                                    })
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    this.props.masterAPI.map(function (master, index) {
                                        return React.createElement(
                                            Row,
                                            null,
                                            React.createElement(
                                                'h5',
                                                null,
                                                master.item.map(function (item) {
                                                    return React.createElement(
                                                        'h5',
                                                        null,
                                                        item.quantity
                                                    );
                                                })
                                            )
                                        );
                                    })
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 4 },
                                    this.props.masterAPI.map(function (master, index) {
                                        return React.createElement(
                                            Row,
                                            null,
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    master.item.map(function (item) {
                                                        return React.createElement(
                                                            'h5',
                                                            null,
                                                            item.development
                                                        );
                                                    })
                                                )
                                            ),
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    'h5',
                                                    null,
                                                    master.item.map(function (item) {
                                                        return React.createElement(
                                                            'h5',
                                                            null,
                                                            "   -" + item.item
                                                        );
                                                    })
                                                )
                                            )
                                        );
                                    })
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    this.props.masterAPI.map(function (master, index) {
                                        return React.createElement(
                                            Row,
                                            null,
                                            React.createElement(
                                                'h5',
                                                null,
                                                master.item.map(function (item) {
                                                    return React.createElement(
                                                        'h5',
                                                        null,
                                                        item.project
                                                    );
                                                })
                                            )
                                        );
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

var ActionsTableBodyFooter = function (_React$Component5) {
    _inherits(ActionsTableBodyFooter, _React$Component5);

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

            var grandTotal = void 0;

            grandTotal = parseFloat(zoom) - parseFloat(itbis) * piezas;

            //grandTotal= parseFloat(zoom) + parseFloat(this.props.added) + parseFloat(itbis);

            //console.log(grandTotal);

            //grandTotal -= descuento;

            //grandTotal = 0;

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
                        grandTotal.toFixed(2)
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
                        zoom
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
                    React.createElement('td', { colSpan: 2 }),
                    React.createElement('td', null),
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

var ActionsTableBody = function (_React$Component6) {
    _inherits(ActionsTableBody, _React$Component6);

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

var ActionsTableBodyDetail = function (_React$Component7) {
    _inherits(ActionsTableBodyDetail, _React$Component7);

    function ActionsTableBodyDetail() {
        _classCallCheck(this, ActionsTableBodyDetail);

        return _possibleConstructorReturn(this, (ActionsTableBodyDetail.__proto__ || Object.getPrototypeOf(ActionsTableBodyDetail)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyDetail, [{
        key: 'render',
        value: function render() {

            var price = this.props.project;

            if (this.props.itemDetail.length == 0) {

                return React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        '\u200A'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        this.props.quantity,
                        '\u200A'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        this.props.item
                    ),
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        this.props.project.toFixed(2)
                    )
                );
            } else {

                return React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        '\u200A'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
                        this.props.quantity,
                        '\u200A'
                    ),
                    React.createElement(
                        'td',
                        { style: { 'font-size': '20px' } },
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
                        ' \u200A\u200A ',
                        price,
                        '.00'
                    )
                );
            }
        }
    }]);

    return ActionsTableBodyDetail;
}(React.Component);

var Login = function (_React$Component8) {
    _inherits(Login, _React$Component8);

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
                                        'Login'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'panel-body' },
                                    React.createElement(
                                        'form',
                                        { onSubmit: this.props.setcookie.bind(this) },
                                        React.createElement(
                                            'fieldset',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', { className: 'form-control', placeholder: 'E-mail', name: 'email', type: 'text' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'checkbox' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    React.createElement('input', { name: 'remember', type: 'checkbox', value: 'Remember Me' }),
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

var Toolbar = function (_React$Component9) {
    _inherits(Toolbar, _React$Component9);

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

            localStorage.removeItem(TOKEN_KEY);
            window.location.reload();
        }
    }, {
        key: 'onRefreshed',
        value: function onRefreshed() {
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
                            { to: '/', onClick: this.onRefreshed.bind(this) },
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
                            React.createElement(
                                Link,
                                { to: '/deliveryfortoday' },
                                'Entregas para hoy'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.5 },
                            React.createElement(
                                Link,
                                { to: '/matching' },
                                'Matching'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.6 },
                            React.createElement(
                                Link,
                                { to: '/delivery' },
                                'Delivery'
                            )
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
                            { to: '/', onClick: this.onRefreshed.bind(this) },
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
                            { eventKey: 3.4 },
                            React.createElement(
                                Link,
                                { to: '/partialstwo' },
                                'Draw2'
                            )
                        ),
                        React.createElement(MenuItem, { divider: true }),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.5 },
                            React.createElement(
                                Link,
                                { to: '/delivery' },
                                'Delivery'
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.6 },
                            React.createElement(
                                Link,
                                { to: '/deliveryfortoday' },
                                'Delivery For Today'
                            )
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

var Autocomplete = function (_React$Component10) {
    _inherits(Autocomplete, _React$Component10);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this12 = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

        _this12.state = {
            label: null,
            //dataList: ["France", "Germany", "England"]
            dataList: _this12.props.detail.map(function (item, i) {
                return item.name;
            })
        };
        return _this12;
    }

    // on component loading


    _createClass(Autocomplete, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initAwesomplete();
        }

        // Init awesomplete

    }, {
        key: 'initAwesomplete',
        value: function initAwesomplete() {
            var input = document.getElementById("autocomplete");
            //use Awesomplete lib
            new Awesomplete(input, {
                list: this.state.dataList
            });
        }

        // on input change function

    }, {
        key: 'onChange',
        value: function onChange(event) {
            // Anytime the input change, the State change
            // Anytime the state change, the component will be rendered with the new label

            this.setState({
                label: event.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement('input', { style: { "width": "360px" },
                    value: this.state.label
                    // value={this.props.detail.map(function(item,i){
                    //     return item.name
                    // })}
                    , className: 'form-control',
                    id: "autocomplete",
                    onChange: this.onChange.bind(this),
                    name: 'suggest'
                })
            );
        }
    }]);

    return Autocomplete;
}(React.Component);

var Master = function (_React$Component11) {
    _inherits(Master, _React$Component11);

    function Master() {
        _classCallCheck(this, Master);

        var _this13 = _possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

        _this13.state = {
            showModal: false,
            showModalDelete: false,
            filterText: '',
            activePage: 1,
            masterAPI: [],
            masterDetail: [],
            detail: [],
            detailData: [],
            detailAdded: [],
            temp: '',
            list: [],
            customerAPI: [],
            masterAPICSV: [],
            tempNumber: '',
            idDelete: ''
        };
        return _this13;
    }

    _createClass(Master, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this14 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    customerAPI: responseData
                });
            });
            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    detailData: responseData
                });
            });
            fetch(API_URL + '/list', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    list: responseData
                });
            });
            fetch(API_URL + '/mastercsv', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this14.setState({

                    masterAPICSV: responseData
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
                detailItem.push(nextState[x]);
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
                "idOrder": this.state.masterAPI.length,
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
                "ncf": "B00000000000001",
                "status": "pending",
                "comments": []
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

            if (global == 0) {
                global = event.target.firstname.value;
            }

            this.setState({
                tempNumber: event.target.firstname.value
            });

            var nextState = this.state.masterDetail;

            var detailTotal = this.state.detailData;

            var develop = event.target.development.value.toLowerCase().replace(" ", "").replace(" ", "");

            var itemFirst = event.target.suggest.value;

            var project = void 0;

            var category = void 0;

            for (var x = 0; x < detailTotal.length; x++) {

                if (detailTotal[x].tipo == develop) {

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

                    var rnc = void 0;

                    var telefono = void 0;

                    for (var x = 0; x < nextStateCust.length; x++) {

                        if (nextStateCust[x].telefono == event.target.firstname.value) {
                            fullname = nextStateCust[x].name + ' ' + nextStateCust[x].apellido;
                            telefono = event.target.firstname.value;
                            rnc = nextStateCust[x].rnc;
                        }
                    }

                    if (event.target.firstname.value.length == 3) {

                        for (var x = 0; x < nextStateCust.length; x++) {

                            if (nextStateCust[x].telefono == global) {
                                fullname = nextStateCust[x].name + ' ' + nextStateCust[x].apellido;
                                telefono = global;
                            }
                        }

                        newItem = {

                            "id": Date.now(),
                            "firstname": fullname,
                            "telefono": global,
                            "rnc": rnc,
                            "item": event.target.suggest.value,
                            "itemDetail": this.state.detailAdded,
                            "development": event.target.development.value,
                            "quantity": event.target.quantity.value,
                            "project": project
                        };
                    } else {

                        var start = event.target.firstname.value.indexOf('-');
                        var end = event.target.firstname.value.length;

                        // console.log(start+1)
                        // console.log(end-1)

                        // console.log(event.target.firstname.value.substring(start+1,end))

                        var subStr = event.target.firstname.value.substring(start + 1, end);

                        //var index = nextState.findIndex(x=> x.id==this.state.idDelete);

                        for (var x = 0; x < nextStateCust.length; x++) {

                            // if(nextStateCust[x].telefono==event.target.firstname.value){
                            if (nextStateCust[x].telefono == subStr) {
                                fullname = nextStateCust[x].name + ' ' + nextStateCust[x].apellido;
                                // telefono=event.target.firstname.value
                                telefono = subStr;
                                rnc = nextStateCust[x].rnc;
                            }
                        }

                        newItem = {

                            "id": Date.now(),
                            "firstname": fullname,
                            // "telefono":event.target.firstname.value,
                            "telefono": subStr,
                            "rnc": rnc,
                            "item": event.target.suggest.value,
                            "itemDetail": this.state.detailAdded,
                            "development": event.target.development.value,
                            "quantity": event.target.quantity.value,
                            "project": project
                        };
                    }

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
        key: 'onDeleteMasterModal',
        value: function onDeleteMasterModal(value, event) {

            this.setState({

                showModalDelete: true,
                idDelete: value.props.id

            });
        }
    }, {
        key: 'onDeleteMasterModalClose',
        value: function onDeleteMasterModalClose(value) {

            this.setState({

                showModalDelete: false
            });
        }
    }, {
        key: 'onDeleteMaster',
        value: function onDeleteMaster(value, event) {
            var _this15 = this;

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this15.state.idDelete;
            });

            nextState.splice(index, 1);

            this.setState({

                masterAPI: nextState
            });

            fetch(API_URL + '/deletemaster', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": this.state.idDelete })
            });

            this.setState({

                showModalDelete: false
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
        key: 'downloadCSV',
        value: function downloadCSV() {

            //const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];        
            var rows = this.state.masterAPICSV;
            var csvContent = "data:text/csv;charset=utf-8,";
            rows.forEach(function (rowArray) {
                var row = rowArray.join(",");
                csvContent += row + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
        }
    }, {
        key: 'onRemoveMasterDetail',
        value: function onRemoveMasterDetail() {

            this.setState({

                masterDetail: []
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var ModalButtonEN = React.createElement(
                SplitButton,
                {
                    bsStyle: 'default',
                    title: 'Add Master',
                    key: '1',
                    id: 'split-button-basic-' + '1',
                    onClick: this.open.bind(this) },
                React.createElement(
                    MenuItem,
                    { onClick: this.downloadCSV.bind(this) },
                    'Download   CSV'
                )
            );

            var ModalButtonES = React.createElement(
                SplitButton,
                {
                    bsStyle: 'default',
                    title: 'Agregar Orden',
                    key: '1',
                    id: 'split-button-basic-' + '1',
                    onClick: this.open.bind(this) },
                React.createElement(
                    MenuItem,
                    { onClick: this.downloadCSV.bind(this) },
                    'Exportar a CSV'
                )
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
                                onsavemaster: this.onSaveMaster.bind(this),
                                onremovemasterdetail: this.onRemoveMasterDetail.bind(this)
                            }
                        })
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        React.createElement(MasterModalDelete, {

                            detailAdded: this.state.detailAdded,
                            masterDetail: this.state.masterDetail,
                            detail: this.state.detail,
                            showModal: this.state.showModal,
                            showModalDelete: this.state.showModalDelete,
                            list: this.state.list,
                            open: this.open,
                            close: this.close.bind(this),
                            closeModal: this.onDeleteMasterModalClose.bind(this),
                            masterCallback: {
                                onsavedetail: this.onSaveDetail.bind(this),
                                onsavedetailadded: this.onSaveDetailAdded.bind(this),
                                onsavemaster: this.onSaveMaster.bind(this),
                                ondeletemastermodal: this.onDeleteMasterModal.bind(this),
                                ondeletemaster: this.onDeleteMaster.bind(this)
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
                                ondeletemaster: this.onDeleteMaster.bind(this),
                                ondeletemastermodal: this.onDeleteMasterModal.bind(this)
                            }
                        })
                    )
                )
            );
        }
    }]);

    return Master;
}(React.Component);

var MasterSearch = function (_React$Component12) {
    _inherits(MasterSearch, _React$Component12);

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
                                React.createElement('input', { onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: 'text',
                                    className: 'form-control', id: 'first_name', name: 'first_name' })
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

var MasterTable = function (_React$Component13) {
    _inherits(MasterTable, _React$Component13);

    function MasterTable() {
        _classCallCheck(this, MasterTable);

        var _this17 = _possibleConstructorReturn(this, (MasterTable.__proto__ || Object.getPrototypeOf(MasterTable)).call(this));

        _this17.state = {

            currentPage: 1,
            todosPerPage: 200
        };
        return _this17;
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
            var _this18 = this;

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
                return master.name.toLowerCase().indexOf(_this18.props.filterText.toLowerCase()) !== -1;
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
                        onClick: _this18.handleClick.bind(_this18)
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
                        currentTodos.sort(function (a, b) {
                            return b.id - a.id;
                        }).map(function (todo, index) {
                            return React.createElement(MasterTableBody, {

                                key: index,
                                id: todo.id,
                                idOrder: todo.idOrder,

                                date: todo.date,

                                name: todo.name,

                                item: todo.name,

                                fechaentrega: todo.fechaentrega,

                                horaentrega: todo.horaentrega,

                                status: todo.status,

                                tipopago: todo.tipopago,

                                masterCallback: _this18.props.masterCallback
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

var MasterTableBody = function (_React$Component14) {
    _inherits(MasterTableBody, _React$Component14);

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

            var checkItemHiddenE = React.createElement(
                Link,
                { className: 'btn btn-default', to: '/master' },
                React.createElement('i', { className: 'fa fa-money', 'aria-hidden': 'true' })
            );
            var checkItemHiddenT = React.createElement(
                Link,
                { className: 'btn btn-default', to: '/master' },
                React.createElement('i', { className: 'fa fa-cc-visa', 'aria-hidden': 'true' })
            );
            var checkItemVisible = React.createElement(
                Link,
                { className: 'btn btn-default', to: '/payment/' + this.props.id },
                React.createElement('i', { className: 'fa fa-dollar', 'aria-hidden': 'true' })
            );

            var checkItem = void 0;

            if (this.props.tipopago == 'tarjeta') {

                checkItem = checkItemHiddenT;
            } else if (this.props.tipopago == 'efectivo') {

                checkItem = checkItemHiddenE;
            } else {
                checkItem = checkItemVisible;
            }

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    this.props.idOrder
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
                    checkItem,
                    React.createElement(
                        Button,
                        { onClick: this.onExchange.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-exchange', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/quotation/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-file', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0',
                    React.createElement(
                        Button,
                        { onClick: this.props.masterCallback.ondeletemastermodal.bind(this.props.id, this) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    ),
                    '\xA0\xA0'
                )
            );
        }
    }]);

    return MasterTableBody;
}(React.Component);

var MasterModalButton = function (_React$Component15) {
    _inherits(MasterModalButton, _React$Component15);

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

var MasterModal = function (_React$Component16) {
    _inherits(MasterModal, _React$Component16);

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

            var MasterModalPhoneActive = void 0;

            var MasterModalPhone = React.createElement(
                'span',
                null,
                React.createElement(
                    Label,
                    { bsStyle: 'success' },
                    global
                ),
                '\xA0'
            );

            if (global != 0) {
                MasterModalPhoneActive = MasterModalPhone;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Modal,
                    { show: this.props.showModal, onHide: this.props.close },
                    React.createElement(Modal.Header, { closeButton: true }),
                    React.createElement(
                        Modal.Body,
                        null,
                        MasterModalPhoneActive,
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

var MasterModalLabel = function (_React$Component17) {
    _inherits(MasterModalLabel, _React$Component17);

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

var MasterModalLabelPhone = function (_React$Component18) {
    _inherits(MasterModalLabelPhone, _React$Component18);

    function MasterModalLabelPhone() {
        _classCallCheck(this, MasterModalLabelPhone);

        return _possibleConstructorReturn(this, (MasterModalLabelPhone.__proto__ || Object.getPrototypeOf(MasterModalLabelPhone)).apply(this, arguments));
    }

    _createClass(MasterModalLabelPhone, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'span',
                null,
                React.createElement(
                    Label,
                    { bsStyle: 'summary' },
                    global
                ),
                '\xA0'
            );
        }
    }]);

    return MasterModalLabelPhone;
}(React.Component);

var AwesompleteInput = function (_React$Component19) {
    _inherits(AwesompleteInput, _React$Component19);

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
                name: 'developmentlist'
            });
        }
    }]);

    return AwesompleteInput;
}(React.Component);

var AwesompleteInputList = function (_React$Component20) {
    _inherits(AwesompleteInputList, _React$Component20);

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

var MasterModalField = function (_React$Component21) {
    _inherits(MasterModalField, _React$Component21);

    function MasterModalField() {
        _classCallCheck(this, MasterModalField);

        var _this26 = _possibleConstructorReturn(this, (MasterModalField.__proto__ || Object.getPrototypeOf(MasterModalField)).call(this));

        _this26.state = {

            value: '',
            valueItem: '',
            alter: false,
            valueCombo: 'lavaryprensa'
        };
        return _this26;
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

            this.setState({
                valueCombo: event.target.value.toLowerCase().replace(/\s/g, '')
            });

            if (event.target.value == 'Alteracion') {
                this.setState({

                    alter: true
                });
            }
        }
    }, {
        key: 'onChangeItem',
        value: function onChangeItem(data) {
            this.setState({
                valueItem: data.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this27 = this;

            var precio = 0;

            var datos = [];

            var filteredTableCombo = this.props.detail.filter(function (detail) {
                return detail.tipo.indexOf(_this27.state.valueCombo) !== -1;
            });

            var filteredTable = filteredTableCombo.filter(function (detail) {
                return detail.name.indexOf(_this27.state.valueItem.toUpperCase()) !== -1;
            });

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
                                React.createElement(Autocomplete, { className: 'form-control', detail: this.props.detail })
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
                                        { value: 'Lavar y Prensa' },
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
                                React.createElement(Autocomplete, {
                                    detail: this.props.detail
                                })
                            )
                        )
                    ),
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

var MasterModalTable = function (_React$Component22) {
    _inherits(MasterModalTable, _React$Component22);

    function MasterModalTable() {
        _classCallCheck(this, MasterModalTable);

        return _possibleConstructorReturn(this, (MasterModalTable.__proto__ || Object.getPrototypeOf(MasterModalTable)).apply(this, arguments));
    }

    _createClass(MasterModalTable, [{
        key: 'render',
        value: function render() {
            var _this29 = this;

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
                ),
                React.createElement(
                    'th',
                    null,
                    'Actions'
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
                                quantity: masterdetail.quantity,
                                masterCallback: _this29.props.masterCallback
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterModalTable;
}(React.Component);

var MasterModalTableBodyAdded = function (_React$Component23) {
    _inherits(MasterModalTableBodyAdded, _React$Component23);

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

var MasterModalTableBodyAddedTotal = function (_React$Component24) {
    _inherits(MasterModalTableBodyAddedTotal, _React$Component24);

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

var MasterModalTableBody = function (_React$Component25) {
    _inherits(MasterModalTableBody, _React$Component25);

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
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            Button,
                            { onClick: this.props.masterCallback.onremovemasterdetail.bind(this) },
                            React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                        ),
                        '\xA0\xA0'
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
                    ),
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            Button,
                            { onClick: this.props.masterCallback.onremovemasterdetail.bind(this) },
                            React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                        ),
                        '\xA0\xA0'
                    )
                );
            }
        }
    }]);

    return MasterModalTableBody;
}(React.Component);

var Detail = function (_React$Component26) {
    _inherits(Detail, _React$Component26);

    function Detail() {
        _classCallCheck(this, Detail);

        var _this33 = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this));

        _this33.state = {
            showModal: false,
            showModalLoader: false,
            filterText: '',
            detailData: [],
            detailAPICSV: []
        };
        return _this33;
    }

    _createClass(Detail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this34 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this34.setState({

                    detailData: responseData
                });
            });
            fetch(API_URL + '/detailcsv', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this34.setState({

                    detailAPICSV: responseData
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
            }, _defineProperty(_newDetail, 'id', event.target.id.value), _defineProperty(_newDetail, "name", event.target.name.value), _defineProperty(_newDetail, "item", event.target.item.value), _defineProperty(_newDetail, "environment", event.target.environment.value), _defineProperty(_newDetail, "category", event.target.category.value), _defineProperty(_newDetail, "tipo", event.target.tipo.value), _newDetail);

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
        key: 'downloadCSV',
        value: function downloadCSV() {

            //const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];        
            var rows = this.state.detailAPICSV;
            var csvContent = "data:text/csv;charset=utf-8,";
            rows.forEach(function (rowArray) {
                var row = rowArray.join(",");
                csvContent += row + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
        }
    }, {
        key: 'render',
        value: function render() {

            var DetailEN = React.createElement(
                SplitButton,
                {
                    bsStyle: 'default',
                    title: 'Add Detail',
                    key: '1',
                    id: 'split-button-basic-' + '1',
                    onClick: this.open.bind(this) },
                React.createElement(
                    MenuItem,
                    { onClick: this.downloadCSV.bind(this) },
                    'Exportar a CSV'
                )
            );

            var DetailES = React.createElement(
                SplitButton,
                {
                    bsStyle: 'default',
                    title: 'Agregar Articulo',
                    key: '1',
                    id: 'split-button-basic-' + '1',
                    onClick: this.open.bind(this) },
                React.createElement(
                    MenuItem,
                    { onClick: this.downloadCSV.bind(this) },
                    'Exportar a CSV'
                )
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

var DetailSearch = function (_React$Component27) {
    _inherits(DetailSearch, _React$Component27);

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

var DetailTable = function (_React$Component28) {
    _inherits(DetailTable, _React$Component28);

    function DetailTable() {
        _classCallCheck(this, DetailTable);

        var _this36 = _possibleConstructorReturn(this, (DetailTable.__proto__ || Object.getPrototypeOf(DetailTable)).call(this));

        _this36.state = {
            todos: [],
            currentPage: 1,
            todosPerPage: 10,
            detailItem: []
        };
        _this36.handleClick = _this36.handleClick.bind(_this36);
        return _this36;
    }

    _createClass(DetailTable, [{
        key: 'handleClick',
        value: function handleClick(event) {
            this.setState({
                currentPage: Number(event.target.id)
            });
        }
    }, {
        key: 'onChangedNext',
        value: function onChangedNext() {
            var _this37 = this;

            var nextState = this.props.detailData;
            fetch(API_URL + '/detailnext', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": "test" })
            }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this37.setState({

                    detailItem: responseData
                });
            });

            for (var x = 0; x < this.state.detailItem; x++) {
                nextState.push(this.state.detailItem[x]);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this38 = this;

            var filteredTable = this.props.detailData.filter(function (detail) {
                return detail.name.indexOf(_this38.props.filterText) !== -1;
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
                        onClick: _this38.handleClick
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
                                'Type'
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
                                tipo: todo.tipo,
                                detailCallback: _this38.props.detailCallback
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
                                'Tipo'
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
                                tipo: todo.tipo,
                                detailCallback: _this38.props.detailCallback
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
                                { role: 'button', onClick: this.onChangedNext.bind(this) },
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

var DetailModalUpdate = function (_React$Component29) {
    _inherits(DetailModalUpdate, _React$Component29);

    function DetailModalUpdate() {
        _classCallCheck(this, DetailModalUpdate);

        var _this39 = _possibleConstructorReturn(this, (DetailModalUpdate.__proto__ || Object.getPrototypeOf(DetailModalUpdate)).call(this));

        _this39.state = {

            parameter: '',
            showModal: true,
            detailData: []
        };

        return _this39;
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
            var _this40 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this40.setState({

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
            var _this41 = this;

            event.preventDefault();

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this41.state.parameter;
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
                body: JSON.stringify({ "id": this.state.parameter, "environment": event.target.environment.value })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this42 = this;

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this42.state.parameter;
            });

            var name = void 0;
            var environment = void 0;
            var item = void 0;
            var category = void 0;
            var tipo = void 0;

            if (nextState[index]) {

                name = nextState[index].name;
                environment = nextState[index].environment;
                item = nextState[index].item;
                category = nextState[index].category;
                tipo = nextState[index].tipo;
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
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalCategory' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Tipo'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'tipo', type: 'text', value: tipo, disabled: true })
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

var DetailTableBody = function (_React$Component30) {
    _inherits(DetailTableBody, _React$Component30);

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
                    this.props.tipo
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/updatedetail/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-edit', 'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.props.detailCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return DetailTableBody;
}(React.Component);

var DetailModal = function (_React$Component31) {
    _inherits(DetailModal, _React$Component31);

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
                                'Categoria'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(
                                    FormControl,
                                    { name: 'category', componentClass: 'select', placeholder: 'select' },
                                    React.createElement(
                                        'option',
                                        { value: 'servicio' },
                                        'Servicio'
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
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalItem' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Tipo'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(
                                    FormControl,
                                    { name: 'tipo', componentClass: 'select', placeholder: 'select' },
                                    React.createElement(
                                        'option',
                                        { value: 'lavaryprensa' },
                                        'Lavar y Prensa'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'sololavar' },
                                        'Solo Lavar'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'soloplancha' },
                                        'Solo Plancha'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'alteracion' },
                                        'Alteracion'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'agregacion' },
                                        'Agregacion'
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

var DetailLoaderModal = function (_React$Component32) {
    _inherits(DetailLoaderModal, _React$Component32);

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

var Partials = function (_React$Component33) {
    _inherits(Partials, _React$Component33);

    function Partials() {
        _classCallCheck(this, Partials);

        var _this46 = _possibleConstructorReturn(this, (Partials.__proto__ || Object.getPrototypeOf(Partials)).call(this));

        _this46.state = {

            masterAPI: [],
            searchData: '2017-10-06',
            total: 0
        };

        return _this46;
    }

    _createClass(Partials, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this47 = this;

            fetch(API_URL + '/reporte', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this47.setState({

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
            var _this48 = this;

            var nextState = void 0;

            if (this.state.searchData == "todos") {
                nextState = this.state.masterAPI;
            } else {
                nextState = this.state.masterAPI.filter(function (master) {
                    return master.tipopago == _this48.state.searchData;
                });
            }

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
        key: 'onRemove',
        value: function onRemove() {
            var _this49 = this;

            fetch(API_URL + '/removeLastMaster', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this49.setState({

                    customerAPI: responseData
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this50 = this;

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

            var filteredActiveAll = React.createElement(PartialsTable, {
                masterAPI: this.state.masterAPI,
                total: this.state.total
            });

            var filteredActiveOne = React.createElement(PartialsTable, {
                masterAPI: this.state.masterAPI.filter(function (master) {
                    return master.tipopago == _this50.state.searchData;
                }),
                total: this.state.total
            });

            var showFilteredActive = void 0;

            if (this.state.searchData == "todos") {
                showFilteredActive = filteredActiveAll;
            } else {
                showFilteredActive = filteredActiveOne;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { className: 'pull-right', onClick: this.onRemove.bind(this) },
                        React.createElement('i', { className: 'fa fa-ban', 'aria-hidden': 'true' })
                    )
                ),
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
                    showFilteredActive
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

var PartialsSearch = function (_React$Component34) {
    _inherits(PartialsSearch, _React$Component34);

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
                    { horizontal: true, onChange: this.props.onChanged.bind(this) },
                    React.createElement(
                        FormGroup,
                        { controlId: 'formHorizontalEmail' },
                        React.createElement(Col, { componentClass: ControlLabel, xs: 2 }),
                        React.createElement(
                            Col,
                            { xs: 6 },
                            React.createElement(
                                FormGroup,
                                { controlId: 'formControlsSelect' },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    'Select'
                                ),
                                React.createElement(
                                    FormControl,
                                    { componentClass: 'select', placeholder: 'select' },
                                    React.createElement(
                                        'option',
                                        { value: 'todos' },
                                        'Todos'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'tarjeta' },
                                        'Tarjeta'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: 'efectivo' },
                                        'Efectivo'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PartialsSearch;
}(React.Component);

var PartialsTable = function (_React$Component35) {
    _inherits(PartialsTable, _React$Component35);

    function PartialsTable() {
        _classCallCheck(this, PartialsTable);

        return _possibleConstructorReturn(this, (PartialsTable.__proto__ || Object.getPrototypeOf(PartialsTable)).apply(this, arguments));
    }

    _createClass(PartialsTable, [{
        key: 'render',
        value: function render() {
            var _this53 = this;

            var partialsTableEN = React.createElement(
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
                    'Date'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Name'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'NCF'
                ),
                React.createElement(
                    'th',
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    'Project'
                )
            );

            var partialsTableES = React.createElement(
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
                    'NCF'
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
                        { striped: true, bordered: true, condensed: true, hover: true, style: { 'width': '55%' } },
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
                                    ncf: master.ncf,
                                    name: master.name,
                                    project: master.project,
                                    grandTotal: master.grandTotal,
                                    tipopago: master.tipopago,
                                    total: _this53.props.total
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
                                    { style: { 'width': '10px', 'font-size': '20px' } },
                                    'Total'
                                ),
                                React.createElement(
                                    'td',
                                    { style: { 'width': '10px', 'font-size': '20px' } },
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

var PartialsTableBody = function (_React$Component36) {
    _inherits(PartialsTableBody, _React$Component36);

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
                    this.props.ncf
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

var Loader = function (_React$Component37) {
    _inherits(Loader, _React$Component37);

    function Loader() {
        _classCallCheck(this, Loader);

        var _this55 = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));

        _this55.state = {

            showModal: false,
            inputText: '',
            masterAPI: []
        };
        return _this55;
    }

    _createClass(Loader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this56 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this56.setState({

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
        key: 'close',
        value: function close() {
            //this.setState({ showModal: false });

            //window.clearTimeout(time)
        }
    }, {
        key: 'open',
        value: function open() {
            //this.setState({ showModal: true });

            // time = window.setTimeout(function(msg) {

            //     fetch(API_URL+'/loader', {

            //           method: 'post',
            //           headers: API_HEADERS,
            //           body: JSON.stringify({"id":this.state.inputText})
            //     })
            //     .then((response)=>response.json())
            //     .then((responseData)=>{
            //           this.setState({

            //               masterAPI: responseData
            //           })
            //     })

            //     this.close();
            // }.bind(this), 3000);
        }
    }, {
        key: 'onSubmitSearch',
        value: function onSubmitSearch(event) {

            event.preventDefault();

            this.setState({

                inputText: event.target.loadersearch.value
            });

            //this.open();
        }
    }, {
        key: 'onSubmitComment',
        value: function onSubmitComment(event) {
            var _this57 = this;

            event.preventDefault();

            fetch(API_URL + '/mastercomment', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": this.state.inputText, "comment": event.target.comment.value })
            }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this57.setState({

                    masterAPI: responseData
                });
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
                        inputText: this.state.inputText,
                        masterAPI: this.state.masterAPI,
                        loaderCallback: {
                            onsubmitcomment: this.onSubmitComment.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return Loader;
}(React.Component);

var LoaderSearch = function (_React$Component38) {
    _inherits(LoaderSearch, _React$Component38);

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

var LoaderListGroup = function (_React$Component39) {
    _inherits(LoaderListGroup, _React$Component39);

    function LoaderListGroup() {
        _classCallCheck(this, LoaderListGroup);

        return _possibleConstructorReturn(this, (LoaderListGroup.__proto__ || Object.getPrototypeOf(LoaderListGroup)).apply(this, arguments));
    }

    _createClass(LoaderListGroup, [{
        key: 'render',
        value: function render() {
            var _this60 = this;

            var date = void 0;
            var datedel = void 0;
            var status = void 0;
            var comments = [];
            var obj = this.props.masterAPI.filter(function (master) {
                return master.id == _this60.props.inputText;
            });
            if (obj[0]) {
                date = obj[0].date;
                datedel = obj[0].fechaentrega;
                status = obj[0].status;
                comments = obj[0].comments;
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
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
                            'Status: ',
                            React.createElement(
                                Label,
                                { bsStyle: 'success' },
                                status
                            )
                        ),
                        React.createElement(
                            ListGroupItem,
                            { href: '#link2' },
                            'Comments:',
                            comments.map(function (master) {
                                return React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        Label,
                                        { bsStyle: 'success' },
                                        master
                                    ),
                                    React.createElement('br', null)
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    Panel,
                    { header: 'Comments' },
                    React.createElement(
                        ListGroup,
                        null,
                        React.createElement(
                            ListGroupItem,
                            null,
                            React.createElement(
                                Form,
                                { onSubmit: this.props.loaderCallback.onsubmitcomment.bind(this) },
                                React.createElement(
                                    FormGroup,
                                    { controlId: 'formControlsTextarea' },
                                    React.createElement(FormControl, { componentClass: 'textarea', placeholder: 'Comments', name: 'comment' }),
                                    React.createElement('br', null),
                                    React.createElement(
                                        Button,
                                        { className: 'pull-right', bsStyle: 'primary', type: 'submit' },
                                        'Comment'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return LoaderListGroup;
}(React.Component);

var LoaderModal = function (_React$Component40) {
    _inherits(LoaderModal, _React$Component40);

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

var Customer = function (_React$Component41) {
    _inherits(Customer, _React$Component41);

    function Customer() {
        _classCallCheck(this, Customer);

        var _this62 = _possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).call(this));

        _this62.state = {

            showModal: false,
            customerAPI: [],
            customerAPICSV: [],
            filterText: ""
        };
        return _this62;
    }

    _createClass(Customer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this63 = this;

            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this63.setState({

                    customerAPI: responseData
                });
            });
            fetch(API_URL + '/customercsv', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this63.setState({

                    customerAPICSV: responseData
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
                "direccion": event.target.direccion.value,
                "telefono": event.target.telefono.value,
                "telefono2": event.target.telefono2.value,
                "nombreempresa": event.target.nombreempresa.value,
                "rnc": event.target.rnc.value,
                "fechacumpleano": event.target.fechacumpleano.value,
                "facebook": event.target.facebook.value,
                "correoelectronico": event.target.correoelectronico.value,
                "descuento": discount,
                "created": today

            };

            newCustomer["fechacumpleano"] = "0001" + newCustomer.fechacumpleano.substring(4, 10);

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
        key: 'onChangeFilter',
        value: function onChangeFilter(event) {

            this.setState({
                filterText: event.target.value
            });
        }
    }, {
        key: 'onDeleted',
        value: function onDeleted(value) {

            var nextState = this.state.customerAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                customerAPI: nextState
            });

            fetch(API_URL + '/deletecustomer', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: 'downloadCSV',
        value: function downloadCSV() {

            //const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];        
            var rows = this.state.customerAPICSV;
            var csvContent = "data:text/csv;charset=utf-8,";
            rows.forEach(function (rowArray) {
                var row = rowArray.join(",");
                csvContent += row + "\r\n";
            });

            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
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
                    React.createElement(CustomerSearch, {
                        customerCallback: {
                            onchangefilter: this.onChangeFilter.bind(this)
                        }
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        'div',
                        { className: 'pull-right' },
                        React.createElement(
                            SplitButton,
                            {
                                bsStyle: 'default',
                                title: 'Agregar Cliente',
                                key: '1',
                                id: 'split-button-basic-' + '1',
                                onClick: this.open.bind(this) },
                            React.createElement(
                                MenuItem,
                                { onClick: this.downloadCSV.bind(this) },
                                'Exportar a CSV'
                            )
                        ),
                        React.createElement(CustomerModal, {
                            showModal: this.state.showModal,
                            customerCallback: {
                                open: this.open.bind(this),
                                close: this.close.bind(this),
                                onsavecustomer: this.onSaveCustomer.bind(this),
                                ondeleted: this.onDeleted.bind(this)
                            }
                        })
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(CustomerTable, {
                        customer: this.state.customerAPI,
                        filterText: this.state.filterText,
                        customerCallback: {
                            open: this.open.bind(this),
                            close: this.close.bind(this),
                            onsavecustomer: this.onSaveCustomer.bind(this),
                            ondeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return Customer;
}(React.Component);

var CustomerTable = function (_React$Component42) {
    _inherits(CustomerTable, _React$Component42);

    function CustomerTable() {
        _classCallCheck(this, CustomerTable);

        return _possibleConstructorReturn(this, (CustomerTable.__proto__ || Object.getPrototypeOf(CustomerTable)).apply(this, arguments));
    }

    _createClass(CustomerTable, [{
        key: 'render',
        value: function render() {
            var _this65 = this;

            var filteredTable = this.props.customer.filter(function (master) {
                return master.name.indexOf(_this65.props.filterText) !== -1;
            });

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
                                'Telefono #1'
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
                                'Correo Electronico'
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
                        filteredTable.map(function (cliente, index) {
                            return React.createElement(CustomerTablebody, {
                                key: index,
                                index: index,
                                id: cliente.id,
                                name: cliente.name,
                                apellido: cliente.apellido,
                                telefono: cliente.telefono,
                                telefono2: cliente.telefono2,
                                rnc: cliente.rnc,
                                fechacumpleano: cliente.fechacumpleano,
                                facebook: cliente.facebook,
                                correoelectronico: cliente.correoelectronico,
                                customerCallback: _this65.props.customerCallback
                            });
                        })
                    )
                )
            );
        }
    }]);

    return CustomerTable;
}(React.Component);

var CustomerTablebody = function (_React$Component43) {
    _inherits(CustomerTablebody, _React$Component43);

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
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        Link,
                        { className: 'btn btn-default', to: '/updatecustomer/' + this.props.id },
                        React.createElement('i', { className: 'fa fa-edit', 'aria-hidden': 'true' })
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.props.customerCallback.ondeleted.bind(this, this.props.id) },
                        React.createElement('i', { className: 'fa fa-trash', 'aria-hidden': 'true' })
                    )
                )
            );
        }
    }]);

    return CustomerTablebody;
}(React.Component);

var CustomerSearch = function (_React$Component44) {
    _inherits(CustomerSearch, _React$Component44);

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
                            React.createElement('input', { onChange: this.props.customerCallback.onchangefilter.bind(this),
                                type: 'text',
                                className: 'form-control', id: 'first_name', name: 'first_name' })
                        )
                    )
                )
            );
        }
    }]);

    return CustomerSearch;
}(React.Component);

var CustomerModal = function (_React$Component45) {
    _inherits(CustomerModal, _React$Component45);

    function CustomerModal() {
        _classCallCheck(this, CustomerModal);

        var _this68 = _possibleConstructorReturn(this, (CustomerModal.__proto__ || Object.getPrototypeOf(CustomerModal)).call(this));

        _this68.state = {

            value: ""
        };
        return _this68;
    }

    _createClass(CustomerModal, [{
        key: 'handleChange',
        value: function handleChange(event) {

            if (event.target.value.length <= 10) {
                this.setState({
                    value: event.target.value
                });
            }
        }
    }, {
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
                                    'Direccion'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'direccion', type: 'text', placeholder: 'Direccion' })
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
                                    'Telefono #1'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'telefono', type: 'number', placeholder: 'Telefono #1', onChange: this.handleChange.bind(this), value: this.state.value })
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
                                    'Telefono #2'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'telefono2', type: 'text', placeholder: 'Telefono #2' })
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
                                    'Nombre Empresa'
                                ),
                                React.createElement(
                                    Col,
                                    { sm: 9 },
                                    React.createElement(FormControl, { name: 'nombreempresa', type: 'text', placeholder: 'Nombre Empresa' })
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

var UpdateCustomer = function (_React$Component46) {
    _inherits(UpdateCustomer, _React$Component46);

    function UpdateCustomer() {
        _classCallCheck(this, UpdateCustomer);

        var _this69 = _possibleConstructorReturn(this, (UpdateCustomer.__proto__ || Object.getPrototypeOf(UpdateCustomer)).call(this));

        _this69.state = {

            parameter: '',
            showModal: true,
            customerAPI: []
        };

        return _this69;
    }

    _createClass(UpdateCustomer, [{
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
            var _this70 = this;

            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this70.setState({

                    customerAPI: responseData
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
            var _this71 = this;

            event.preventDefault();

            var nextState = this.state.customerAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this71.state.parameter;
            });

            nextState[index].telefono = event.target.telefono.value;

            var today = moment(new Date()).format('YYYY-MM-DD');

            nextState[index].date = today;

            this.setState({

                customerAPI: nextState
            });

            fetch(API_URL + '/updatecustomer', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": this.state.parameter, "telefono": event.target.telefono.value, "date": today })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this72 = this;

            var nextState = this.state.customerAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this72.state.parameter;
            });

            var name = void 0;
            var apellido = void 0;
            var telefono = void 0;
            var telefono2 = void 0;
            var rnc = void 0;
            var fechacumpleano = void 0;
            var facebook = void 0;
            var correoelectrico = void 0;
            var descuento = void 0;
            var environment = void 0;
            var item = void 0;
            var category = void 0;

            if (nextState[index]) {

                name = nextState[index].name;
                apellido = nextState[index].apellido;
                telefono = nextState[index].telefono;
                telefono2 = nextState[index].telefono2;
                rnc = nextState[index].rnc;
                fechacumpleano = nextState[index].fechacumpleano;
                facebook = nextState[index].facebook;
                correoelectrico = nextState[index].correoelectrico;
                descuento = nextState[index].descuento;
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
                            name
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
                                'Nombre'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'name', value: name, type: 'text', placeholder: 'Nombre', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Apellido'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'apellido', value: apellido, type: 'text', placeholder: 'Apellido', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Telefono #1'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'telefono', type: 'text', placeholder: telefono })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Telefono #2'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'telefono2', value: telefono2, type: 'text', placeholder: 'Telefono #2', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'RNC'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'rnc', value: rnc, type: 'text', placeholder: 'RNC', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Fecha de Cumplea\xF1o'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'fechacumpleano', value: fechacumpleano, type: 'date', placeholder: 'Fecha de Cumplea\xF1o', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Facebook'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'facebook', value: rnc, type: 'text', placeholder: 'Facebook', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Correo Electronico'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'correoelectrico', value: rnc, type: 'text', placeholder: 'Correo Electronico', disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: 'formHorizontalName' },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                'Descuento'
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: 'descuento', value: rnc, type: 'text', placeholder: 'Descuento', disabled: true })
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

    return UpdateCustomer;
}(React.Component);

var UpdateDelivery = function (_React$Component47) {
    _inherits(UpdateDelivery, _React$Component47);

    function UpdateDelivery() {
        _classCallCheck(this, UpdateDelivery);

        var _this73 = _possibleConstructorReturn(this, (UpdateDelivery.__proto__ || Object.getPrototypeOf(UpdateDelivery)).call(this));

        _this73.state = {

            showModal: true,
            parameter: 0,
            masterAPI: []
        };
        return _this73;
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
            var _this74 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this74.setState({

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
            var _this75 = this;

            event.preventDefault();

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this75.state.parameter;
            });

            var newDate = event.target.fechaentrega.value;

            var formatedDate = "* " + newDate.substring(8, 10) + "/" + newDate.substring(5, 7) + "/" + newDate.substring(0, 4);

            var newUpdate = {

                "index": index,
                "id": this.state.parameter,
                "fechaentrega": formatedDate

                // let newUpdate = {

                //     "index":index,
                //     "id":this.state.parameter,
                //     "fechaentrega": event.target.fechaentrega.value
                // }

            };fetch(API_URL + '/updatedelivery', {

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

var Payment = function (_React$Component48) {
    _inherits(Payment, _React$Component48);

    function Payment() {
        _classCallCheck(this, Payment);

        var _this76 = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this));

        _this76.state = {

            showModal: true,
            parameter: 0,
            masterAPI: [],
            balance: 0,
            pendiente: 0,
            actual: 0
        };
        return _this76;
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
            var _this77 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this77.setState({

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
            var _this78 = this;

            event.preventDefault();

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this78.state.parameter;
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
            var _this79 = this;

            var nextState = this.state.masterAPI;

            var index = nextState.findIndex(function (x) {
                return x.id == _this79.state.parameter;
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

var PrintPayment = function (_React$Component49) {
    _inherits(PrintPayment, _React$Component49);

    function PrintPayment() {
        _classCallCheck(this, PrintPayment);

        var _this80 = _possibleConstructorReturn(this, (PrintPayment.__proto__ || Object.getPrototypeOf(PrintPayment)).call(this));

        _this80.state = {

            masterAPI: [],
            customerAPI: [],
            detailData: [],
            list: []
        };
        return _this80;
    }

    _createClass(PrintPayment, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this81 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this81.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this81.setState({

                    customerAPI: responseData
                });
            });
            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this81.setState({

                    detailData: responseData
                });
            });
            fetch(API_URL + '/list', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this81.setState({

                    list: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this82 = this;

            var filteredTable = this.state.masterAPI.filter(function (master) {
                return master.id == _this82.props.params.printid;
            });
            // let filteredTable=this.state.masterAPI.filter((master)=>master.id=="1550710651712")

            var name = void 0;

            var ncf = void 0;

            var rnc = void 0;

            if (filteredTable[0]) {

                name = filteredTable[0].name;
                ncf = filteredTable[0].ncf;
                rnc = filteredTable[0].rnc;
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
                                    'PLANCHAKI SRL.\xA0\xA0\xA0\xA0RNC: 131473865'
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    null,
                                    'Nombre del cliente'
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
                                    'RNC del cliente'
                                ),
                                React.createElement(
                                    'td',
                                    null,
                                    rnc
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
                                        'Balance Neto'
                                    ),
                                    React.createElement(
                                        'th',
                                        null,
                                        'Balance + ITBIS'
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
                                            (master.balance * 0.18).toFixed(2)
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

var Home = function (_React$Component50) {
    _inherits(Home, _React$Component50);

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
                        React.createElement(DashboardCustomer, null)
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
                        React.createElement(DashboardMaster, null)
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
                                            'Cumplea\xF1os de hoy'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse1', className: 'panel-collapse collapse in' },
                                    React.createElement(Birthday, null)
                                )
                            )
                        )
                    ),
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
                                            'Entregas para hoy'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse1', className: 'panel-collapse collapse in' },
                                    React.createElement(TodayReport, null)
                                )
                            )
                        )
                    ),
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
                                            'Recibidos hoy'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { id: 'collapse1', className: 'panel-collapse collapse in' },
                                    React.createElement(TodayItemReport, null)
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

var PartialsTwo = function (_React$Component51) {
    _inherits(PartialsTwo, _React$Component51);

    function PartialsTwo() {
        _classCallCheck(this, PartialsTwo);

        var _this84 = _possibleConstructorReturn(this, (PartialsTwo.__proto__ || Object.getPrototypeOf(PartialsTwo)).call(this));

        _this84.state = {

            masterAPI: []
        };
        return _this84;
    }

    _createClass(PartialsTwo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this85 = this;

            fetch(API_URL + '/masterAPI', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this85.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

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

var PartialsTwoTableBody = function (_React$Component52) {
    _inherits(PartialsTwoTableBody, _React$Component52);

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
                                'Precio'
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
                                quantity: master.quantity,
                                project: master.project
                            });
                        })
                    )
                )
            );
        }
    }]);

    return PartialsTwoTableBody;
}(React.Component);

var PartialsTwoTableBodyDetail = function (_React$Component53) {
    _inherits(PartialsTwoTableBodyDetail, _React$Component53);

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
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.project
                )
            );
        }
    }]);

    return PartialsTwoTableBodyDetail;
}(React.Component);

var Birthday = function (_React$Component54) {
    _inherits(Birthday, _React$Component54);

    function Birthday() {
        _classCallCheck(this, Birthday);

        var _this88 = _possibleConstructorReturn(this, (Birthday.__proto__ || Object.getPrototypeOf(Birthday)).call(this));

        _this88.state = {
            customers: []
        };
        return _this88;
    }

    _createClass(Birthday, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this89 = this;

            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this89.setState({

                    customers: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var today = moment(new Date()).week();

            var filteredTable = this.state.customers.filter(function (master) {
                return moment(master.fechacumpleano).week() == today;
            });

            return React.createElement(
                'ul',
                { className: 'list-group' },
                filteredTable.map(function (customer, index) {
                    return React.createElement(
                        'li',
                        { className: 'list-group-item' },
                        React.createElement(
                            'span',
                            { className: 'badge' },
                            customer.fechacumpleano
                        ),
                        customer.name + " " + customer.apellido
                    );
                })
            );
        }
    }]);

    return Birthday;
}(React.Component);

var DashboardCustomer = function (_React$Component55) {
    _inherits(DashboardCustomer, _React$Component55);

    function DashboardCustomer() {
        _classCallCheck(this, DashboardCustomer);

        var _this90 = _possibleConstructorReturn(this, (DashboardCustomer.__proto__ || Object.getPrototypeOf(DashboardCustomer)).call(this));

        _this90.state = {
            customers: []
        };
        return _this90;
    }

    _createClass(DashboardCustomer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this91 = this;

            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this91.setState({

                    customers: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
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
                                this.state.customers.length
                            ),
                            React.createElement(
                                'p',
                                { className: 'announcement-text' },
                                'Clientes'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return DashboardCustomer;
}(React.Component);

var Quotation = function (_React$Component56) {
    _inherits(Quotation, _React$Component56);

    function Quotation() {
        _classCallCheck(this, Quotation);

        var _this92 = _possibleConstructorReturn(this, (Quotation.__proto__ || Object.getPrototypeOf(Quotation)).call(this));

        _this92.state = {

            showModal: false,
            inputText: '',
            masterAPI: [],
            parameter: '',
            customerAPI: []
        };
        return _this92;
    }

    _createClass(Quotation, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this93 = this;

            fetch(API_URL + '/quotation', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": this.props.params.quotationid })
            }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this93.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/customer', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this93.setState({

                    customerAPI: responseData
                });
            });

            this.setState({
                parameter: this.props.params.quotationid
            });
        }
    }, {
        key: 'onMarkAsQuoted',
        value: function onMarkAsQuoted() {
            fetch(API_URL + '/quotationmark', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "id": this.state.parameter })
            });
            console.log(this.state.parameter);
        }
    }, {
        key: 'render',
        value: function render() {

            var nextState = this.state.masterAPI;

            var obj = nextState[0];

            var name = void 0;
            var address = void 0;
            var phone = void 0;
            var rnc = void 0;
            var email = void 0;
            var quoteId = void 0;
            var date = void 0;
            var subtotal = void 0;
            var grandTotal = void 0;

            if (obj) {
                name = obj.name.toUpperCase();
                quoteId = obj.id;
                date = obj.date;
                subtotal = obj.project;
                grandTotal = obj.grandTotal;

                var customer = this.state.customerAPI.filter(function (master) {
                    return master.telefono.indexOf(obj.item[0].telefono) !== -1;
                });

                if (customer[0]) {
                    if (customer[0].address) {
                        address = 'n/a';
                    } else {
                        address = customer[0].direccion;
                    }
                    if (customer[0].telefono == null) {
                        phone = 'n/a';
                    } else {
                        phone = customer[0].telefono;
                    }
                    if (customer[0].correoelectronico == "") {
                        email = 'n/a';
                    } else {
                        email = customer[0].correoelectronico;
                    }
                    if (customer[0].rnc == "") {
                        rnc = 'n/a';
                    } else {
                        rnc = customer[0].rnc;
                    }
                }
            }

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Grid,
                    null,
                    React.createElement(
                        Row,
                        null,
                        React.createElement('img', { src: '/logoprint.png' })
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { md: 6 },
                            React.createElement(
                                Panel,
                                null,
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Name: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 10 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        name
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Address: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 10 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        'n/a'
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Phone:'
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 10 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        phone
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'RNC: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 10 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        rnc
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Email: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 10 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        email
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            Col,
                            { md: 6 },
                            React.createElement(
                                Panel,
                                null,
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Quote-Id: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        quoteId
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Date: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        date
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Valid-Date: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        'n/a'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(QuotationTable, {
                            master: this.state.masterAPI
                        })
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(Col, { md: 6 }),
                        React.createElement(
                            Col,
                            { md: 6 },
                            React.createElement(
                                Panel,
                                null,
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'Sub-Total: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        subtotal,
                                        '.00'
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'ITBIS: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        subtotal * 18 / 100,
                                        '.00'
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 3 },
                                    React.createElement(
                                        'h5',
                                        { style: { 'font-weight': 'bold' } },
                                        'TOTAL: '
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { xs: 9 },
                                    React.createElement(
                                        'h5',
                                        null,
                                        grandTotal,
                                        '.00'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Button,
                            { onClick: this.onMarkAsQuoted.bind(this) },
                            ' Mark as Quoted '
                        )
                    )
                )
            );
        }
    }]);

    return Quotation;
}(React.Component);

var QuotationTable = function (_React$Component57) {
    _inherits(QuotationTable, _React$Component57);

    function QuotationTable() {
        _classCallCheck(this, QuotationTable);

        return _possibleConstructorReturn(this, (QuotationTable.__proto__ || Object.getPrototypeOf(QuotationTable)).apply(this, arguments));
    }

    _createClass(QuotationTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
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
                                'Description'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Quantity'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Price'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Amount'
                            )
                        )
                    ),
                    this.props.master.map(function (todo, index) {
                        return React.createElement(QuotationTableBody, {
                            key: index,
                            id: todo.id,
                            item: todo.item,
                            quantity: todo.quantity
                        });
                    })
                )
            );
        }
    }]);

    return QuotationTable;
}(React.Component);

var QuotationTableBody = function (_React$Component58) {
    _inherits(QuotationTableBody, _React$Component58);

    function QuotationTableBody() {
        _classCallCheck(this, QuotationTableBody);

        return _possibleConstructorReturn(this, (QuotationTableBody.__proto__ || Object.getPrototypeOf(QuotationTableBody)).apply(this, arguments));
    }

    _createClass(QuotationTableBody, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'tbody',
                null,
                this.props.item.map(function (todo, index) {
                    return React.createElement(QuotationTableBodyDetail, {
                        key: index,
                        id: todo.id,
                        item: todo.item,
                        quantity: todo.quantity,
                        project: todo.project
                    });
                })
            );
        }
    }]);

    return QuotationTableBody;
}(React.Component);

var QuotationTableBodyDetail = function (_React$Component59) {
    _inherits(QuotationTableBodyDetail, _React$Component59);

    function QuotationTableBodyDetail() {
        _classCallCheck(this, QuotationTableBodyDetail);

        return _possibleConstructorReturn(this, (QuotationTableBodyDetail.__proto__ || Object.getPrototypeOf(QuotationTableBodyDetail)).apply(this, arguments));
    }

    _createClass(QuotationTableBodyDetail, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(this.props.item);
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
                    this.props.item
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.quantity
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.project,
                    '.00'
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.project * 118 / 100,
                    '.00'
                )
            );
        }
    }]);

    return QuotationTableBodyDetail;
}(React.Component);

var TodayReport = function (_React$Component60) {
    _inherits(TodayReport, _React$Component60);

    function TodayReport() {
        _classCallCheck(this, TodayReport);

        var _this97 = _possibleConstructorReturn(this, (TodayReport.__proto__ || Object.getPrototypeOf(TodayReport)).call(this));

        _this97.state = {
            master: []
        };
        return _this97;
    }

    _createClass(TodayReport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this98 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this98.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var today = moment(new Date()).format('DD/MM/YYYY');

            var filteredTable = this.state.master.filter(function (master) {
                return master.fechaentrega.split(' ')[1] == today;
            });

            return React.createElement(
                'ul',
                { className: 'list-group' },
                filteredTable.map(function (master, index) {
                    return React.createElement(
                        'li',
                        { className: 'list-group-item' },
                        React.createElement(
                            'span',
                            { className: 'badge' },
                            master.fechaentrega
                        ),
                        master.name
                    );
                })
            );
        }
    }]);

    return TodayReport;
}(React.Component);

var TodayItemReport = function (_React$Component61) {
    _inherits(TodayItemReport, _React$Component61);

    function TodayItemReport() {
        _classCallCheck(this, TodayItemReport);

        var _this99 = _possibleConstructorReturn(this, (TodayItemReport.__proto__ || Object.getPrototypeOf(TodayItemReport)).call(this));

        _this99.state = {
            master: []
        };
        return _this99;
    }

    _createClass(TodayItemReport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this100 = this;

            fetch(API_URL + '/masteritemreport', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this100.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var today = moment(new Date()).format('DD/MM/YYYY');

            return React.createElement(
                'ul',
                { className: 'list-group' },
                this.state.master.map(function (master) {
                    return React.createElement(
                        'li',
                        { className: 'list-group-item' },
                        React.createElement(
                            'span',
                            { className: 'badge' },
                            master.total
                        ),
                        master._id
                    );
                })
            );
        }
    }]);

    return TodayItemReport;
}(React.Component);

var DashboardMaster = function (_React$Component62) {
    _inherits(DashboardMaster, _React$Component62);

    function DashboardMaster() {
        _classCallCheck(this, DashboardMaster);

        var _this101 = _possibleConstructorReturn(this, (DashboardMaster.__proto__ || Object.getPrototypeOf(DashboardMaster)).call(this));

        _this101.state = {
            master: []
        };
        return _this101;
    }

    _createClass(DashboardMaster, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this102 = this;

            fetch(API_URL + '/dashboardmaster', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this102.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
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
                                '$ ',
                                this.state.master.map(function (master) {
                                    return master.total + ".00";
                                })
                            ),
                            React.createElement(
                                'p',
                                { className: 'announcement-text' },
                                'Ventas totales'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return DashboardMaster;
}(React.Component);

var DeliveryForToday = function (_React$Component63) {
    _inherits(DeliveryForToday, _React$Component63);

    function DeliveryForToday() {
        _classCallCheck(this, DeliveryForToday);

        return _possibleConstructorReturn(this, (DeliveryForToday.__proto__ || Object.getPrototypeOf(DeliveryForToday)).apply(this, arguments));
    }

    _createClass(DeliveryForToday, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Entregas para hoy'
                ),
                React.createElement(TodayCheckReport, null)
            );
        }
    }]);

    return DeliveryForToday;
}(React.Component);

var Matching = function (_React$Component64) {
    _inherits(Matching, _React$Component64);

    function Matching() {
        _classCallCheck(this, Matching);

        var _this104 = _possibleConstructorReturn(this, (Matching.__proto__ || Object.getPrototypeOf(Matching)).call(this));

        _this104.state = {
            master: [],
            parameter: "",
            parameter2: "",
            index: ""
        };
        return _this104;
    }

    _createClass(Matching, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this105 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this105.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({
                parameter: this.props.params.masterid,
                parameter2: this.props.params.itemid,
                index: this.props.params.index
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this106 = this;

            var master = this.state.master.filter(function (master) {
                return master.id == _this106.state.parameter;
            });

            return React.createElement(
                Table,
                null,
                React.createElement(
                    'tbody',
                    null,
                    master.map(function (master) {
                        return React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                master.item.filter(function (m2) {
                                    return m2.id == _this106.state.parameter2;
                                }).map(function (master2) {
                                    return React.createElement(
                                        Table,
                                        null,
                                        React.createElement(
                                            'tbody',
                                            null,
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    { className: 'print-cut' },
                                                    String.fromCharCode("<1D>vb<00>")
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    master.id,
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'td',
                                                    { colSpan: 2 },
                                                    master.date,
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    { colSpan: 3 },
                                                    master.name.toUpperCase(),
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    { colSpan: 3 },
                                                    master2.item,
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    "Usuario:",
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    "None",
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    master2.project.toFixed(2),
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    ' ',
                                                    ' ',
                                                    ' ',
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    ' ',
                                                    parseInt(_this106.state.index) + 1 + '-',
                                                    master.item.length,
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'td',
                                                    { className: 'print-cut' },
                                                    String.fromCharCode("<1D>vb<00>")
                                                )
                                            ),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement('br', null),
                                            React.createElement('br', null)
                                        )
                                    );
                                })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Matching;
}(React.Component);

var Delivery = function (_React$Component65) {
    _inherits(Delivery, _React$Component65);

    function Delivery() {
        _classCallCheck(this, Delivery);

        var _this107 = _possibleConstructorReturn(this, (Delivery.__proto__ || Object.getPrototypeOf(Delivery)).call(this));

        _this107.state = {
            master: []
        };
        return _this107;
    }

    _createClass(Delivery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this108 = this;

            fetch(API_URL + '/ubication', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this108.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
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
                        { xs: 2 },
                        'ID'
                    ),
                    React.createElement(
                        Col,
                        { xs: 2 },
                        'Actions'
                    )
                ),
                this.state.master.map(function (master) {
                    return React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 2 },
                            master._id
                        ),
                        React.createElement(
                            Col,
                            { xs: 2 },
                            React.createElement(
                                'a',
                                { className: 'btn btn-default', href: "javascript:window.open('https://maps.google.com/maps?q=" + master.latitute + "," + master.longitute + "','_blank','height=600,width=800');" },
                                'View'
                            )
                        )
                    );
                })
            );
        }
    }]);

    return Delivery;
}(React.Component);

var MasterModalDelete = function (_React$Component66) {
    _inherits(MasterModalDelete, _React$Component66);

    function MasterModalDelete() {
        _classCallCheck(this, MasterModalDelete);

        return _possibleConstructorReturn(this, (MasterModalDelete.__proto__ || Object.getPrototypeOf(MasterModalDelete)).apply(this, arguments));
    }

    _createClass(MasterModalDelete, [{
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Modal,
                    { show: this.props.showModalDelete, onHide: this.props.closeModal },
                    React.createElement(
                        Modal.Header,
                        { closeButton: true },
                        React.createElement(
                            'h1',
                            null,
                            'Delete Confirmation'
                        )
                    ),
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            Grid,
                            null,
                            React.createElement(
                                Row,
                                null,
                                React.createElement(
                                    Col,
                                    { xs: 2 },
                                    React.createElement(
                                        Button,
                                        { onClick: this.props.masterCallback.ondeletemaster.bind(this.props.id, this) },
                                        '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0Yes\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0'
                                    )
                                ),
                                React.createElement(
                                    Col,
                                    { smOffset: 4 },
                                    React.createElement(
                                        Button,
                                        { onClick: this.props.closeModal.bind(this) },
                                        '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0No\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MasterModalDelete;
}(React.Component);

var TodayCheckReport = function (_React$Component67) {
    _inherits(TodayCheckReport, _React$Component67);

    function TodayCheckReport() {
        _classCallCheck(this, TodayCheckReport);

        var _this110 = _possibleConstructorReturn(this, (TodayCheckReport.__proto__ || Object.getPrototypeOf(TodayCheckReport)).call(this));

        _this110.state = {
            master: []
        };
        return _this110;
    }

    _createClass(TodayCheckReport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this111 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {

                _this111.setState({

                    master: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var today = moment(new Date()).format('DD/MM/YYYY');

            var filteredTable = this.state.master.filter(function (master) {
                return master.fechaentrega.split(' ')[1] == today;
            });

            return React.createElement(
                'ul',
                { className: 'list-group' },
                filteredTable.map(function (master, index) {
                    return React.createElement(
                        'li',
                        { className: 'list-group-item' },
                        React.createElement(
                            'span',
                            { className: 'badge' },
                            'Fecha recibido:',
                            '\xA0',
                            master.date
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'span',
                            { className: 'badge' },
                            'Fecha entrega:',
                            '\xA0',
                            master.fechaentrega
                        ),
                        React.createElement(
                            'h3',
                            null,
                            master.name
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'span',
                            { className: 'btn btn-primary' },
                            '\xA0',
                            'Total',
                            '\xA0',
                            React.createElement(
                                'span',
                                { className: 'badge' },
                                master.item.length
                            )
                        ),
                        React.createElement('br', null),
                        React.createElement(
                            'span',
                            { className: 'btn btn-primary' },
                            master.item.map(function (itemMaster, indexItem) {
                                return React.createElement(
                                    'span',
                                    null,
                                    '\xA0',
                                    itemMaster.item,
                                    '\xA0',
                                    React.createElement(
                                        'span',
                                        { className: 'badge' },
                                        itemMaster.quantity
                                    ),
                                    React.createElement('br', null)
                                );
                            })
                        )
                    );
                })
            );
        }
    }]);

    return TodayCheckReport;
}(React.Component);

ReactDOM.render(React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: '/', component: App },
        React.createElement(IndexRoute, { component: Home }),
        React.createElement(Route, { path: 'matching/:masterid/:itemid/:index', component: Matching }),
        React.createElement(Route, { path: 'delivery', component: Delivery }),
        React.createElement(Route, { path: 'deliveryfortoday', component: DeliveryForToday }),
        React.createElement(Route, { path: 'quotation/:quotationid', component: Quotation }),
        React.createElement(Route, { path: 'printpayment/:printid', component: PrintPayment }),
        React.createElement(Route, { path: 'customer', component: Customer }),
        React.createElement(Route, { path: 'loader', component: Loader }),
        React.createElement(Route, { path: 'partialstwo', component: PartialsTwo }),
        React.createElement(Route, { path: 'partials', component: Partials }),
        React.createElement(Route, { path: 'updatedetail/:detailid', component: DetailModalUpdate }),
        React.createElement(Route, { path: 'updatedelivery/:deliveryid', component: UpdateDelivery }),
        React.createElement(Route, { path: 'updatecustomer/:detailid', component: UpdateCustomer }),
        React.createElement(Route, { path: 'payment/:paymentid', component: Payment }),
        React.createElement(Route, { path: 'actions/:actionid', component: Actions }),
        React.createElement(Route, { path: 'detail', component: Detail }),
        React.createElement(Route, { path: 'master', component: Master })
    )
), document.getElementById('contents'));