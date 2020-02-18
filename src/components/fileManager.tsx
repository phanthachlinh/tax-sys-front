import React from 'react';
import styled from 'styled-components';
import { FileActions, IFile } from '../ducks/file/file';
import { connect } from 'react-redux';
import FileListItem from './fileListItem';
class FileManager extends React.Component<IProps,{title:string,file:any|null,filename:string}>{
  constructor(props:IProps){
    super(props);
    this.state={
      file:null,
      title:'',
      filename: ''
    }
  }
  componentDidMount(){
    this.props.getFiles()
  }
  uploadFileSelectedHandler(ev:any){
    let filepathArr = ev.target.value.split('\\');
    this.setState({file:ev.target.files[0],filename:filepathArr[filepathArr.length-1]})
  }
  titleChangeHandler(ev:any){

    this.setState({title:ev.target.value})
  }
  addHandler(){
    let formData = new FormData();
    this.state.file.date_created = Date.now().toString()
    formData.append('File',this.state.file);
    formData.append('title',this.state.title);
    formData.append('FK_User',this.props.userId.toString());
    formData.append('FK_Mongo_Case',this.props.caseId);

    this.props.submitFile(formData)
  }
  render(){
    let fileItemJSX = this.props.files.map((file:IFile)=>{
      return(
        <FileListItem key={file.ID} file={file}/>
      )
    })
    return(
      <FormWrapper>
      <ControlsWrapper>
        <div style={{position:'relative', flexBasis: '10%'}}>
          <UploadLabel htmlFor="fileupload">hmmm</UploadLabel>
          <input style={{width: '0px',height: '0px'}} id="fileupload" type="file" name="file" onChange={this.uploadFileSelectedHandler.bind(this)}/>
        </div>
        <input type="text" placeholder="File Name " value={this.state.filename}/>
        <input type="text"onChange={this.titleChangeHandler.bind(this)} value={this.state.title} placeholder="Title"/>
        <button onClick={this.addHandler.bind(this)}>submit</button>
        <button>Close</button>
      </ControlsWrapper>
        {fileItemJSX}
      </FormWrapper>
    )
  }
}
interface IProps{
  files:Array<IFile>,
  caseId: string,
  userId: number,
  submitFile:any,
  getFiles:any
}
const ControlsWrapper = styled('div')`
  display: flex;
`
const FormWrapper = styled('div')`
    position: fixed;
    display:flex;
    flex-direction:column;
    width: 50%;
    height: 50%;
    background:  rgba(255,255,255,0.8);
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    border: solid;
    border-radius: 2px;
  `
  const UploadLabel = styled.label`
  width:100%;
  height:100%;
  background:grey;
  `
function mapDispatchToProps(dispatch:any){
  return{
    submitFile:(formData:FormData)=>{dispatch(FileActions.postFile(formData))},
    getFiles:()=>{dispatch(FileActions.getFiles('d'))}
  }
}
function mapStateToProps(state:any){
  return{
    files: state.files
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FileManager)
