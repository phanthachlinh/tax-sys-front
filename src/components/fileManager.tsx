import React from 'react';
import styled from 'styled-components';
import { FileActions } from '../ducks/file/file';
import { connect } from 'react-redux';
import FileListItem from './fileListItem';
import { IFile } from '../ducks/file/file.types';
import { CSSTransition } from 'react-transition-group'
class FileManager extends React.Component<IProps, { title: string, file: any | null, filename: string, showFileControls: boolean }>{
	constructor(props: IProps) {
		super(props);
		this.state = {
			file: null,
			title: '',
			filename: '',
			showFileControls: false
		}
	}
	componentDidMount() {
		this.props.getFiles(this.props.FK_Mongo_Case)
	}
	uploadFileSelectedHandler(ev: any) {
		let filepathArr = ev.target.value.split('\\');
		ev.target.files
		this.setState({ file: ev.target.files[0], filename: filepathArr[filepathArr.length - 1] })
	}
	titleChangeHandler(ev: any) {

		this.setState({ title: ev.target.value })
	}
	addHandler() {
		let formData = new FormData();
		console.log(this.state.file)
		this.state.file.date_created = Date.now().toString()
		formData.append('File', this.state.file);
		formData.append('title', this.state.title);
		formData.append('FK_User', this.props.userId.toString());
		formData.append('FK_Mongo_Case', this.props.FK_Mongo_Case);
		console.log(this.state.file)
		this.props.submitFile(formData)
	}
	render() {
		let fileItemJSX = this.props.files.map((file: IFile) => {
			return (
				<FileListItem key={file.ID} file={file} />
			)
		})
		return (
			<FormWrapper>

				<StyledLeftButton onClick={() => { this.props.hideFileManager() }}>close</StyledLeftButton>
				<StyledButton onClick={() => { this.setState({ showFileControls: true }) }}>show</StyledButton>
				<CSSTransition in={this.state.showFileControls} timeout={0}>
					<ControlsWrapper>
						<StyledButton onClick={() => { this.setState({ showFileControls: false }) }}>Close</StyledButton>
						<div style={{ position: 'relative', flexBasis: '10%' }}>
							<UploadLabel htmlFor="fileupload">hmmm</UploadLabel>
							<input style={{ width: '0px', height: '0px' }} id="fileupload" type="file" name="file" onChange={this.uploadFileSelectedHandler.bind(this)} />
						</div>
						<input type="text" placeholder="File Name " value={this.state.filename} />
						<input type="text" onChange={this.titleChangeHandler.bind(this)} value={this.state.title} placeholder="Title" />
						<button onClick={this.addHandler.bind(this)}>submit</button>

					</ControlsWrapper>
				</CSSTransition>
				<StyledItemList>
					{fileItemJSX}
				</StyledItemList>
			</FormWrapper>
		)
	}
}
interface IProps {
	files: Array<IFile>,
	FK_Mongo_Case: string,
	userId: number,
	submitFile: any,
	getFiles: any
	hideFileManager: any
}
const StyledItemList = styled.div`
top: 90px;

position: relative;

padding: 0 22px;
`
const StyledButton = styled('button')`
    position: absolute;
    top: 0;
    right: 0;
    margin: 15px;
`
const StyledLeftButton = styled(StyledButton)`
right:unset;
left:0`
const ControlsWrapper = styled('div')`
z-index: 2;
  left: 100%;

  width: 100%;
    height: 100%;
    display: block;
    background:white;
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
 transition:left 0.25s ease-out;
 @media screen and (min-width:768px){
     top:0
 }
  &.enter-active{
    left: 100%
  }
  &.enter-done{
    left: 0%
  }
  &.exit-active{
    left: 0%
  }
  &.exit-done{
    left: 100%
  }
`
const FormWrapper = styled('div')`
    position: fixed;
    display:flex;
    flex-direction:column;
    width:100%;
    height: 90%;
    background:  white;
    z-index:1;
    border-radius: 0px;
    opacity:0;
    transition:opacity 0.2s;
    @media screen and (min-width:768px){
            padding-top:90px;
            opacity:1!important;
            transform:translateX(100%);
            transition:transform 0.2s!important;
            width: calc(100% - 102px);
            top:0;
            height:100vh
    }

    &.enter-active{
        @media screen and (min-width:768px){
            transform:translateX(100%)
        }
      opacity:0
    }
    &.enter-done{
        @media screen and (min-width:768px){
            transform:translateX(0%)
        }
      opacity:1
    }
    &.exit-active{
        @media screen and (min-width:768px){
            transform:translateX(0%)
        }
      opacity:1
    }
    &.exit-done{
        @media screen and (min-width:768px){
            transform:translateX(100%)
        }
      opacity:0
    }
  `
const UploadLabel = styled.label`
  width:100%;
  height:100%;
  background:grey;
  `
function mapDispatchToProps(dispatch: any) {
	return {
		submitFile: (formData: FormData) => { dispatch(FileActions.postFile(formData)) },
		getFiles: (FK_Mongo_Case: string) => { dispatch(FileActions.getFiles(FK_Mongo_Case)) }
	}
}
function mapStateToProps(state: any) {
	return {
		files: state.files
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FileManager)
