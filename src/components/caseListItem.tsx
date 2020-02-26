import React from 'react'
import { StyledRow, StyledButton } from '../shared/styledComponents'
import { CaseActions } from '../ducks/case/case';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MediaQueries } from '../shared/mediaQueries';
class CaseListItem extends React.Component<IProps, { show: boolean, dateCreatedFormatted: string }>{
	constructor(props: IProps) {
		super(props);
		this.state = {
			show: false,
			dateCreatedFormatted: ''
		}
	}
	componentDidMount() {
		let dateObj: number = Date.parse(this.props.date_created)
		let d = new Date(dateObj)
		this.setState(
			{
				dateCreatedFormatted: d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()
			}
		)
	}
	deleteCaseHandler() {
		this.props.deleteCase(this.props.FK_Mongo_Case)
	}
	changeShowHandler() {
		this.setState({ show: !this.state.show })
	}
	render() {
		return (
			<CaseRow>
				<CountryWrapper>
					<div>{this.props.country}</div>
				</CountryWrapper>
				<StatusWrapper>
					<div>{this.props.status}</div>
				</StatusWrapper>
				<DateCreated>
					<div>{this.state.dateCreatedFormatted}</div>
				</DateCreated>

				<ButtonWrapper>

					<StyledButton onClick={() => { this.props.showUpdateForm(); this.props.setUpdatingFK_Mongo_CaseHandler() }}>
						<StyledIcon src={require('../assets/images/update.svg').default} />
					</StyledButton>
					<StyledButton onClick={this.deleteCaseHandler.bind(this)}>
						<StyledIcon src={require('../assets/images/delete.svg').default} />
					</StyledButton>
					<StyledButton onClick={this.props.showNotesHandler}>Notes</StyledButton>
					<StyledButton onClick={this.props.showFilesHandler}>Files</StyledButton>
				</ButtonWrapper>
			</CaseRow>
		)
	}
}
const CaseRow = styled(StyledRow)`
	@media screen and (min-width:768px){
		justify-content: space-around;
		align-items: center;
	}
`
const StatusWrapper = styled.div`
  flex-basis: 15%;
`
const CountryWrapper = styled.div`
  flex-basis: 15%;
`
const DateCreated = styled.div`
  flex-basis: 15%;
`
const StyledIcon = styled.img`
	height:100%;
	padding:5px;
`
interface IProps {
	id: string,
	country: string,
	status: Number,
	date_created: string,
	deleteCase: any,
	FK_Mongo_Case: string,
	showUpdateForm: any,
	setUpdatingFK_Mongo_CaseHandler: any,
	showNotesHandler: any,
	showFilesHandler: any
}
const ButtonWrapper = styled.div`
display: flex;
flex-direction: column;
flex-basis:55%;
@media screen and (${MediaQueries.tablet}){
  flex-basis: 40%;
  justify-content: end;
  flex-direction:row
}
@media screen and (${MediaQueries.desktop}){
	flex-basis: 25%;

}
`
function mapDispatchToProps(dispatch: any) {
	return {
		deleteCase: (FK_Mongo_Case: string) => dispatch(CaseActions.deleteCase(FK_Mongo_Case))
	}
}
export default connect(null, mapDispatchToProps)(CaseListItem)
