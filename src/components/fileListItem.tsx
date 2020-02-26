import React from 'react';
import { FileActions } from '../ducks/file/file';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IFile } from '../ducks/file/file.types';
class FileListItem extends React.Component<{ file: IFile, deleteFile: any, saveTitle: any }, { editMode: boolean, title: string }>{
	constructor(props: any) {
		super(props);
		this.state = {
			editMode: false,
			title: ''
		}
	}
	componentDidMount() {
		this.setState({ title: this.props.file.title })
	}
	deleteFileHandler() {
		this.props.deleteFile(this.props.file.ID)
	}
	saveTitle() {
		this.props.saveTitle(this.props.file.ID, this.state.title);
		this.setState({ editMode: false })
	}
	render() {
		return (
			<ListItemRow>
				{!this.state.editMode &&
					<>
						<StyledTitleWrapper>
							<a target="_black" href={'http://localhost:8889/file/static/' + this.props.file.filename}>{this.state.title}</a>
						</StyledTitleWrapper>
						<StyledButton onClick={() => { this.setState({ editMode: true }) }}>Edit</StyledButton>
						<StyledButton onClick={this.deleteFileHandler.bind(this)}>Delete</StyledButton>
					</>
				}
				{this.state.editMode &&
					<>
						<StyledTitleWrapper>
							<input type="text" value={this.state.title} onChange={(ev: any) => { this.setState({ title: ev.target.value }) }} />
						</StyledTitleWrapper>
						<StyledButton onClick={this.saveTitle.bind(this)}>Save</StyledButton>
						<StyledButton onClick={() => { this.setState({ editMode: false, title: this.props.file.title }) }}>Discard</StyledButton>
					</>
				}
			</ListItemRow>
		)
	}
}
function mapDispatchToProps(dispatch: any) {
	return {
		deleteFile: (id: number) => { dispatch(FileActions.deleteFile(id)) },
		saveTitle: (id: number, title: string) => { dispatch(FileActions.updateFile(id, title)) }
	}
}

const StyledButton = styled.button`
  flex-basis: 20%;
`

const StyledTitleWrapper = styled.div`

flex-basis:60%;
`
const ListItemRow = styled.div`
display: flex;
align-items: center;`
export default connect(null, mapDispatchToProps)(FileListItem)
