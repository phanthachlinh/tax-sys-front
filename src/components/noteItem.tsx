import { INote, NoteActions } from "../ducks/note/note";
import React from "react";
import { connect } from "react-redux";
class NoteItem extends React.Component<{note:INote,showControls:boolean,removeNote:any,setupEditMode:any},{}>{
  deleteNoteHandler(ev:any){
    this.props.removeNote(this.props.note.ID)
  }
  render(){
    let controls = <div>
      <button onClick={this.props.setupEditMode}>edit</button>
      <button onClick={this.deleteNoteHandler.bind(this)}>delete</button>
    </div>
    return(
      <div>
        {this.props.note.messenge}
        {this.props.showControls?controls:''}
      </div>
    )
  }
}
function mapDispatchToProps(dispatch:any){
  return{
    removeNote:(id:number)=>{dispatch(NoteActions.deleteNote(id))}
  }
}
export default connect(null, mapDispatchToProps)(NoteItem)
