const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory ;

const Button = ReactBootstrap.Button;
const Label = ReactBootstrap.Label;
const ListGroup = ReactBootstrap.ListGroup;
const Radio = ReactBootstrap.Radio;
const ProgressBar = ReactBootstrap.ProgressBar;
const ListGroupItem = ReactBootstrap.ListGroupItem;
const Modal = ReactBootstrap.Modal;
const Nav = ReactBootstrap.Nav;
const Navbar = ReactBootstrap.Navbar;
const NavItem = ReactBootstrap.NavItem;
const NavDropdown = ReactBootstrap.NavDropdown;
const MenuItem = ReactBootstrap.MenuItem;

const Grid = ReactBootstrap.Grid;
const Row = ReactBootstrap.Row;
const Panel = ReactBootstrap.Panel;

const Pagination = ReactBootstrap.Pagination;

const Form = ReactBootstrap.Form;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

const Table = ReactBootstrap.Table;

const Autosuggest = Autosuggest;

const moment = moment;

const API_URL = 'http://localhost:8082';
//const API_URL = 'http://159.203.156.208:8082';

const API_HEADERS = {

    'Content-Type':'application/json',
    Authentication: 'any-string-you-like'
}

const languageActive = false;

let time;

class App extends React.Component{

  constructor(){

      super();
      this.state = {

          cookies: false
      }
  }

  componentDidMount(){

      fetch(API_URL+'/cookies',{headers: API_HEADERS})
      .then((response)=>response.json())
      .then((responseData)=>{
          this.setState({

              cookies: responseData
          })
      })
      .catch((error)=>{
          console.log('Error fetching and parsing data', error);
      })




  }

  setCookie(event){

      event.preventDefault();

      let newCookie = {

          "id":"1",
          "username": event.target.email.value,
          "password": event.target.password.value
      }

      fetch(API_URL+'/cookies', {

          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(newCookie)
      })


      window.location.reload();

  }

  render() {

    let dashboard = (

          <div>
            <Toolbar />
            <div className="container">
                {this.props.children}
            </div>
          </div>

    )

    let login = (

          <div>
            <Login
                    setcookie={this.setCookie}
            />
          </div>

    )
    if(this.state.cookies){

        return (

            <div>
                {dashboard}
            </div>
        )
    }
        return (

            <div>
                {login}
            </div>
        )
  }
}

class Actions extends React.Component{

    constructor(){

          super();
          this.state = {

              masterAPI: [],
              customerAPI: [],
              parameter: ''
          }

    }

    componentDidMount(){

          fetch(API_URL+'/master',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  customerAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          this.setState({

             parameter: this.props.params.actionid
          });

    }

    onPrinted(){

        window.print();

        window.location.href = '/';
    }

    render(){
                
        return(
            <div>
                <ActionsTable
                                parameter={this.state.parameter}
                                masterAPI={this.state.masterAPI.filter((master)=>master.id==this.state.parameter)}
                                customerAPI={this.state.customerAPI}
                />
                <Button onClick={this.onPrinted.bind(this)} >i&nbsp;</Button>
            </div>
        );
    }
}

class ActionsTable extends React.Component{


    render(){


        let nextState = this.props.masterAPI;

        let obj = nextState[0];

        let name;

        let added;

        if(obj){

            name = obj.name.toUpperCase();

            added = obj.item[0].itemDetail;

            let total = 0;

            for(var x=0;x<added.length;x++){
                total+= parseInt(added[x].project)
            }

            added=total;
        }

        let today = moment(new Date()).format('DD-MM-YYYY');


        let customerAPICust = this.props.customerAPI;
        
        let telefono;
        
        for(var x=0;x<nextState.length;x++){            
            if(nextState[x].id==this.props.parameter){
               telefono = nextState[x].item[0].telefono;
            }            
        }
        

        return(

            <div  id="printcss" style={{'margin':'0'}}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <img src="/logoprint.png"/>

<h5>EL TENDEDERO LAVANDERIA</h5>
<h5>RNC: 131213367</h5>
<h5>GALERIA 360, LOCAL S1-02</h5>
<h5>
    Santo Domingo. D.N.
</h5>
<h5>
    Tel.: (809)-378-0140</h5>
<br/>
                            <br/>
                            <h5 className="col-xs-offset-7">Fecha: {today}</h5>
                            <br/>
                            <h5>IdCliente : {telefono}</h5>                            
                            <h5>Nombre : {name}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover style={{'position':'relative','width':'55%', 'margin':'0'}}>
                                <thead>
                                  <tr>
                                    <th style={{'width':'15px','font-size':'25px', 'border-spacing':'030px'}}>#</th>
                                    <th style={{'width':'15px','font-size':'25px'}}>Cant.</th>
                                    <th style={{'width':'15px','font-size':'25px'}}>Descripcion</th>
                                    <th style={{'width':'15px','font-size':'25px'}}>Precio</th>
                                  </tr>
                                </thead>
                                    {this.props.masterAPI.map(
                                        (master,index) => <ActionsTableBody
                                                                 key={index}
                                                                 index={index}
                                                                 id={master.id}
                                                                 item={master.item}
                                                          />
                                    )}

                                    <ActionsTableBodyFooter
                                                 parameter={this.props.parameter}
                                                 masterAPI={this.props.masterAPI}
                                                 added={added}
                                    /> 

                              </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class ActionsTableBodyFooter extends React.Component{

    render(){

        let days = moment(new Date()).add(3,'days').format('dddd');
        if(days=='Monday'){
           days='Lunes'
        }else if(days=='Tuesday'){
           days='Martes'
        }else if(days=='Wednesday'){
           days='Miercoles'
        }else if(days=='Thursday'){
           days='Jueves'
        }else if(days=='Friday'){
           days='Viernes'
        }else if(days=='Saturday'){
           days='Sabado'
        }else{
           days='Domingo'
        }

        let today = moment(new Date()).add(3,'days').format('DD/MM/YYYY');
                    //moment().add(3, 'days').calendar();

        let nextState = this.props.masterAPI;

        let zoom = 0;

        let items;

        let piezas = 0;

        let servicio;
        
        let fechaentrega;
        
        let horaentrega;
        
        let agregado;
        
        let descuento;

        if(nextState[0]){

            zoom = nextState[0].project.toFixed(2);
            items = nextState[0].item.length;
            servicio = nextState[0].item[0].development;
            fechaentrega = nextState[0].fechaentrega;
            horaentrega = nextState[0].horaentrega;
            agregado = nextState[0].agregado.toFixed(2);
            descuento = nextState[0].desc.toFixed(2);            
            for(var x=0;x<nextState[0].item.length;x++){

                piezas+=parseInt(nextState[0].item[x].quantity);
            }
        }

        let itbis = ( 18 / 100) * zoom;

        let grandTotal;

        grandTotal = parseFloat(zoom) + parseFloat(itbis) * piezas;

        //grandTotal= parseFloat(zoom) + parseFloat(this.props.added) + parseFloat(itbis);

        //console.log(grandTotal);
        
        //grandTotal -= descuento;

        //grandTotal = 0;
    
        let nextStateFecha = this.props.masterAPI;

        return(
            <tfoot>
            <tr>
                <td>{items}Items</td>
                <td></td>
                <td>{piezas}Piezas</td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td style={{'width':'15px', 'font-size':'20px'}}>SubTotal:</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>{zoom}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td style={{'width':'15px', 'font-size':'20px'}}>+Agregado:</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>{agregado}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td style={{'width':'15px', 'font-size':'20px'}}>Desc.:</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>{descuento}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td style={{'width':'15px', 'font-size':'20px'}}>Itbis:</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>{itbis.toFixed(2)}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td style={{'width':'15px', 'font-size':'20px'}}>Grand Total:</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>{grandTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>F/Entrega: </td>
                <td colSpan={2}>{fechaentrega}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Hora: </td>
                <td>{horaentrega}</td>
                <td></td>
                <td></td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>
            <tr>
                <td colSpan={3}>{servicio}</td>
                <td></td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td colSpan={2}>Aprobacion Cliente</td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>
            <tr>
                <td colSpan={2}>Le Atendio:</td>
                <td>Admin</td>
                <td></td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>

            </tfoot>
        );
    }

}

class ActionsTableBody extends React.Component{

    render(){

        return(

                <tbody>
                {this.props.item.map(
                    (master, index) =>  <ActionsTableBodyDetail
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                name={master.firstname}
                                                quantity={master.quantity}
                                                item={master.item}
                                                itemDetail={master.itemDetail}
                                                development={master.development}
                                                project={master.project}
                                        />
                )}
               </tbody>
        );
    }
}

class ActionsTableBodyDetail extends React.Component{

    
    render(){
                
        return(
            <tr>
                    <td style={{'font-size':'20px'}}>&#8202;</td>
                    <td style={{'font-size':'20px'}}>{this.props.quantity}&#8202;</td>
                    <td style={{'font-size':'20px'}}>
                        {this.props.item}
                        <table>
                            <tr>
                                {this.props.itemDetail.map(
                                    (detail) => 
                                                    <td>   {detail.name}</td>
                                )}
                            </tr>
                        </table>
                    </td>
                    <td style={{'font-size':'20px'}}> &#8202;&#8202; {this.props.itemDetail[0].project}.00</td>
            </tr>
        );
    }
}

class Login extends React.Component{

    render(){

        return(

            <div id="login">
                <div className="container">
                    <div className="row vertical-offset-100">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Lavanderia El Tendedero</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.props.setcookie.bind(this)}>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="E-mail" name="email" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" name="password" type="password"/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me"/> Remember Me
                                            </label>
                                        </div>
                                            <button  className="btn btn-lg btn-success btn-block">Login</button>
                                    </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

class Toolbar extends React.Component{

    componentDidMount(){

        document.body.style.backgroundImage = "none";

    }

    onClicked(){

        window.location.reload();
    }

    render(){

        let toolbarES = (

            <Navbar>
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to={'/'} onClick={this.onClicked.bind(this)}>Info-Solutions SYS</Link>
                        </div>
                    </div>
                    <Nav>                      
                      <li><Link to={'/master'}>Ordenes</Link></li>
                      <li><Link to={'/detail'}>Inventario</Link></li>
                      <NavDropdown eventKey={3} title="Reportes" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/partials">Cuadre</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link to="/loader">Tracking</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/customer">Clientes</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/partialstwo">Cuadre Articulos</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                      </NavDropdown>
                      <li style={{'float':'right','position':'absolute','left':'80%'}}><Link onClick={this.onClicked} to={'/logout'}>Logout</Link></li>
                    </Nav>
                </Navbar>
        );

        let toolbarEN = (

            <Navbar>
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to={'/'} onClick={this.onClicked.bind(this)}>React-Bootstrap</Link>
                        </div>
                    </div>
                    <Nav>
                      
                      <li><Link to={'/master'}>Master</Link></li>
                      <li><Link to={'/detail'}>Details</Link></li>
                      <NavDropdown eventKey={3} title="DropDown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/partials">Draw</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link to="/loader">loaded</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/customer">Clientes</Link></MenuItem>
                            <MenuItem eventKey={3.3}><Link to="/partialstwo">Draw2</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                      </NavDropdown>
                      <li style={{'float':'right','position':'absolute','left':'80%'}}><Link onClick={this.onClicked} to={'/logout'}>Logout</Link></li>
                    </Nav>
                </Navbar>
        );

        if(languageActive){


            return(
                    <div>
                        {toolbarEN}
                    </div>
            );
        }else{
            return(
                    <div>
                        {toolbarES}
                    </div>
            );
        }
    }

}

class Master extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            activePage: 1,
            masterAPI: [],
            masterDetail: [],
            detail:[],
            detailData:[],
            detailAdded: [],
            temp: '',
            list: [],
            customerAPI: []
        };
    }

    componentDidMount(){



          fetch(API_URL+'/master',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  customerAPI: responseData
              })
          })
          fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })
          })
          fetch(API_URL+'/list',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  list: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          this.setState({

             parameter: this.props.params.actionid
          });

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });

        let nextState = this.state.detailData;

        let detailItem = [];

        for(var x=0;x<nextState.length;x++){
            detailItem.push(nextState[x]);
        }

        this.setState({

            detail: detailItem
        });

    }

    onSaveMaster(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let details = this.state.masterDetail;
        

        let name = details[0].firstname;

        let zoom = 0;
        
        let agregado = 0;
        
        let itbis = 0;
        
        for(var x=0;x<details.length;x++){
            if(details[x].itemDetail.length>0){
                for(var y=0;y<details[x].itemDetail.length;y++){                    
                    zoom+=parseInt(details[x].itemDetail[y].project);
                    agregado+=parseInt(details[x].itemDetail[y].project);
                }
            }
        }
        
        //items sumado sin agregado
        for(var x=0;x<details.length;x++){
            zoom+=parseInt(details[x].project);
        }
        
        itbis = ( 18 / 100) * zoom;
        itbis += ( 18 / 100) * agregado;

        let grandTotal = zoom + agregado + itbis;
        
        let nextStateCustomer = this.state.customerAPI;
        
        let descuento;
        
        for(var x=0;x<nextStateCustomer.length;x++){
            
            let completename= nextStateCustomer[x].name+' '+nextStateCustomer[x].apellido;
            
            if(completename==name){
                descuento = nextStateCustomer[x].descuento         
            }            
        }
        
        //console.log((parseInt(descuento)/100)*grandTotal);
        
        let grandDescuento = (parseInt(descuento)/100)*grandTotal;
        
        grandTotal -= grandDescuento;
        
        let days = moment(new Date()).add(3,'days').format('dddd');
        
        if(days=='Monday'){
           days='Lunes'
        }else if(days=='Tuesday'){
           days='Martes'
        }else if(days=='Wednesday'){
           days='Miercoles'
        }else if(days=='Thursday'){
           days='Jueves'
        }else if(days=='Friday'){
           days='Viernes'
        }else if(days=='Saturday'){
           days='Sabado'
        }else{
           days='Domingo'
        }

        let fechaentrega = moment(new Date()).add(3,'days').format('DD/MM/YYYY');
        
        let horaentrega = '06:00 PM';
        
        let newMaster = {

            "id": Date.now(),
            "date": today,
            "name": name,
            "item": this.state.masterDetail,
            "project": zoom,            
            "agregado": agregado,            
            "desc": grandDescuento,            
            "itbis": itbis,            
            "grandTotal": grandTotal,            
            "fechaentrega": days+' '+fechaentrega,            
            "horaentrega": horaentrega,
            "balance": 0,
            "pending": 0,
            "current": 0,
            "tipopago": "",
            "ncf": "A00000000000001",
            "status":"pending"
        }
        
        let nextState = this.state.masterAPI;

        nextState.push(newMaster);
        
        this.setState({

            masterAPI: nextState
        });

        this.setState({
            showModal: false,
            masterDetail: []
        });

        fetch(API_URL+'/master', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify(newMaster)
        })

    }

    onSaveDetail(event){

        event.preventDefault();

        //console.log(event.target.developmentlist.value);

        let nextState = this.state.masterDetail;

        let detailTotal = this.state.detailData;

        let itemFirst = event.target.suggest.value;

        let project;

        let category;

        for(var x=0;x<detailTotal.length;x++){
            if(detailTotal[x].name==itemFirst){
                if(event.target.environment){
                                           
                    if(event.target.environment.value.length>0){

                        project = event.target.environment.value;
                    }
                }else{
                    
                    project = detailTotal[x].environment;
                }
                category = detailTotal[x].category;

            }
        }

        let newItem;

        let newStateDetailAdded = [];

        let temp;

        if(project){

            newStateDetailAdded = this.state.detailAdded;

            //if(category=='shine'||category=='properties'){
            if(category=='colores'||category=='propiedades'){

                let newItemAdded = {

                        "name":itemFirst,
                        "project":project

                }

                newStateDetailAdded.push(newItemAdded);

                    this.setState({

                        detailAdded: newStateDetailAdded
                    });
            }else if(category=='servicio'){
            //}else if(category=='service'){

                this.setState({

                    temp: event.target.suggest.value
                });

                temp = event.target.suggest.value;

                if(this.state.temp!=event.target.suggest.value){
                    newStateDetailAdded = [];
                    this.setState({
                       detailAdded: []
                   });
                }


                project=project*parseInt(event.target.quantity.value)
                
                                
                let nextStateCust = this.state.customerAPI;
                
                let fullname;
                
                let telefono;
                
                for(var x=0;x<nextStateCust.length;x++){
                                        
                    if(nextStateCust[x].telefono==event.target.firstname.value){
                       fullname=nextStateCust[x].name + ' ' + nextStateCust[x].apellido;
                       telefono=event.target.firstname.value
                    }
                }

                newItem = {

                    "id": Date.now(),
                    "firstname":fullname,
                    "telefono":telefono,
                    "item":event.target.suggest.value,
                    "itemDetail": this.state.detailAdded,
                    "development":event.target.development.value,
                    "quantity":event.target.quantity.value,
                    "project":project,
                }

                nextState.push(newItem);


                this.setState({

                    masterDetail: nextState
                });

            }
        }else{

            alert('Por favor, introducir articulo valido!')
        }

    }

    onSaveDetailAdded(data){

        var item = document.getElementById('awesomplete-4vs0fr');

        console.log(document.getElementById('awesomplete-4vs0fr'));

    }

    onDeleteMaster(value){

        let nextState = this.state.masterAPI;

        var index = nextState.findIndex(x=> x.id==value);

        nextState.splice(index,1);

        this.setState({

            masterAPI: nextState
        });

        fetch(API_URL+'/deletemaster', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"id":index})
        })
    }

    onHandleUserInput(event){


        this.setState({

            filterText: event.target.value
        });
    }

    handleSelect(eventKey){

        this.setState({

            activePage: eventKey
        });

    }


    render(){
        
        let ModalButtonEN = (


                <Button onClick={this.open.bind(this)}>Add Master</Button>


        );

        let ModalButtonES = (

                <Button onClick={this.open.bind(this)}>Agregar Orden</Button>


        );

        let MasterTableEN = (

            "Master List"

        );

        let MasterTableES = (

            "Listado de Ordenes"

        );

        let ModalButtonActive;

        let MasterTableActive;

        if(languageActive){

           ModalButtonActive=ModalButtonEN
           MasterTableActive=MasterTableEN
        }else{

           ModalButtonActive=ModalButtonES
           MasterTableActive=MasterTableES
        }

        return(
            <div>
                <Row>
                    <MasterSearch
                                    filterText={this.state.filterText}
                                    masterCallback = {{
                                        onsavedetail:this.onSaveDetail.bind(this),
                                        onsavemaster:this.onSaveMaster.bind(this),
                                        onhandleuserinput:this.onHandleUserInput.bind(this)
                                    }}

                    />
                </Row>
                <Row>
                        <div className="pull-right">
                            {ModalButtonActive}
                            <MasterModal


                                            detailAdded={this.state.detailAdded}
                                            masterDetail={this.state.masterDetail}
                                            detail={this.state.detail}
                                            showModal={this.state.showModal}
                                            list={this.state.list}
                                            open={this.open}
                                            close={this.close.bind(this)}
                                            masterCallback = {{
                                                onsavedetail:this.onSaveDetail.bind(this),
                                                onsavedetailadded:this.onSaveDetailAdded.bind(this),
                                                onsavemaster:this.onSaveMaster.bind(this)
                                            }}
                            />
                        </div>
                </Row>
                <br/>
                <Row>
                    <Panel header={MasterTableActive}>
                        <MasterTable
                                        filterText={this.state.filterText}
                                        masterData={this.state.masterAPI}
                                        masterCallback = {{
                                            onsavedetail:this.onSaveDetail.bind(this),
                                            onsavemaster:this.onSaveMaster.bind(this),
                                            ondeletemaster:this.onDeleteMaster.bind(this)
                                        }}
                        />
                    </Panel>
                </Row>
            </div>
        );
    }
}

class MasterSearch extends React.Component{

    render(){

        let MasterSearchEN = (

            <div>
                <Panel header="Search Master">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Search:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control" id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        let MasterSearchES = (

            <div>
                <Panel header="Busqueda de Ordenes">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Buscar:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input
onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control"
id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        if(languageActive){
            return(
                <div>
                    {MasterSearchEN}
                </div>
            );
        }else{
            return(
                <div>
                    {MasterSearchES}
                </div>
            );
        }
    }
}

class MasterTable extends React.Component{

    constructor(){

        super();
        this.state = {

          currentPage: 1,
          todosPerPage: 3
        }
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }

    render(){

        let MasterTableEN = (

            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Name</th>
                <th>Item</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
        );

        let MasterTableES = (

            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Articulo</th>
                <th>Fecha de Entrega</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
        );

        let MasterTableActive;

        if(languageActive){

            MasterTableActive=MasterTableEN
        }else{

            MasterTableActive=MasterTableES
        }

        let filteredTable = this.props.masterData.filter(
            (master) => master.name.indexOf(this.props.filterText) !== -1
        )
        const { todos, currentPage, todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filteredTable.slice(indexOfFirstTodo,
indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredTable.length /
todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick.bind(this)}
            >
              <a role="button" href="#" id={number}>{number}</a>
            </li>
          );
        });

        return(
            <div>

                    <Table striped bordered condensed hover>
                        <thead>
                            {MasterTableActive}
                        </thead>
                        <tbody>
                            {currentTodos.map(
                                (todo,index) => <MasterTableBody

                                                                    key={index}
                                                                    id={todo.id}

date={todo.date}

name={todo.name}

item={todo.name}

fechaentrega={todo.fechaentrega}

horaentrega={todo.horaentrega}

status={todo.status}

masterCallback={this.props.masterCallback}
                                             />

                            )}
                        </tbody>
                      </Table>
                      <div className="pull-right">
                          <ul className="pagination pagination-sm">
                            <li id="1"><a role="button" href="#">«</a></li>
                            <li><a role="button" href="#">‹</a></li>
                              {renderPageNumbers}
                            <li><a role="button" href="#">›</a></li>
                            <li><a role="button" href="#">»</a></li>
                          </ul>
                    </div>
                </div>
        );
    }
}

class MasterTableBody extends React.Component{

    onExchange(data){

        
        fetch(API_URL+'/main', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"id":data})
        })

        let nextState = this.props.masterAPI;

        browserHistory.push("/main")

    }

    render(){

        return(
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.items}</td>
                    <td>{this.props.fechaentrega}{this.props.horaentrega}</td>
                    <td>{this.props.status}</td>
                    <td>
                        <Link className="btn btn-default" to={'/actions/'+this.props.id}><i className="fa fa-eye" aria-hidden="true"></i></Link>&nbsp;&nbsp;
                        <Link className="btn btn-default" to={'/updatedelivery/'+this.props.id}><i className="fa fa-edit" aria-hidden="true"></i></Link>&nbsp;&nbsp;                        
                        <Link className="btn btn-default" to={'/payment/'+this.props.id}><i className="fa fa-dollar" aria-hidden="true"></i></Link>&nbsp;&nbsp;                        
                        <Button onClick={this.onExchange.bind(this,this.props.id)}><i className="fa fa-exchange" aria-hidden="true"></i></Button>&nbsp;&nbsp;
                        <Button onClick={this.props.masterCallback.ondeletemaster.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>&nbsp;&nbsp;
                    </td>
                  </tr>
        );
    }
}

class MasterModalButton extends React.Component{

    render(){

        let MasterModalButtonEN = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Save</Button>
                </Col>

        );

        let MasterModalButtonES = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Guardar</Button>
                </Col>

        );

        let MasterModalButtonActive;

        if(languageActive){

            MasterModalButtonActive=MasterModalButtonEN
        }else{

            MasterModalButtonActive=MasterModalButtonES
        }


        return(
            <Row>
                {MasterModalButtonActive}
            </Row>

        );
    }
}

class MasterModal extends React.Component{

    render(){

        let MasterModalEN = (

            <Modal.Title>Modal Header</Modal.Title>
        );

        let MasterModalES = (

            <Modal.Title>Agregar Ordenes</Modal.Title>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalEN
        }else{

            MasterModalActive=MasterModalES
        }


        return(

            <div >
                <Modal show={this.props.showModal} onHide={this.props.close}>
                  <Modal.Header closeButton>
                    {MasterModalActive}
                  </Modal.Header>
                  <Modal.Body>
                        <MasterModalField
                                            detail={this.props.detail}
                                            list={this.props.list}
                                            masterCallback={this.props.masterCallback}
                        />
                        <br/>
                        {this.props.detailAdded.map(
                            (added) => <MasterModalLabel
                                                name={added.name}
                                        />
                        )}
                        <MasterModalTable

masterDetail={this.props.masterDetail }

masterCallback={this.props.masterCallback}
                        />
                        <MasterModalButton
masterCallback={this.props.masterCallback}
                        />
                  </Modal.Body>
                </Modal>
              </div>
        );
    }
}

class MasterModalLabel extends React.Component{

    render(){

        return(

            <span><Label bsStyle="warning">{this.props.name}</Label>&nbsp;</span>
        );
    }
}

class AwesompleteInput extends React.Component {
  // Dont forget to add:
  // css: https://cdn.rawgit.com/LeaVerou/awesomplete/gh-pages/awesomplete.css
  // js: https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.js
  // Awesomeplete tutorial:
//https://www.sitepoint.com/javascript-autocomplete-widget-awesomplete/
  componentWillMount() {
    if (!Awesomplete)
      throw(new Error('ERROR: Cannot find awesomplete.'));

    this.onChange = this.onChange.bind(this);
    this.onSelectComplete = this.onSelectComplete.bind(this);

    //window.addEventListener("awesomplete-selectcomplete",this.onSelectComplete,false);

    this.state = {
      value: this.props.value || this.props.defaultValue || ''
    };

    if (this.props.id != null)
      this._id = this.props.id;
    else
      this._id = 'awesomplete-' + Math.random().toString(36).substring(7);
  }

  componentDidMount() {
    var list = this.props.list;
    if (!list)
      list = [ 'one', 'two', 'three'];

    var input = document.getElementById(this._id);
    this._awesomplete = new Awesomplete(
      input,
      {
        minChars: 1,
        maxItems: 5,
        autoFirst: true
      }
    );
    this._awesomplete.list = list;
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange)
      this.props.onChange(event);
  }

  onSelectComplete(event) {
    if (event.target.id != this._id)
      return;

    this.onChange(event);

    if (this.props.onSelectComplete)
      this.props.onSelectComplete(event);
  }

  render() {
    var className = "awesomplete";
    var placeholder = this.props.placeholder || '';
    if (this.props.className)
      className += ' ' + this.props.className;

    return(<input style={{"width":"181%","color":"black"}}
             id={this._id}
             value={this.state.value}
             onChange={this.onChange}
             className={className}
             placeholder={placeholder}
             name="developmentlist"
             />);
  }
}

class AwesompleteInputList extends React.Component {
  // Dont forget to add:
  // css: https://cdn.rawgit.com/LeaVerou/awesomplete/gh-pages/awesomplete.css
  // js: https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.js
  // Awesomeplete tutorial:
//https://www.sitepoint.com/javascript-autocomplete-widget-awesomplete/
  componentWillMount() {
    if (!Awesomplete)
      throw(new Error('ERROR: Cannot find awesomplete.'));

    this.onChange = this.onChange.bind(this);
    this.onSelectComplete = this.onSelectComplete.bind(this);

    //window.addEventListener("awesomplete-selectcomplete",this.onSelectComplete,false);

    this.state = {
      value: this.props.value || this.props.defaultValue || ''
    };

    if (this.props.id != null)
      this._id = this.props.id;
    else
      this._id = 'awesompletelist-' + Math.random().toString(36).substring(7);
  }

  componentDidMount() {
    var list = this.props.list;
    if (!list)
      list = [ 'one', 'two', 'three'];

    var input = document.getElementById(this._id);
    this._awesomplete = new Awesomplete(
      input,
      {
        minChars: 1,
        maxItems: 5,
        autoFirst: true
      }
    );
    this._awesomplete.list = list;
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange)
      this.props.onChange(event);
  }

  onSelectComplete(event) {
    if (event.target.id != this._id)
      return;

    this.onChange(event);

    if (this.props.onSelectComplete)
      this.props.onSelectComplete(event);
  }

  render() {
    var className = "awesompletelist";
    var placeholder = this.props.placeholder || '';
    if (this.props.className)
      className += ' ' + this.props.className;

    return(<input style={{"width":"181%","color":"black"}}
             id={this._id}
             value={this.state.value}
             onChange={this.onChange}
             className={className}
             placeholder={placeholder}
             name="firstname"
             />);
  }
}

class MasterModalField extends React.Component{

    constructor(){

        super();
        this.state = {

            value: '',
            valueItem: '',
            alter: false,
            valueCombo: 'lavaryprensa'
        }
    }

    onChange(event, {newValue,method}){
        this.setState({

            value: newValue
        });
    }
    
    onChangeAlter(event){
        
        let nextState = this.state.alter;

        this.setState({
            valueCombo: event.target.value.toLowerCase().replace(/\s/g, '')
        });        
        
        if(event.target.value=='Alteracion'){
           this.setState({
               
               alter: true
           });           
        }
                
    }

    onChangeItem(data){
        this.setState({
            valueItem: data.target.value
        })
    }

    render(){

        let precio = 0;

        let datos = [];

        let filteredTableCombo = this.props.detail.filter(
            (detail) => detail.tipo.indexOf(this.state.valueCombo) !== -1
        )

        let filteredTable = filteredTableCombo.filter(
            (detail) => detail.name.indexOf(this.state.valueItem.toUpperCase()) !== -1
        )

        let MasterModalFieldEN = (
                <Row>
                    <Form onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Name
                              </Col>
                              <Col md={4} sm={6}>
                                <AwesompleteInputList name="firstname" className="form-control" list={this.props.list} />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalItem">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Item
                              </Col>
                              <Col md={4} sm={6}>
                                <AwesompleteInput className="form-control" list={this.props.detail} />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>List</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select" name="development" placeholder="List" required >
                                    <option value="select">Select</option>
                                    <option value="...">...</option>

                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Project
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="number" name="quantity" placeholder="Project" required />
                              </Col>
                              <Col md={2} sm={2} >
                                    <Button type="submit"><i className="fa fa-plus" aria-hidden="true"></i></Button>
                              </Col>
                            </FormGroup>
                        </Row>
                    </Form>

                  </Row>
        );

        let MasterModalFieldAlteration;

        if(this.state.alter){
         
                MasterModalFieldAlteration = (

                                
                                <Row>
                                    <FormGroup controlId="formHorizontalQuantity">
                                      <Col componentClass={ControlLabel} md={1} sm={2}>
                                        Precio
                                      </Col>
                                      <Col md={4} sm={6}>
                                        <FormControl type="text" name="environment" placeholder="Precio" />
                                      </Col>
                                    </FormGroup>
                                </Row>

                )
        }else{
            
                 MasterModalFieldAlteration = (
                 
                     <div></div>
                 )
            
        }

        let MasterModalFieldES = (

                <Row>
                    <Form onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Name
                              </Col>
                              <Col md={4} sm={6}>
                                <AwesompleteInputList name="firstname" className="form-control" list={this.props.list} />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>Tipo de Servicio</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl onChange={this.onChangeAlter.bind(this)} componentClass="select" name="development" placeholder="Tipo de Servicio" required >
                                    <option value="Lavar y Prensa">Lavar y Prensa</option>
                                    <option value="Solo Lavar">Solo Lavar</option>
                                    <option value="Solo Plancha">Solo Plancha</option>
                                    <option value="Alteracion">Alteracion</option>
                                    <option value="Agregados">Agregados</option>
                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalItem">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Articulo
                              </Col>
                              <Col md={4} sm={6} style={{"width":"31%"}}>
                                <AwesompleteInput onChange={this.onChangeItem.bind(this)} className="form-control" list={datos} />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>List</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select" multiple={true} name="suggest" placeholder="List" required >
                                    {filteredTable.map(
                                        (detail) => <option value={detail.name}>{detail.name}</option>
                                    )}
                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalQuantity">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Cantidad
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="number" name="quantity" placeholder="Cantidad" required />
                              </Col>
                              <Col md={2}>
                                    <Button type="submit"><i className="fa fa-plus" aria-hidden="true"></i></Button>
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                     </Form>
                  </Row>
        );

        let MasterModalFieldActive;

        if(languageActive){

            MasterModalFieldActive=MasterModalFieldEN
        }else{
            MasterModalFieldActive=MasterModalFieldES
        }

        return(
            <Grid>
                {MasterModalFieldActive}
            </Grid>
        );
    }
}

class MasterModalTable extends React.Component{


    render(){

        let MasterModalTableEN = (

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Star</th>
                <th>Item</th>
                <th>Development</th>
                <th>Project</th>
              </tr>
        );

        let MasterModalTableES = (

              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Articulo</th>
                <th>Tipo de Servicio</th>
                <th>Precio</th>
              </tr>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalTableEN
        }else{

            MasterModalActive=MasterModalTableES
        }

        return(

            <div>
                <Table striped bordered condensed hover>
                    <thead>
                      {MasterModalActive}
                    </thead>
                    <tbody>
                        {this.props.masterDetail.map(
                            (masterdetail,index) => <MasterModalTableBody
                                                         index={index+1}
                                                         key={index}
                                                         id={masterdetail.id}

firstname={masterdetail.firstname}

item={masterdetail.item}

itemDetail={masterdetail.itemDetail}

development={masterdetail.development}

project={masterdetail.project}

quantity={masterdetail.quantity}
                                              />
                        )}
                    </tbody>
                  </Table>
            </div>
        );
    }
}

class MasterModalTableBodyAdded extends React.Component{

    render(){

        return(

            <tr>
              <td><i className="fa fa-arrow-circle-o-right"
aria-hidden="true"></i></td>
              <td>{this.props.name}</td>
            </tr>
        );
    }
}

class MasterModalTableBodyAddedTotal extends React.Component{

    render(){

        return(

            <tr>
                <td>{this.props.project}</td>
            </tr>
        );
    }
}

class MasterModalTableBody extends React.Component{

    render(){

        if(true){

            return(

                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.firstname}</td>
                    <td>{this.props.quantity}</td>
                    <td>
                        <table>
                            <tr>
                                <td>{this.props.item}</td>
                            </tr>
                            {this.props.itemDetail.map(
                             (detail) => <MasterModalTableBodyAdded

name={detail.name}

                                         />
                             )}

                        </table>
                    </td>
                    <td>{this.props.development}</td>
                    <td>
                        {this.props.project}
                        <table>
                            {this.props.itemDetail.map(
                             (detail) => <MasterModalTableBodyAddedTotal

     project={detail.project}
                             />
                             )}

                        </table>
                    </td>
                </tr>

            );

        }else{

            return(

                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.firstname}</td>
                    <td>{this.props.development}</td>
                    <td>{this.props.item}</td>
                    <td>{this.props.project}</td>
                </tr>

            );
        }
    }

}

class Detail extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            showModalLoader: false,
            filterText: '',
            detailData: []
        }
    }

    componentDidMount(){
        
          fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              
 
                  this.setState({

                      detailData: responseData
                  })
                        

          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })
            
    }

    close() {
        this.setState({
            showModal: false,
        });
    }

    closeLoader() {
        this.setState({
            showModalLoader: false
        });
    }

    open() {
        this.setState({
            showModal: true,
        });
    }
    openLoader() {
        this.setState({
            showModalLoader: true
        });
    }

    onSaveDetail(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let newDetail = {

            "id": Date.now(),
            "date": today,
            "id": event.target.id.value,
            "name": event.target.name.value,
            "item": event.target.item.value,
            "environment": event.target.environment.value,
            "category": event.target.category.value,
            "tipo": event.target.tipo.value
        }

        let nextState = this.state.detailData;

        nextState.push(newDetail);


        fetch(API_URL+'/detail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify(newDetail)
        })

        this.setState({

            detailData: nextState,
            showModal: false
        });

    }

    onHandleChange(event){

        this.setState({

            filterText: event.target.value
        });
    }

    onUpdated(value){

        console.log(value);
    }

    onDeleted(value){

        let nextState = this.state.detailData;

        var index = nextState.findIndex(x=> x.id==value);

        nextState.splice(index,1);

        this.setState({

            detailData: nextState
        });

        fetch(API_URL+'/deletedetail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        })
    }

    render(){





        let DetailEN = (

            <Button onClick={this.open.bind(this)}>Add Detail</Button>
        );

        let DetailES = (

            <Button onClick={this.open.bind(this)}>Agregar Articulo</Button>
        );

        let DetailActive;

        if(languageActive){
            DetailActive=DetailEN
        }else{
            DetailActive=DetailES
        }

        return(
            <Grid>

                <Row>
                    <DetailSearch
                                    filterText={this.state.filterText}
                                    detailCallback={{

onHandleChange:this.onHandleChange.bind(this)
                                    }}
                    />
                </Row>
                <Row>
                        <div className="pull-right">
                            {DetailActive}
                            <DetailModal showModal={this.state.showModal}
                                            detailCallback={{
                                                open:this.open,
                                                close:this.close.bind(this),
                                                onsavedetail:this.onSaveDetail.bind(this)
                                            }}
                            />
                            <DetailLoaderModal showModal={this.state.showModalLoader}
                                            detailCallback={{
                                                open:this.openLoader,
                                                close:this.closeLoader.bind(this),
                                                onsavedetail:this.onSaveDetail.bind(this)
                                            }}
                            />
                        </div>
                </Row>
                <br/>
                <Row>
                    <DetailTable
                                    filterText={this.state.filterText}
                                    detailData={this.state.detailData}
                                    detailCallback={{
                                              onUpdated:
this.onUpdated.bind(this),
                                              onDeleted:
this.onDeleted.bind(this),
                                    }}
                    />
                </Row>
            </Grid>
        );
    }
}

class DetailSearch extends React.Component{

    render(){

        let DetailSearchEN = (

            <Panel header="Search Detail">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Search:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        )

        let DetailSearchES = (

            <Panel header="Busqueda ">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Buscar:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        );

        let DetailSearchActive;

        if(languageActive){

            DetailSearchActive=DetailSearchEN
        }else{
            DetailSearchActive=DetailSearchES
        }

        return(
            <div>
                {DetailSearchActive}
            </div>
        );
    }
}

class DetailTable extends React.Component{

    constructor() {
            super();
            this.state = {
              todos: [],
              currentPage: 1,
              todosPerPage: 10,
              detailItem: []
            };
            this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
            this.setState({
              currentPage: Number(event.target.id)
            });
    }

    onChangedNext(){
        let nextState = this.props.detailData;
        fetch(API_URL+'/detailnext', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({"id":"test"})
        })
        .then((response)=>response.json())
        .then((responseData)=>{
                this.setState({

                    detailItem: responseData
                })
        })

        for(var x=0;x<this.state.detailItem;x++){
            nextState.push(this.state.detailItem[x]);
        }
        
    }

    render(){

        let filteredTable = this.props.detailData.filter(
            (detail) => detail.name.indexOf(this.props.filterText) !== -1
        )

        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filteredTable.slice(indexOfFirstTodo,indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredTable.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              <a role="button" href="#" id={number}>{number}</a>
            </li>
          );
        });

        let DetailTableEN = (

            <Panel header="Search List">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Environment</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
            {currentTodos.map(
                (todo, index) => <DetailTableBody
                                                        key={index}
                                                        id={todo.id}
                                                        name={todo.name}
                                                        item={todo.item}
                                                        environment={todo.environment}
                                                        detailCallback={this.props.detailCallback}
                                 />
            )}
                    </tbody>
              </Table>
              <div className="pull-right">
                    <ul className="pagination pagination-sm">
                      <li id="1"><a role="button" href="#">«</a></li>
                      <li><a role="button" href="#">‹</a></li>
                      {renderPageNumbers}
                      <li><a role="button" href="#">›</a></li>
                      <li><a role="button" href="#">»</a></li>
                    </ul>
                  </div>
            </Panel>
        );

        let DetailTableES = (

            <Panel header="Listado ">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
            {currentTodos.map(
                (todo, index) => <DetailTableBody
                                                        key={index}
                                                        id={todo.id}
                                                        name={todo.name}
                                                        item={todo.item}
                                                        environment={todo.environment}
                                                        detailCallback={this.props.detailCallback}
                                 />
            )}
                    </tbody>
              </Table>
                    <div className="pull-right">
                    <ul className="pagination pagination-sm">
                      <li id="1"><a role="button" href="#">«</a></li>
                      <li><a role="button" href="#">‹</a></li>
                      {renderPageNumbers}
                      <li><a role="button" onClick={this.onChangedNext.bind(this)} >›</a></li>
                      <li><a role="button" href="#">»</a></li>
                    </ul>
                  </div>
            </Panel>
        );

        let DetailTableActive;

        if(languageActive){
            DetailTableActive=DetailTableEN
        }else{
            DetailTableActive=DetailTableES
        }

        return(
            <div>
                {DetailTableActive}
            </div>
        );
    }
}

class DetailModalUpdate extends React.Component{

     constructor(){

        super();
        this.state = {

            parameter: '',
            showModal: true,
            detailData: []
        }

    }

    close(){

        this.setState({

            showModal: false
        });

        //window.location.href = '/'
    }

    open(){

        this.setState({

            showModal: true
        });

    }

    componentDidMount(){

        fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
        })

        this.setState({

            parameter: this.props.params.detailid
        });

    }

    onSubmitted(event){

        event.preventDefault();

        let nextState = this.state.detailData;

        let index = nextState.findIndex(x=> x.id==this.state.parameter);

        nextState[index].environment = event.target.environment.value

        let today = moment(new Date()).format('YYYY-MM-DD');        

        nextState[index].date = today;

        this.setState({

            detailData: nextState
        });

        fetch(API_URL+'/updatedetail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"environment":event.target.environment.value, "date": today})
        })

        this.setState({

            showModal: false
        });


    }

    render(){

        let nextState = this.state.detailData;

        let index = nextState.findIndex(x=> x.id==this.state.parameter);

        let name;
        let environment;
        let item;
        let category;
        let tipo;

        if(nextState[index]){

            name = nextState[index].name
            environment = nextState[index].environment
            item = nextState[index].item
            category = nextState[index].category
            tipo = nextState[index].tipo
        }

        return(
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Editando a {this.state.parameter}</h1>
                    </Modal.Title>
                </Modal.Header>
                    <Form onSubmit={this.onSubmitted.bind(this)} horizontal>
                <Modal.Body>
                        <FormGroup controlId="formHorizontalId">
                          <Col componentClass={ControlLabel} sm={2}>
                            ID
                          </Col>
                          <Col sm={10}>
                            <FormControl value={this.state.parameter} type="id" placeholder="id" disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName">
                          <Col componentClass={ControlLabel} sm={2}>
                            Descripcion
                          </Col>
                          <Col sm={10}>
                            <FormControl name="name" value={name} type="text" placeholder="Descripcion" disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEnvironment">
                          <Col componentClass={ControlLabel} sm={2}>
                            Precio
                          </Col>
                          <Col sm={10}>
                            <FormControl name="environment" type="text" placeholder="Precio"  />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalItem">
                          <Col componentClass={ControlLabel} sm={2}>
                            Cantidad
                          </Col>
                          <Col sm={10}>
                            <FormControl name="item" type="text" placeholder={item} disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                          <Col componentClass={ControlLabel} sm={2}>
                            Categoria
                          </Col>
                          <Col sm={10}>
                            <FormControl name="category" type="text" value={category} disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                          <Col componentClass={ControlLabel} sm={2}>
                            Tipo
                          </Col>
                          <Col sm={10}>
                            <FormControl name="tipo" type="text" value={tipo} disabled />
                          </Col>
                        </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" >Guardar</Button>
                </Modal.Footer>
                    </Form>
            </Modal>
        );
    }
}

class DetailTableBody extends React.Component{

    render(){

        return(

              <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.item}</td>
                <td>{this.props.environment}</td>
                <td>
                    <Link className="btn btn-default" to={'/updatedetail/'+this.props.id}><i className="fa fa-edit" aria-hidden="true"></i></Link>
                    <Button onClick={this.props.detailCallback.onDeleted.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>
              </tr>

        );
    }
}

class DetailModal extends React.Component{

    render(){

        let DetailModalEN = (


                            <Modal show={this.props.showModal}
onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Form horizontal
onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup
controlId="formHorizontalid">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                ID
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="id" placeholder="ID" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalname">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Name
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="name" placeholder="Name" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalEnvironment">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Environment
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="environment" placeholder="Environment" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalItem">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Item
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="item" placeholder="Item" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalHost">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Host
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="host" placeholder="Host" />
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Save</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>


        );
        let DetailModalES = (


                            <Modal show={this.props.showModal} onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Agregar Articulo</Modal.Title>
                              </Modal.Header>
                              <Form horizontal onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup controlId="formHorizontalid">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Codigo
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl type="text" name="id" placeholder="Codigo" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalname">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Descripcion
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl type="text" name="name" placeholder="Descripcion" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalEnvironment">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Precio
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl type="text" name="environment" placeholder="Precio" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalItem">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Cantidad
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl type="text" name="item" placeholder="Cantidad" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalItem">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Categoria
                                              </Col>
                                              <Col sm={10}>
                                              <FormControl name="category" componentClass="select" placeholder="select">
                                                <option value="servicio">Servicio</option>
                                                <option value="colores">Colores</option>
                                                <option value="propiedades">Propiedades</option>
                                              </FormControl>
                                              </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalItem">
                                              <Col componentClass={ControlLabel} sm={2}>
                                                Tipo
                                              </Col>
                                              <Col sm={10}>
                                              <FormControl name="tipo" componentClass="select" placeholder="select">
                                                <option value="lavaryprensa">Lavar y Prensa</option>
                                                <option value="sololavar">Solo Lavar</option>
                                                <option value="soloplancha">Solo Plancha</option>
                                                <option value="alteracion">Alteracion</option>
                                                <option value="agregacion">Agregacion</option>
                                              </FormControl>
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Guardar</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>

        );

        let DetailModalActive;

        if(languageActive){
            DetailModalActive=DetailModalEN
        }else{
            DetailModalActive=DetailModalES
        }

        return(
            <div>
                {DetailModalActive}
            </div>

        );
    }
}

class DetailLoaderModal extends React.Component{

    render(){
        
        return(
        
            <Modal style={{'margin-top':'15%','overflow':'hidden'}} show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <ProgressBar active now={99} />
                </Modal.Body>
            </Modal>
        );
    }
}


class Partials extends React.Component{

     constructor(){

          super();
          this.state = {

              masterAPI: [],
              searchData: '2017-10-06',
              total: 0
          }

    }

    componentDidMount(){

          fetch(API_URL+'/reporte',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          let today = moment(new Date()).format('YYYY-MM-DD');

          this.setState({

              searchData: today
          });





    }

    onChanged(event){


        this.setState({

            searchData: event.target.value
        });

    }

    onRun(){

                let nextState = this.state.masterAPI.filter((master)=> master.date == this.state.searchData)

                let grand = 0;

                for(var x=0;x<nextState.length;x++){
                    grand+=parseInt(nextState[x].grandTotal);
                }

                this.setState({

                    total: grand
                })



        window.print();
    }

    render(){

        let PartialsEN = (

            <h1>Draw List</h1>
        );

        let PartialsES = (

            <h1>Reporte Cuadre</h1>
        );

        let PartialsActive;

        if(languageActive){

            PartialsActive=PartialsEN
        }else{

            PartialsActive=PartialsES
        }

        return(

             <Grid>
                    <Row>
                        <Col xs={6}>
                            {PartialsActive}
                        </Col>
                    </Row>
                    <Row>
                        <PartialsSearch
                                        onChanged={this.onChanged.bind(this)}
                        />
                        <PartialsTable


masterAPI={this.state.masterAPI.filter((master)=> master.date ==
this.state.searchData)}
                            total={this.state.total}
                        />
                    </Row>
                    <Row>
                        <Button onClick={this.onRun.bind(this)}>i</Button>
                    </Row>
            </Grid>
        );
    }
}

class PartialsSearch extends React.Component{

    render(){

        return(



                    <Col xs={6}>
                        <Form horizontal
onChange={this.props.onChanged.bind(this)}>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} xs={2}>

                              </Col>
                              <Col xs={6}>
                                <FormControl type="date" placeholder="Email" />
                              </Col>
                            </FormGroup>
                        </Form>
                    </Col>


        );
    }
}

class PartialsTable extends React.Component{



    render(){

        let partialsTableEN = (

            <tr>
                <th style={{'width':'15px', 'font-size':'25px',
'border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Date</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Name</th>
                <th style={{'width':'15px',
'font-size':'25px'}}>Project</th>
              </tr>
        );

        let partialsTableES = (

            <tr>
                <th style={{'width':'15px', 'font-size':'25px',
'border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Fecha</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Cliente</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Precio</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>TP</th>
              </tr>
        );

        let partialsTableActive;

        if(languageActive){

           partialsTableActive=partialsTableEN
        }else{

           partialsTableActive=partialsTableES
        }

        return(


                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover
style={{'width':'55%'}}>
                                <thead>
                                  {partialsTableActive}
                                </thead>
                                <tbody>
            {this.props.masterAPI.map(

                (master, index) => <PartialsTableBody
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                date={master.date}
                                                name={master.name}
                                                project={master.project}
                                                grandTotal={master.grandTotal}
                                                tipopago={master.tipopago}
                                                total={this.props.total}
                                    />
            )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td style={{'width':'10px',
'font-size':'20px'}}>Total</td>
                                        <td style={{'width':'10px',
'font-size':'20px'}}>RD${this.props.total.toFixed(2)}</td>
                                        <br/>
                                        <br/>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>

        );
    }

}

class PartialsTableBody extends React.Component{

    render(){



        return(

              <tr>
                <td></td>
                <td style={{'font-size':'20px'}}>{this.props.date}</td>
                <td style={{'font-size':'20px'}}>{this.props.name}</td>
                <td style={{'font-size':'20px'}}>{this.props.grandTotal.toFixed(2)}</td>
                <td style={{'font-size':'20px'}}>{this.props.tipopago.toUpperCase().substring(0,1)}</td>
              </tr>
        );
    }
}

class Loader extends React.Component{

    constructor(){

        super();
        this.state = {

            showModal: false,
            inputText: '',
            masterAPI: []
        }
    }

    close() {
        this.setState({ showModal: false });

        window.clearTimeout(time)
    }

    open() {
        this.setState({ showModal: true });

        time = window.setTimeout(function(msg) {

            fetch(API_URL+'/loader', {

                  method: 'post',
                  headers: API_HEADERS,
                  body: JSON.stringify({"id":this.state.inputText})
            })
            .then((response)=>response.json())
            .then((responseData)=>{
                  this.setState({

                      masterAPI: responseData
                  })
            })

            this.close();
        }.bind(this), 3000);
    }

    onSubmitSearch(event){

        event.preventDefault();

        this.setState({

            inputText: event.target.loadersearch.value
        })

        this.open();
    }

    render(){



        return(
            <div>
                <Row>
                    <Panel header="Search Loader">
                        <LoaderSearch
                                        showModal={this.state.showModal}
                                        loaderCallback={{
                                                    open:this.open.bind(this),
                                                    close:this.close.bind(this),
                                                    onsubmitsearch:this.onSubmitSearch.bind(this)
                                        }}        
                        />
                        <br/>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col componentClass={ControlLabel} sm={10}>

                            <LoaderModal
                                            showModal={this.state.showModal}
                                            loaderCallback={{
                                                open:this.open.bind(this),
                                                close:this.close.bind(this)
                                            }}
                            />
                        </Col>
                    </Panel>
                </Row>
                <Row>
                    <h4></h4>
                </Row>
                <Row>
                    <LoaderListGroup 
                                        masterAPI={this.state.masterAPI}                            
                    />
                </Row>
            </div>
        );
    }
}

class LoaderSearch extends React.Component{

    render(){

        return(

                <Form horizontal onSubmit={this.props.loaderCallback.onsubmitsearch.bind(this)}>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Search:
                      </Col>
                      <Col sm={10}>
                        <FormControl name="loadersearch" type="text" placeholder="Search" required />
                      </Col>
                    </FormGroup>                        
                      <Col smOffset={2}>
                        <Button type="submit" >Get Loader</Button>
                      </Col>
                </Form>

        );
    }
}

class LoaderListGroup extends React.Component{

    render(){

        let nextState = this.props.masterAPI;

        let date = nextState.date;

        let datedel = nextState.fechaentrega;

        let status = nextState.status;

            return(
                <Panel header="This Loader">
                    <ListGroup>
                    <ListGroupItem href="#link1">Date created: <Label bsStyle="success">{date}</Label></ListGroupItem>
                    <ListGroupItem href="#link2">Last update: <Label bsStyle="success">{datedel}</Label></ListGroupItem>
                    <ListGroupItem href="#link2">Comment: <Label bsStyle="success">{status}</Label></ListGroupItem>
                    <ListGroupItem href="#link2">Comments: <span>Coments</span></ListGroupItem>
                  </ListGroup>
                </Panel>
            );
    }
}

class LoaderModal extends React.Component{

    render(){
        
        return(
        
            <Modal style={{'margin-top':'15%','overflow':'hidden'}} show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <ProgressBar active now={99} />
                </Modal.Body>
            </Modal>
        );
    }
}

class Customer extends React.Component{
    
    constructor(){
        
        super();
        this.state = {
            
            showModal: false,
            customerAPI: [],
            filterText: ""
        }
    }
    
    componentDidMount(){

        fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  customerAPI: responseData
              })
        })

        this.setState({

            parameter: this.props.params.mainactionid
        })
    }

    
    close(){
        
        this.setState({
            
            showModal: false
        });
    }
    
    open(){
        
        this.setState({
            
            showModal: true
        });
    }
    
    onSaveCustomer(event){
        
        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');        

        let discount;

        if(event.target.descuento.value.length==0){
            discount = "0";
        }else{
            discount = event.target.descuento.value;
        }

        let newCustomer = {
            
            "id": Date.now(),
            "name": event.target.nombre.value,
            "apellido": event.target.apellido.value,
            "telefono": event.target.telefono.value,
            "telefono2": event.target.telefono2.value,
            "rnc": event.target.rnc.value,
            "fechacumpleano":event.target.fechacumpleano.value,
            "facebook":event.target.facebook.value,
            "correoelectronico":event.target.correoelectronico.value,
            "descuento":discount,
            "created": today 
            
        }
                
      fetch(API_URL+'/customer', {

          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(newCustomer)
      })
    
      let nextState = this.state.customerAPI;
        
      nextState.push(newCustomer);
        
      this.setState({
          
          customerAPI: nextState
      })
        
      this.setState({
          
          showModal: false
      });
        
    }

    onChangeFilter(event){

        this.setState({
            filterText: event.target.value
        })
    }

    onDeleted(value){

        let nextState = this.state.customerAPI;

        var index = nextState.findIndex(x=> x.id==value);
        
        nextState.splice(index,1);

        this.setState({

            customerAPI: nextState
        });

        fetch(API_URL+'/deletecustomer', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        });

    }

    
    render(){
        
        return(
        
            <div>
                <Row>
                    <CustomerSearch
                                        customerCallback={{
                                            onchangefilter: this.onChangeFilter.bind(this)
                                        }}
                    />
                </Row>
                <Row>
                    <div className="pull-right">
                        <Button onClick={this.open.bind(this)}>Agregar Cliente</Button>
                        <CustomerModal 
                                        showModal={this.state.showModal}
                                        customerCallback={{
                                                            open:this.open.bind(this),
                                                            close:this.close.bind(this),
                                                            onsavecustomer:this.onSaveCustomer.bind(this),
                                                            ondeleted:this.onDeleted.bind(this)
                                        }}
                        />
                    </div>
                </Row>     
                <br/>
                <Row>
                    <CustomerTable
                                    customer={this.state.customerAPI}
                                    filterText={this.state.filterText}                                    
                                    customerCallback={{
                                        open:this.open.bind(this),
                                        close:this.close.bind(this),
                                        onsavecustomer:this.onSaveCustomer.bind(this),
                                        ondeleted:this.onDeleted.bind(this)
                                    }}
                    />
                </Row>
            </div>
        );
    }
}
 
class CustomerTable extends React.Component{

    
    render(){
        
        let filteredTable = this.props.customer.filter(
            (master) => master.name.indexOf(this.props.filterText) !== -1
        )

        return(
        
            <Panel header="Listado de Cliente">
                <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono #1</th>
                    <th>Fecha Cumpleaño</th>
                    <th>Facebook</th>
                    <th>Correo Electronico</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {filteredTable.map(
                    (cliente, index) =>  <CustomerTablebody
                                                    key={index}
                                                    index={index}
                                                    id={cliente.id}
                                                    name={cliente.name}
                                                    apellido={cliente.apellido}
                                                    telefono={cliente.telefono}
                                                    telefono2={cliente.telefono2}
                                                    rnc={cliente.rnc}
                                                    fechacumpleano={cliente.fechacumpleano}
                                                    facebook={cliente.facebook}
                                                    correoelectronico={cliente.correoelectronico}
                                                    customerCallback={this.props.customerCallback}
                              />
                )}
                </tbody>
              </Table>
            </Panel>
        );
    }
}

class CustomerTablebody extends React.Component{
    
    render(){
        return(
        
                  <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.apellido}</td>
                    <td>{this.props.telefono}</td>
                    <td>{this.props.fechacumpleano}</td>
                    <td>{this.props.facebook}</td>
                    <td>{this.props.correoelectronico}</td>
                    <td>    
                            <Link className="btn btn-default" to={'/updatecustomer/'+this.props.id}><i className="fa fa-edit" aria-hidden="true"></i></Link>
                            <Button onClick={this.props.customerCallback.ondeleted.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>                            
                    </td>
                  </tr>

        );
    }
}

class CustomerSearch extends React.Component{
    
    render(){
        
        return(
        
            <Panel header="Busqueda de cliente">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                            <label>Buscar:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                            <input onChange={this.props.customerCallback.onchangefilter.bind(this)}
                                type="text"
                                className="form-control" id="first_name" name="first_name"/>
                        </div>
                    </div>
                    </form>
            </Panel>
        );
    }
}

class CustomerModal extends React.Component{
    
    render(){
        
        return(
        
            <Modal show={this.props.showModal} onHide={this.props.customerCallback.close}>
              <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
              </Modal.Header>
                    <Form horizontal onSubmit={this.props.customerCallback.onsavecustomer.bind(this)}>
              <Modal.Body>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Nombre
                              </Col>
                              <Col sm={9}>
                                <FormControl name="nombre" type="text" placeholder="Nombre" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                                  <Col componentClass={ControlLabel} sm={2}>
                                    Apellido
                                  </Col>
                                  <Col sm={9}>
                                    <FormControl name="apellido" type="text" placeholder="Apellido" />
                                  </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Telefono #1
                              </Col>
                              <Col sm={9}>
                                <FormControl name="telefono" type="text" placeholder="Telefono #1" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Telefono #2
                              </Col>
                              <Col sm={9}>
                                <FormControl name="telefono2" type="text" placeholder="Telefono #2" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                RNC
                              </Col>
                              <Col sm={9}>
                                <FormControl name="rnc" type="text" placeholder="RNC" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Fecha de Cumpleaños
                              </Col>
                              <Col sm={9}>
                                <FormControl name="fechacumpleano" type="date" placeholder="Fecha de Cumpleaños" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Facebook
                              </Col>
                              <Col sm={9}>
                                <FormControl name="facebook" type="text" placeholder="Facebook" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Correo Electronico
                              </Col>
                              <Col sm={9}>
                                <FormControl name="correoelectronico" type="text" placeholder="Correo Electrico" />
                              </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} sm={2}>
                                Descuento
                              </Col>
                              <Col sm={9}>
                                <FormControl name="descuento" type="text" placeholder="Descuento" />
                              </Col>
                            </FormGroup>
                        </Row>
              </Modal.Body>
              <Modal.Footer>
                        <Row>
                            <Col sm={10}>
                                <Button type="submit">Guardar</Button>
                            </Col>

                        </Row>
              </Modal.Footer>
                    </Form>

            </Modal>
        );
    }
}

class UpdateCustomer extends React.Component{

        constructor(){
   
           super();
           this.state = {
   
               parameter: '',
               showModal: true,
               customerAPI: []
           }
   
       }
   
       close(){
   
           this.setState({
   
               showModal: false
           });
   
           //window.location.href = '/'
       }
   
       open(){
   
           this.setState({
   
               showModal: true
           });
   
       }
   
       componentDidMount(){
   
           fetch(API_URL+'/customer',{headers: API_HEADERS})
             .then((response)=>response.json())
             .then((responseData)=>{
                 this.setState({
   
                     customerAPI: responseData
                 })
             })
             .catch((error)=>{
                 console.log('Error fetching and parsing data', error);
           })
   
           this.setState({
   
               parameter: this.props.params.detailid
           });
   
       }
   
       onSubmitted(event){
   
           event.preventDefault();
   
           let nextState = this.state.customerAPI;
   
           let index = nextState.findIndex(x=> x.id==this.state.parameter);

           nextState[index].telefono = event.target.telefono.value
   
           let today = moment(new Date()).format('YYYY-MM-DD');        
   
           nextState[index].date = today;
   
           this.setState({
   
               customerAPI: nextState
           });
   
           fetch(API_URL+'/updatecustomer', {
   
                 method: 'post',
                 headers: API_HEADERS,
                 body: JSON.stringify({"index":index,"telefono":event.target.telefono.value, "date": today})
           })
   
           this.setState({
   
               showModal: false
           });
   
   
       }
   
       render(){
   
           let nextState = this.state.customerAPI;
   
           let index = nextState.findIndex(x=> x.id==this.state.parameter);
   
           let name;
           let apellido;
           let telefono;
           let telefono2;
           let rnc;
           let fechacumpleano;
           let facebook;
           let correoelectrico;
           let descuento;
           let environment;
           let item;
           let category;
   
           if(nextState[index]){
   
               name = nextState[index].name
               apellido = nextState[index].apellido
               telefono = nextState[index].telefono
               telefono2 = nextState[index].telefono2
               rnc = nextState[index].rnc
               fechacumpleano = nextState[index].fechacumpleano
               facebook = nextState[index].facebook
               correoelectrico = nextState[index].correoelectrico
               descuento = nextState[index].descuento
           }
   
           return(
               <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                   <Modal.Header>
                       <Modal.Title>
                           {/* <h1>Editando a {this.state.parameter}</h1> */}
                           <h1>Editando a {name}</h1>
                       </Modal.Title>
                   </Modal.Header>
                       <Form onSubmit={this.onSubmitted.bind(this)} horizontal>
                   <Modal.Body>
                           <FormGroup controlId="formHorizontalId">
                             <Col componentClass={ControlLabel} sm={2}>
                               ID
                             </Col>
                             <Col sm={10}>
                               <FormControl value={this.state.parameter} type="id" placeholder="id" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Nombre
                             </Col>
                             <Col sm={10}>
                               <FormControl name="name" value={name} type="text" placeholder="Nombre" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Apellido
                             </Col>
                             <Col sm={10}>
                               <FormControl name="apellido" value={apellido} type="text" placeholder="Apellido" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Telefono #1
                             </Col>
                             <Col sm={10}>
                               <FormControl name="telefono" type="text" placeholder={telefono} />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Telefono #2
                             </Col>
                             <Col sm={10}>
                               <FormControl name="telefono2" value={telefono2} type="text" placeholder="Telefono #2" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               RNC
                             </Col>
                             <Col sm={10}>
                               <FormControl name="rnc" value={rnc} type="text" placeholder="RNC" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Fecha de Cumpleaño
                             </Col>
                             <Col sm={10}>
                               <FormControl name="fechacumpleano" value={fechacumpleano} type="date" placeholder="Fecha de Cumpleaño" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Facebook
                             </Col>
                             <Col sm={10}>
                               <FormControl name="facebook" value={rnc} type="text" placeholder="Facebook" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Correo Electronico
                             </Col>
                             <Col sm={10}>
                               <FormControl name="correoelectrico" value={rnc} type="text" placeholder="Correo Electronico" disabled />
                             </Col>
                           </FormGroup>
                           <FormGroup controlId="formHorizontalName">
                             <Col componentClass={ControlLabel} sm={2}>
                               Descuento
                             </Col>
                             <Col sm={10}>
                               <FormControl name="descuento" value={rnc} type="text" placeholder="Descuento" disabled />
                             </Col>
                           </FormGroup>                           
                   </Modal.Body>
                   <Modal.Footer>
                       <Button type="submit" >Guardar</Button>
                   </Modal.Footer>
                       </Form>
               </Modal>
           );
       }
   }
   

class UpdateDelivery extends React.Component{
    
    constructor(){
        
        super();
        this.state = {
            
            showModal:true,
            parameter: 0,
            masterAPI: []
        }
    }
    
    close(){
        
        this.setState({
            
            showModal: false
        });
    }
    
    componentDidMount(){

          fetch(API_URL+'/masterAPI',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })
        
          this.setState({
              
              parameter: this.props.params.deliveryid
          });

    }
    
    onSubmitted(event){
        
        event.preventDefault();
        
        let nextState = this.state.masterAPI;
        
        let index = nextState.findIndex(x=> x.id==this.state.parameter);
        
        let newUpdate = {
            
            "index":index,
            "fechaentrega": event.target.fechaentrega.value
        }
        
        fetch(API_URL+'/updatedelivery', {

          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(newUpdate)
      })
        
        this.setState({
            
            showModal:false
        });
    }
    
    render(){
        
        return(
        
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Actualizacion de Fecha Entrega</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal onSubmit={this.onSubmitted.bind(this)}>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Fecha de Entrega
                      </Col>
                      <Col sm={10}>
                        <FormControl name="fechaentrega" type="date" placeholder="Fecha de Entrega" />
                        <Button type="submit">Actualizar</Button>
                      </Col>                    
                    </FormGroup>
                </Form>
              </Modal.Body>
            </Modal>
        );
    }
}

class Payment extends React.Component{
    
        constructor(){
        
        super();
        this.state = {
            
            showModal:true,
            parameter: 0,
            masterAPI: [],
            balance: 0,
            pendiente: 0,
            actual: 0
        }
    }
    
    close(){
        
        this.setState({
            
            showModal: false
        });
    }
    
    componentDidMount(){

          fetch(API_URL+'/masterAPI',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })
        
          this.setState({
              
              parameter: this.props.params.paymentid
          });

    }
    
    onSubmitted(event){
        
        event.preventDefault();
        
        let nextState = this.state.masterAPI;
        
        let index = nextState.findIndex(x=> x.id==this.state.parameter);
        
        let newUpdate = {
            
            "index":index,
            "fechaentrega": event.target.fechaentrega.value
        }
    }
    
    close(){
        
        this.setState({
            
            showModal: false
        });
    }
    
    onChanged(event){
        
        
        this.setState({
            pendiente: event.target.value
        });
    }
    
    onSubmitted(event){
        
        event.preventDefault();
                
        let newPago = {
            
            "id": this.state.parameter,
            "balance": event.target.balance.value,
            "current": event.target.current.value,
            "pending": event.target.pending.value,
            "tipopago": event.target.radioGroup.value
        }
        
        fetch(API_URL+'/payment', {

          method: 'post',
          headers: API_HEADERS,
          body: JSON.stringify(newPago)
      })
        
        time = window.setTimeout(function(msg) {

            this.setState({

                showModal: false
            });
            
            browserHistory.push("/printpayment/"+this.state.parameter)
            
        }.bind(this), 3000);
        
        
    }

    
    render(){
        
        let nextState = this.state.masterAPI;
        
        let index = nextState.findIndex(x=> x.id==this.state.parameter);        
        
        let balance = 0;
        
        let pendiente = 0;
        
        if(nextState[index]){
        
            balance = nextState[index].grandTotal
            pendiente = nextState[index].grandTotal - parseInt(this.state.pendiente)
        }
        
        
        
        return(
        
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Proceso de Pago | Orden No. {this.props.params.paymentid}</Modal.Title>                        
              </Modal.Header>
              <Modal.Body>
                <Form horizontal onSubmit={this.onSubmitted.bind(this)}>
                    <FormGroup controlId="formHorizontalEmail">
                      <br/>
                      <Row>
                          <Col sm={4}>
                            <label>Balance</label>
                            <FormControl name="balance" type="number" value={balance.toFixed(2)} placeholder="Balance" disabled/>
                          </Col>                    
                          <Col sm={4}>
                            <label>Actual</label>
                            <FormControl name="current" onChange={this.onChanged.bind(this)} type="number" placeholder="Actual" />
                          </Col>                    
                          <Col sm={4}>
                            <label>Pendiente</label>
                            <FormControl name="pending" value={pendiente.toFixed(2)} type="number" placeholder="Pendiente" disabled/>
                          </Col>                                          
                      </Row>
                      <br/>
                      <Row>
                            <Col smOffset={4}>
                             <FormGroup>
                                  <Radio value="tarjeta" name="radioGroup" inline>
                                    <h1><i className="fa fa-cc-visa" aria-hidden="true"></i></h1>
                                  </Radio>
                                  {' '}
                                  <Radio value="efectivo" name="radioGroup" inline>
                                    <h1><i className="fa fa-money" aria-hidden="true"></i></h1>
                                  </Radio>
                                  {' '}
                                  <Radio value="cheque" name="radioGroup" inline>
                                    <h1><i className="fa fa-pencil-square-o" aria-hidden="true"></i></h1>
                                  </Radio>
                            </FormGroup>
                            </Col>
                      </Row>
                        <Button type="submit">Guardar</Button>
                    </FormGroup>
                </Form>
              </Modal.Body>
            </Modal>

            
        );
    }
}

class PrintPayment extends React.Component{
    
    constructor(){
        
        super();
        this.state = {
    
            masterAPI: [],
            customerAPI: [],
            detailData: [],
            list: []
        }
    }
 
    componentDidMount(){



          fetch(API_URL+'/masterAPI',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  customerAPI: responseData
              })
          })
          fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })
          })
          fetch(API_URL+'/list',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  list: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

    }
    
    render(){
            
        let filteredTable=this.state.masterAPI.filter((master)=>master.id==this.props.params.printid)

        let name; 
        
        let ncf; 
        
        if(filteredTable[0]){
                       
            name = filteredTable[0].name;
            ncf = filteredTable[0].ncf;
        }
        
        return(

            <Grid>
                <Row>                                
                    <Col sm={4}>
                        <Table striped bordered condensed hover>
                            <tr>
                                <th colspan="4">Factura</th>
                              </tr>
                              <tr>
                                <td>Nombre</td>                                
                                <td>{name}</td>
                              </tr>
                              <tr>                                
                                <td>NCF</td>
                                <td>{ncf}</td>
                              </tr>
                        </Table>
                    </Col>
                </Row>
                <Row>                                
                    <Col sm={4}>
                        <Table striped bordered condensed hover>
                            <thead>
                              <tr>
                                
                                <th>Balance</th>
                                <th>Actual</th>
                                <th>Pendiente</th>
                              </tr>
                            </thead>
                            <tbody>
                        {filteredTable.map(
                            (master,index) => 
                                          <tr>
                                            
                                            <td>{master.balance}</td>
                                            <td>{master.current}</td>
                                            <td>{master.pending}</td>
                                          </tr>
                        )}
                            </tbody>
                          </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class Home extends React.Component{

    render(){

        return(

            <Grid>
            <Row>
                <Col md={3}>
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <Row>
                                <Col xs={6}>
                                    <i className="fa fa-usd fa-5x"></i>
                                </Col>
                                <Col xs={6} className="text-right">
                                    <p className="announcement-heading">R$ 950 mil</p>
                                    <p className="announcement-text">Revenue</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                 <DashboardCustomer/>                    
                </Col>
                <Col md={3}>
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <Row>
                                <Col xs={6}>
                                    <i className="fa fa-area-chart fa-5x"></i>
                                </Col>
                                <Col xs={6} className="text-right">
                                    <p className="announcement-heading">2,3 Months</p>
                                    <p className="announcement-text">Average time</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <Row>
                                <Col xs={6}>
                                    <i className="fa fa-money fa-5x"></i>
                                </Col>
                                <Col xs={6} className="text-right">
                                    <p className="announcement-heading">$ 250 k</p>
                                    <p className="announcement-text">Recovered</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md={3}>
                    <div className="tile-progress tile-primary" style={{"padding":"12px"}}> 
                        <div class="tile-header">
                            <h3>Visitors</h3>
                            <span>so far in our blog, and our website.</span>
                        </div>
                        <div className="tile-progressbar">
                            <span data-fill="65.5%" style={{"width": "65.5%"}}></span>
                        </div>
                        <div className="tile-footer">
                            <h4>
                                <span className="pct-counter">65.5</span>% increase
                            </h4>
                            <span>so far in our blog and our website</span>
                        </div>

                    </div>
                </Col>

                <Col md={3}>
                    <div className="tile-progress tile-red" style={{"padding":"12px"}}> 
                        <div class="tile-header">
                            <h3>Visitors</h3>
                            <span>so far in our blog, and our website.</span>
                        </div>
                        <div className="tile-progressbar">
                            <span data-fill="65.5%" style={{"width": "65.5%"}}></span>
                        </div>
                        <div className="tile-footer">
                            <h4>
                                <span className="pct-counter">65.5</span>% increase
                            </h4>
                            <span>so far in our blog and our website</span>
                        </div>

                    </div>
                </Col>

                <Col md={3}>
                    <div className="tile-progress tile-blue" style={{"padding":"12px"}}> 
                        <div class="tile-header">
                            <h3>Visitors</h3>
                            <span>so far in our blog, and our website.</span>
                        </div>
                        <div className="tile-progressbar">
                            <span data-fill="65.5%" style={{"width": "65.5%"}}></span>
                        </div>
                        <div className="tile-footer">
                            <h4>
                                <span className="pct-counter">65.5</span>% increase
                            </h4>
                            <span>so far in our blog and our website</span>
                        </div>

                    </div>
                </Col>

                <Col md={3}>
                    <div className="tile-progress tile-aqua" style={{"padding":"12px"}}> 
                        <div class="tile-header">
                            <h3>Visitors</h3>
                            <span>so far in our blog, and our website.</span>
                        </div>
                        <div className="tile-progressbar">
                            <span data-fill="65.5%" style={{"width": "65.5%"}}></span>
                        </div>
                        <div className="tile-footer">
                            <h4>
                                <span className="pct-counter">65.5</span>% increase
                            </h4>
                            <span>so far in our blog and our website</span>
                        </div>

                    </div>
                </Col>


            </Row>
            <br/>
             <Row>
                <Col md={4}>
                    <div className="panel-group" id="accordion">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                Cumpleaños de hoy</a>
                              </h4>
                            </div>
                            <div id="collapse1" className="panel-collapse collapse in">
                                <Birthday/>
          
                            </div>
                          </div>
                          
                        </div>
                </Col>
                <Col md={4}>

                        <h4>Today Stats</h4>                         
                            <Row>
                                <Col xs={6}>
                                    <span >Visit</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">- 15%</span>
                                </Col>
                            </Row>
                            <Row className="progress">
                                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"15%"}}>15%</div>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <span >20 New Users</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">+ 8%</span>
                                </Col>
                            </Row>        
                            <Row className="progress">
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"8%"}}>8%</div>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <span >359 Downloads</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">- 15%</span>
                                </Col>
                            </Row>
                            <Row className="progress">
                                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"15%"}}>15%</div>
                            </Row>


                </Col>
                <Col md={4}>
                    <h4>Today Stats</h4>                         
                            <Row>
                                <Col xs={6}>
                                    <span >Visit</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">- 15%</span>
                                </Col>
                            </Row>
                            <Row className="progress">
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"45%"}}>15%</div>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <span >20 New Users</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">+ 8%</span>
                                </Col>
                            </Row>        
                            <Row className="progress">
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"58%"}}>8%</div>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <span >359 Downloads</span>
                                </Col>
                                <Col xs={6}>
                                    <span className="pull-right strong">- 15%</span>
                                </Col>
                            </Row>
                            <Row className="progress">
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{"width":"88%"}}>15%</div>
                            </Row>

                </Col>                
            </Row>
            <br/>
            <Row>
                <div className="progress">
                    <div className="one primary-color"></div>
                    <div className="two primary-color"></div>
                    <div className="three no-color"></div>
                    <div className="progress-bar" style={{"width":"70%"}}></div>
                </div>                
            </Row>
            <br/>
            <Row>
                <div className="progress">
                    <div className="one success-color"></div>
                    <div className="two success-color"></div>
                    <div className="three success-color"></div>
                    <div className="progress-bar progress-bar-success" style={{"width":"100%"}}></div>
                </div>                
            </Row>
            <br/>
            <Row>
                <div className="progress">
                    <div className="one danger-color"></div>
                    <div className="two no-color"></div>
                    <div className="three no-color"></div>
                    <div className="progress-bar progress-bar-danger" style={{"width":"30%"}}></div>
                </div>                
            </Row>
            <br/>
            <Row>
                <div className="progress">
                    <div className="one warning-color"></div>
                    <div className="two warning-color"></div>
                    <div className="three no-color"></div>
                    <div className="progress-bar progress-bar-warning" style={{"width":"60%"}}></div>
                </div>                
            </Row>
            <br/>
            <Row>
                <div className="progress">
                    <div className="one info-color"></div>
                    <div className="two no-color"></div>
                    <div className="three no-color"></div>
                    <div className="progress-bar progress-bar-info" style={{"width":"35%"}}></div>
                </div>                
            </Row>


        </Grid>
        );
    }
}

class PartialsTwo extends React.Component{

constructor(){

    super();
    this.state = {
    
        masterAPI: []
    }
}

componentDidMount(){

      fetch(API_URL+'/masterAPI',{headers: API_HEADERS})
      .then((response)=>response.json())
      .then((responseData)=>{
          this.setState({

              masterAPI: responseData
          })
      })
      .catch((error)=>{
          console.log('Error fetching and parsing data', error);
      })
      
}

render(){
    
    
    return(
    
        <Col sm={6}>            
            <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Item</th>                        
                  </tr>
                </thead>
                <tbody>
        {this.state.masterAPI.map(
            (master,index) => <PartialsTwoTableBody 
                                                        index={index}
                                                        id={master.id}
                                                        item={master.item}
                              />                
        )}
                </tbody>
              </Table>
        </Col>
    );
}
}

class PartialsTwoTableBody extends React.Component{

render(){

    return(
                 <tr>
                    <td>&nbsp;</td>
                    <td>{this.props.id}</td>   
                        <Table striped bordered condensed hover>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Times</th>                    
                              </tr>
                            </thead>
                            <tbody>
                                {this.props.item.map(
                                    (master,index) => <PartialsTwoTableBodyDetail 
                                                                            index={index}
                                                                            item={master.item}
                                                                            quantity={master.quantity}
                                                />
                                )}
                            </tbody>
                        </Table>
                  </tr> 
        
    );
}    
}

class PartialsTwoTableBodyDetail extends React.Component{

render(){

    return(
    
        
              <tr>                    
                <td>{this.props.item}</td>
                <td>{this.props.quantity}</td>                    
              </tr>                  
            
    )
}
}

class Birthday extends React.Component{

    constructor() {

        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        
          fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              
 
                  this.setState({

                      customers: responseData
                  })
                        

          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })
            
    }




    render(){

      let today = moment(new Date()).format('0001-MM-DD');

      let filteredTable = this.state.customers.filter(
            (master) => master.fechacumpleano.indexOf(today) !== -1
            //(master) => master.fechacumpleano.indexOf('0001-12-13') !== -1
      )

      return (

        <ul className="list-group">
            {filteredTable.map(

                (customer, index) => <li className="list-group-item"><span className="badge">{customer.fechacumpleano}</span>{customer.name + " " + customer.apellido}</li>
            )}
        </ul>
      )
    }
}

class DashboardCustomer extends React.Component{

    constructor() {

        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        
          fetch(API_URL+'/customer',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              
 
                  this.setState({

                      customers: responseData
                  })
                        

          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })
            
    }




    render(){

      return (

        <div className="panel panel-info">
            <div className="panel-heading">
                <Row>
                    <Col xs={6}>
                        <i className="fa fa-list-ol fa-5x"></i>
                    </Col>
                    <Col xs={6} className="text-right">
                        <p className="announcement-heading">{this.state.customers.length}</p>
                        <p className="announcement-text">Clientes</p>
                    </Col>
                </Row>
            </div>
        </div>
      )
    }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="printpayment/:printid" component={PrintPayment}/>
        <Route path="customer" component={Customer}/>
        <Route path="loader" component={Loader}/>
        <Route path="partialstwo" component={PartialsTwo}/>
        <Route path="partials" component={Partials}/>
        <Route path="updatedetail/:detailid" component={DetailModalUpdate}/>
        <Route path="updatedelivery/:deliveryid" component={UpdateDelivery}/>
        <Route path="updatecustomer/:detailid" component={UpdateCustomer}/>
        <Route path="payment/:paymentid" component={Payment}/>
        <Route path="actions/:actionid" component={Actions}/>
        <Route path="detail" component={Detail}/>
        <Route path="master" component={Master}/>
    </Route>
  </Router>
), document.getElementById('contents'));