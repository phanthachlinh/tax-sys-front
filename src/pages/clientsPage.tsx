import * as React from 'react';
import {connect} from 'react-redux';
import {ClientActions, IClient, ClientTypes} from '../ducks/client/client';
import ClientListItem from '../components/clientListItem';
import AddClientForm from '../components/addClientForm';
import UpdateClientForm from '../components/updateClientForm';
import styled from 'styled-components'
import {MediaQueries} from '../shared/mediaQueries'
import Pagination from '../components/pagination';

export const coming_from = [
  'Phone',
  'Ad',
  'Acquaintance'
]
export const civil_status = [
  'Single',
  'Married',
  'Divorced'
]
class ClientsPage extends React.Component<ClientsPageProps,ClientsPageState>{
  constructor(props:any){
    super(props);
    this.state={
      showAddForm:false,
      page:1,
      showUpdateForm: false,
      updatingUserID: null,
      searchTerm: ''
    }
  }
  componentDidMount(){
    console.log('called')
    this.props.getClients(this.state.page,this.state.searchTerm)
  }

  componentDidUpdate() {
    console.log(this.props.clients.action)
    if(this.props.clients.action == ClientTypes.DELETE_CLIENT){
      console.log('called2')
      this.props.getClients(this.state.page,this.state.searchTerm)
    }

  }
  addClientHandler(e:any){
    e.preventDefault();
    let formData: any = new FormData((document.getElementById('addClient') as unknown) as HTMLFormElement);
    let inputs :Array<any>= []
    let addClientForm:HTMLElement|null = document.getElementById('addClient')
    if(addClientForm !== null && addClientForm.querySelectorAll('select,input'))
      inputs = Array.from(addClientForm.querySelectorAll('select,input'));
    let fail: boolean = false;
    for(let i = 0; i<inputs.length;i++){
      if(inputs[i].value == ''){
        inputs[i].classList.add('error');
        fail = true
      }else{
        inputs[i].classList.remove('error')
      }
    }
    if(fail) return
    else{
      formData.append('FK_User', this.props.user.ID);
      this.props.postClient(formData,this.state.page);
    }

  }
  showAddFormHandler(){
    this.setState({showAddForm: true})
  }
  showUpdateFormHandler(){
    this.setState({showUpdateForm:true})
  }
  closeAddFormHandler(){
    this.setState({showAddForm: false})
  }
  setUpdatingClientID(id:String){
    this.setState({updatingUserID: id})
  }
  hideUpdateFormHandler(){
    this.setState({showUpdateForm:false});
    this.setState({updatingUserID:null})
  }
  searchHandler(e:any){
    console.log('called3')
    this.setState({searchTerm:e.target.value},
      ()=>
      {
        this.props.getClients(1,this.state.searchTerm)
      })
  }
  render(){
    let clientsJSX = this.props.clients.results.map((client:IClient)=>{
      let position = this.props.clients.results.indexOf(client);

      return(
        <ClientListItem key={client._id} position={position} client={client} history={this.props.history} setUpdatingClientID={this.setUpdatingClientID.bind(this)} showUpdateForm={this.showUpdateFormHandler.bind(this)}/>
      )
    })
      return(
        <div>
          {this.state.showAddForm &&
            <StyledFormWrapper className={this.state.showAddForm?'show':'hidden'}>
              <div>
              <StyledBackClientButton onClick={this.closeAddFormHandler.bind(this)}>
                <StyledBackButton src={require('../assets/images/previous.svg').default}/>
                <span>Client List</span>
              </StyledBackClientButton>
              </div>
              <AddClientForm addClientHandler={this.addClientHandler.bind(this)}/>
            </StyledFormWrapper>
          }
          <UpdateClientForm hideUpdateForm={this.hideUpdateFormHandler.bind(this)} showUpdateForm={this.state.showUpdateForm}
          clientID={this.state.updatingUserID}/>
            <TopBar >
              <TopBarButtonWrapper>
              <StyledTopClientButton onClick={this.showAddFormHandler.bind(this)}>
                <img style={{height:'100%',border: '5px solid white',borderRadius: '5px'}}src={require('../assets/images/add.png').default} />
              </StyledTopClientButton>
              </TopBarButtonWrapper>
              <SearchWrapper>
                <FilterButton roundRight={false}><img style={{borderRadius:'0 5px 5px 0'}} src={require('../assets/images/filter.png').default}/></FilterButton>
                <StyledInput type="text" placeholder='Search' onChange={this.searchHandler.bind(this)}/>
                <FilterButton roundRight={true}><img src={require('../assets/images/search.png').default}/></FilterButton>
              </SearchWrapper>
            </TopBar>
          <ClientsList>
            {clientsJSX}
          </ClientsList>
          <Pagination searchTerm={this.state.searchTerm} activePage={this.props.clients.page} totalCount={this.props.clients.count}/>
        </div>
      )
    }
}
interface ClientsPageProps{
  getClients: any,
    clients: {page:number,success:boolean|null,count:number,results:Array<IClient>,action:string},
    postClient:any,
    user: any,
    hideUpdateFormHandler:any,
    history: any
}
interface ClientsPageState{
  showAddForm:boolean,
  page:Number,
  searchTerm:string,
  showUpdateForm: boolean,
  updatingUserID: null|String
}
function mapStateToProps(state:any){
  return{
    clients: state.clientsReducer,
    user: state.user
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    getClients: (page:Number,searchTerm:string)=>dispatch(ClientActions.getClients(page,searchTerm)),
    postClient: (formData:FormData,page:Number)=>dispatch(ClientActions.postClient(formData,page))
  }
}
const TopBar = styled.div`
  padding: 20px;
  text-align:right;
  display: flex;
  flex-direction: column;
  align-items: end;
  @media screen and (${MediaQueries.tablet}){
    flex-direction: row-reverse
  }
`
const TopBarButtonWrapper = styled.div`
@media screen and (${MediaQueries.tablet}){
  flex-basis:25%;
}
`
const FilterButton = styled('button')<{roundRight:boolean}>`
  height:39px;
  width:39px;
  border-radius: ${(props)=>{return props.roundRight?'0 5px 5px 0':'5px 0 0 5px'}}
  background:#eee;
  border:none;
  border: 5px solid white;
  & > img{
    height: 66%;
    top: 50%;
    position: relative;
    transform: translateY(-62%)
  }
`
const StyledBackButton = styled.img`
  height: 50%;
  filter: invert(1);
  transform: rotate(180deg);
`
const StyledFormWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 90vh;
  z-index: 1;
  background: white;
  overflow-y: scroll;
  @media screen and (${MediaQueries.tablet}){
    padding-top: 20px;
    display:flex;
    flex-direction:column;
    height:100vh;
    top:0;
    width: calc(100vw - 100px);
  }
`
const SearchWrapper = styled.div`
display:flex;
justify-content: space-between;
width:100%;
@media screen and (${MediaQueries.tablet}){
  flex-direction:row-reverse;
  flex-basis:75%;
}
`

const ClientsList = styled.div`
  display:flex;
  flex-wrap:wrap;
  @media screen and (${MediaQueries.tablet}){
    justify-content: center;
  }
`
const StyledTopClientButton = styled.button`
margin: 10px 0px;
display: flex;
align-items: center;
height: 39px;
background: none;
border: none
border-radius: 5px;
background: none;
display: flex;
align-items: center;
margin-bottom: 11px;

flex-direction: column;
@media screen and (${MediaQueries.tablet}){
  float:right;
  margin-bottom: 0
}
`
const StyledBackClientButton = styled(StyledTopClientButton)`
  flex-direction:row;
  margin-left:20px;
  @media screen and (${MediaQueries.tablet}){
    float:left
  }
`
const StyledInput = styled.input`
  width: calc(100%);
  border-radius: 0;
border: none;
padding-left: 5px;
@media screen and (${MediaQueries.tablet}){
  width: calc(100%);
}
`
export default connect(mapStateToProps,mapDispatchToProps)(ClientsPage)
