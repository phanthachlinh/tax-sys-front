import React from 'react'
import styled from 'styled-components'
import { NoteActions, INote } from '../ducks/note/note'
import { IRootReducer } from '../ducks/rootReducer'
import { connect } from 'react-redux'
import NoteItem from './noteItem'
class NotePopup extends React.Component<IProps,{newNoteValue:string,editingNote:INote,editMode:boolean,editNoteValue:string}>{
  constructor(props:any){
    super(props);
    this.state={
      newNoteValue:'',
      editingNote: {ID:-1,FK_User:0,messenge:'',caseID:''},
      editMode: false,
      editNoteValue:''
    }
  }
  componentDidMount(){
    this.props.getNotes(this.props.caseId)
  }
  changeNewNoteValueHandler(ev:any){
    this.setState({newNoteValue:ev.target.value})
  }
  componentDidUpdate(prevProps:any){
    if(prevProps.notes.length<this.props.notes.length)
      this.props.getNotes(this.props.caseId)
  }
  addNoteHandler(){
    this.props.addNote(this.props.caseId,this.props.user.ID,this.state.newNoteValue)
  }
  setupNoteEditHandler(note:INote){
    this.setState({editMode:true,editingNote:note,editNoteValue:note.messenge})
  }
  changeEditNoteValueHandler(ev:any){
    this.setState({editNoteValue:ev.target.value})
  }
  updateNoteHandler(ev:any){
    this.props.updateNote(this.state.editingNote.ID,this.state.editNoteValue)
  }
  render(){

    let noteItemsJSX = this.props.notes.map((note:INote)=>{
      return <NoteItem key={note.ID} note={note} setupEditMode={this.setupNoteEditHandler.bind(this,note)} showControls={note.FK_User==this.props.user.ID}/>
    })
    return(
      <FormWrapper>
        <StyledNoteList>
          {this.props.notes.length == 0 && <div>No comments yet</div>}
          {this.props.notes.length > 0 && noteItemsJSX}
        </StyledNoteList>
        <InputWrapper show={this.state.editMode}>
        <StyledInput value={this.state.newNoteValue} onChange={this.changeNewNoteValueHandler.bind(this)} type="text"/>
        <StyledButton onClick={this.addNoteHandler.bind(this)}>Add</StyledButton>
        </InputWrapper>
        <EditInputWrapper show={this.state.editMode}>
        <StyledInput value={this.state.editNoteValue} onChange={this.changeEditNoteValueHandler.bind(this)} type="text"/>
        <StyledButton onClick={this.updateNoteHandler.bind(this)}>Update</StyledButton>
        <StyledButton>Discard</StyledButton>
        </EditInputWrapper>
      </FormWrapper>
    )
  }
}
interface IProps{caseId:string,getNotes:any,notes:Array<INote>,addNote:any,user:any,updateNote:any}
const FormWrapper = styled('div')`
    position: fixed;
    display:flex;
    flex-direction:column;
    width: calc(100% - 80px);
    height: 100%;
    top: 0;
    left: ;
    background:
    rgba(255,255,255,0.8);
  `
const InputWrapper = styled('div')<{show:boolean}>`
  display:  ${(props)=>props.show?'none':'flex'};
`
const EditInputWrapper = styled(InputWrapper)<{show:boolean}>`
  display: ${(props)=>props.show?'flex':'none'};
`
const StyledInput = styled.input`
flex-basis:90%
`
const StyledButton = styled.button`
flex-basis:10%
`
const StyledNoteList = styled('div')`
flex-basis:100%;
`
const StyledNoteWrapper = styled('div')`
`
function mapStateToProps(state:any){
  return{
    notes: state.note,
    user: state.user
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    getNotes:(id:string)=>{dispatch(NoteActions.getNotes(id))},
    addNote: (caseId:string,userId:number,messenge:string)=>{dispatch(NoteActions.postNote(caseId,userId,messenge))},
    updateNote:(noteId:number,messenge:string)=>{dispatch(NoteActions.putNote(noteId,messenge))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotePopup)
