import React from 'react';
import styled from 'styled-components';
import { ClientActions } from '../../ducks/client/client';
import { connect } from 'react-redux';
import { MediaQueries } from '../../shared/mediaQueries';
export default class Pagination extends React.Component<IPaginationProps, {}>{
	getClientsHandler(pageNumber: number) {
		this.props.getClientsHandler(pageNumber, this.props.searchTerm)
	}
	render() {
		const pageItems: Array<any> = []
		getPaginationItems(this.props.totalCount, this.props.activePage).map((i: number) => {
			pageItems.push(<PageNumber key={i} active={this.props.activePage == i} onClick={this.getClientsHandler.bind(this, i)}>{i}</PageNumber>)
		})
		return (

			<PaginationWrapper>
				{this.props.activePage > 1 &&
					<PageArrow onClick={() => { if (this.props.activePage > 1) this.props.getClientsHandler(this.props.activePage - 1, this.props.searchTerm) }} active={this.props.totalCount > 5 && this.props.activePage > 1}>
						<StyledArrow next={false} src={require('../../assets/images/previous.svg').default} />
					</PageArrow>
				}
				{pageItems}
				{this.props.totalCount - this.props.activePage * 5 > 0 &&
					<PageArrow onClick={() => { if (this.props.totalCount > this.props.activePage * 5) this.props.getClientsHandler(this.props.activePage + 1, this.props.searchTerm) }} active={this.props.totalCount > this.props.activePage * 5}>
						<StyledArrow next={true} src={require('../../assets/images/previous.svg').default} />
					</PageArrow>
				}
			</PaginationWrapper>

		)
	}
}
function getPaginationItems(totalCount: number, activePage: number): Array<number> {
	let paginationArray: Array<number> = []
	if (totalCount === 0)
		return paginationArray
	if (totalCount > 0)
		paginationArray.push(activePage)
	if (totalCount - activePage * 5 > 0)
		paginationArray.push(activePage + 1)
	if (totalCount - activePage * 5 > 5)
		paginationArray.push(activePage + 2)
	if (activePage > 1)
		paginationArray.unshift(activePage - 1)
	if (activePage > 2)
		paginationArray.unshift(activePage - 2)
	return paginationArray

}
const StyledArrow = styled.img<{ next: boolean }>`
height:18px;
transform: rotate(${props => { return props.next ? '0deg' : '180deg' }});
color:white
`
const PaginationWrapper = styled.div`
display:flex;
justify-content: space-between;
@media screen and (${MediaQueries.tablet}){
left: 50%;
position: relative;
transform: translateX(-50%);
display: inline-flex;
}
`
const PageNumber = styled.div<{ active: boolean }>`
padding: 10px;
background:${(props) => { return props.active ? '#080939' : '#eee' }};
color:${(props) => { return props.active ? 'white' : 'black' }};
border-radius: 5px;
margin: 5px;
`
const PageArrow = styled(PageNumber)`

`
PageArrow.displayName = "PageArrowWrapper"
PageNumber.displayName = "PageNumber";
function mapDispatchToProps(dispatch: any) {
	return {
		getClients: (page: number, searchTerm: string): void => { dispatch(ClientActions.getClients(page, searchTerm)) }
	}
}
interface IPaginationProps {
	totalCount: number,
	getClientsHandler: any,
	activePage: number,
	searchTerm: string
}
