import React from 'react';
import { connect } from 'react-redux';
import { IClient } from '../../ducks/client/client';
import { CaseActions } from '../../ducks/case/case';
import CaseRow from '../../components/caseListItem';
import AddCaseForm from '../../components/addCaseForm'
import UpdateCaseForm from '../../components/updateCaseForm';
import NotePopup from '../../components/notePopup';
import FileManager from '../../components/fileManager';
import { IUser } from '../../ducks/signIn/signIn';
import styled from 'styled-components';
import { MediaQueries } from '../../shared/mediaQueries';
import { ICase } from '../../ducks/case/case.types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Pagination from '../../components/pagination/pagination';
class ClientDetail extends React.Component<IProps, IState>{
	constructor(props: any) {
		super(props);
		this.state = {
			client: {} as IClient,
			page: 1,
			showAddForm: false,
			showUpdateForm: false,
			updatingCase: { _id: '', status: 0, country: '', date_created: '', FK_User: 0, FK_Mongo_Client: '' },
			activeCaseNotes: '',
			activeCaseFiles: '',
			showFileManager: false,
			fileFK_Mongo_Case: '',
			hideTransition: true,
			transitionExited: true
		}
	}
	componentDidMount() {
		let client: IClient | undefined = this.props.clients.results.find((client: IClient) => { return client._id === this.props.match.params.id })
		if (client)
			this.setState(
				{ client: client },
				() => {
					this.props.getCases(this.state.client._id, this.state.page)
				}
			);
		this.props.getCases(this.state.client._id, this.state.page)
	}
	componentDidUpdate(prevProps: IProps) {
		if (prevProps.cases.results.length > this.props.cases.results.length) {
			this.props.getCases(this.state.client._id, this.state.page);
		}
	}
	showAddFormHandler() {
		this.setState({ showAddForm: !this.state.showAddForm })
	}
	showUpdateFormHandler(id: string) {
		console.log('dsfdsfd', id)
		this.setState({ showUpdateForm: true })
	}
	setUpdatingFK_Mongo_CaseHandler(id: string) {
		let updatingCase: ICase | undefined = this.props.cases.results.find((casex: ICase): boolean => casex._id === id);
		if (updatingCase)
			this.setState({ updatingCase: updatingCase })
	}
	showNotesHandler(id: string) {
		this.setState({ activeCaseNotes: id })
	}
	showFilesHandler(FK_Mongo_Case: string) {
		this.setState({ hideTransition: false, transitionExited: false, showFileManager: true, fileFK_Mongo_Case: FK_Mongo_Case })
	}
	hideFileManagerHandler() {
		this.setState({ showFileManager: false }, () => { console.log(this.state.showFileManager) })
	}
	transitionExitedHandler() {
		console.log('exited')
		this.setState({ transitionExited: true }, () => { console.log(this.state.transitionExited) })
	}
	changePageHandler(page: number, searchTerm: string, something: any) {
		this.props.getCases(this.state.client._id, page)
		this.setState({ page: page })
	}
	render() {
		let caseRowJSX;
		if (this.props.cases.results.length)
			caseRowJSX = this.props.cases.results.map((caseItem: ICase) =>
				<CaseRow
					key={caseItem._id}
					id={caseItem._id}
					status={caseItem.status}
					country={caseItem.country}
					date_created={caseItem.date_created}
					FK_Mongo_Case={caseItem._id}
					showUpdateForm={this.showUpdateFormHandler.bind(this, caseItem._id)}
					setUpdatingFK_Mongo_CaseHandler={this.setUpdatingFK_Mongo_CaseHandler.bind(this, caseItem._id)}
					showNotesHandler={this.showNotesHandler.bind(this, caseItem._id)}
					showFilesHandler={this.showFilesHandler.bind(this, caseItem._id)}
				/>)
		return (
			<>
				<TransitionGroup>
					{this.state.showFileManager &&
						<CSSTransition
							timeout={0}

						>
							<FileManager hideFileManager={this.hideFileManagerHandler.bind(this)} FK_Mongo_Case={this.state.fileFK_Mongo_Case} userId={this.props.user.ID} />

						</CSSTransition>
					}
				</TransitionGroup>
				{this.state.activeCaseNotes !== '' && <NotePopup FK_Mongo_Case={this.state.activeCaseNotes} />}
				<AddCaseForm page={this.state.page} show={this.state.showAddForm} client={this.state.client} />
				<UpdateCaseForm page={this.state.page} clientId={this.state.client._id} date_created={this.state.updatingCase.date_created} show={this.state.showUpdateForm} updatingCase={this.state.updatingCase} />
				<button onClick={this.showAddFormHandler.bind(this)}>Add</button>
				<div>
					<div>First name</div>
					<div>{this.state.client.first_name}</div>
					<div>Last name</div>
					<div>{this.state.client.last_name}</div>
					<div>Date of Birth</div>
					<div>{this.state.client.date_of_birth}</div>
					<div>Coming from</div>
					<div>{this.state.client.coming_from}</div>
					<div>Civil status</div>
					<div>{this.state.client.civil_status}</div>
					<div>Children</div>
					<div>{this.state.client.amount_of_children}</div>
					<div>Home Address</div>
					<div>{this.state.client.home_address}</div>
					<div>Email</div>
					<div>{this.state.client.email}</div>
					<div>Telephone</div>
					<div>{this.state.client.telephone}</div>
				</div>
				<div style={{ padding: '0 22px' }}>
					<StyledTopClientButton onClick={this.showAddFormHandler.bind(this)}>
						<img style={{ height: '100%' }} src={require('../../assets/images/add.png').default} />
					</StyledTopClientButton>
					<SearchWrapper>
						<FilterButton roundRight={false}><img style={{ borderRadius: '0 5px 5px 0' }} src={require('../../assets/images/filter.png').default} /></FilterButton>
						<StyledInput type="text" placeholder='Search' />
						<FilterButton roundRight={true}><img src={require('../../assets/images/search.png').default} /></FilterButton>
					</SearchWrapper>

				</div>
				{caseRowJSX}
				<Pagination getClientsHandler={this.changePageHandler.bind(this)} totalCount={this.props.cases.count} activePage={this.state.page} searchTerm="" />
			</>
		)
	}
}
const SearchWrapper = styled.div`
display:flex;
justify-content: space-between;
@media screen and (${MediaQueries.tablet}){
width: 66%
}
`
const StyledTopClientButton = styled.button`
height: 39px;
background: none;
border: none
border-radius: 5px;
background:#eee;
margin-bottom: 11px;
@media screen and (${MediaQueries.tablet}){
float:right;
margin-bottom: 0
}
`
const StyledInput = styled.input`
width: calc(100% - 98px);
border-radius: 0;
border: none;
padding-left: 5px;
@media screen and (${MediaQueries.tablet}){
width: calc(100%);
}
`
const FilterButton = styled('button') <{ roundRight: boolean }>`
height:39px;
width:39px;
border-radius: ${(props) => { return props.roundRight ? '0 5px 5px 0' : '5px 0 0 5px' }}
background:#eee;
border:none;
& > img{
height: 66%;
top: 50%;
position: relative;
transform: translateY(-62%)
}
`
interface IProps {
	user: IUser,
	clients: {
		count: Number,
		results: Array<IClient>
	}
	client: IClient,
	getCases: any,
	cases: { count: number, results: Array<ICase> },
	deleteCase: any,
	match: {
		params: {
			id: String
		}
	}
}
interface IState {
	client: IClient,
	page: number,
	showAddForm: boolean,
	showUpdateForm: boolean,
	updatingCase: ICase,
	activeCaseNotes: string,
	activeCaseFiles: string,
	showFileManager: boolean,
	fileFK_Mongo_Case: string,
	hideTransition: boolean,
	transitionExited: boolean
}
function mapStateToProps(state: any) {
	return {
		clients: state.clients,
		cases: state.cases,
		user: state.user
	}
}
function mapDispatchToProps(dispatch: any) {
	return {
		getCases: (_id: string, page: number) => { dispatch(CaseActions.getCases(_id, page)) },
		deleteCase: (ID: string) => { dispatch(CaseActions.deleteCase(ID)) }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail)
