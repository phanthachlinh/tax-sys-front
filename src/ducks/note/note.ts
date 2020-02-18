import axios from 'axios';
export default function(state:Array<INote>=[],action:any){
  switch(action.type){
    case(NoteTypes.GET_NOTES):
      return [...action.payload.data]
    case(NoteTypes.POST_NOTE):
      state.push(action.payload.data[0])
      return [...state]
    case(NoteTypes.PUT_NOTE):
      let updatedNoteIndex = state.findIndex((note:INote)=>note.ID == action.meta.noteId)
      state[updatedNoteIndex].messenge=action.meta.messenge
      return [...state]
    case(NoteTypes.DELETE_NOTE):

      let newState= state.filter((note:INote)=>note.ID!==action.meta.id)
      return newState
    default:
      return state
  }
}
export interface INote{
  ID:number,
  messenge:string,
  FK_User: number,
  caseID:string
}
enum NoteTypes {
  GET_NOTES = 'GET_NOTES',
  POST_NOTE = 'POST_NOTE',
  DELETE_NOTE = "DELETE_NOTE",
  PUT_NOTE = "PUT_NOTE"
}
export const NoteActions = {
  getNotes:(id:string)=>{
    return {
      type: NoteTypes.GET_NOTES,
      payload: axios.get('http://127.0.0.1:8001/note?caseId='+id)
    }
  },
  postNote:(caseId:string,userId:number,messenge:string)=>{
    return {
      type: NoteTypes.POST_NOTE,
      payload: axios.post('http://127.0.0.1:8001/note/',{
        messenge:messenge,
        FK_User:userId,
        FK_Mongo_Case: caseId
      })
    }
  },
  putNote:(noteId:number,messenge:string)=>{
    return {
      type: NoteTypes.PUT_NOTE,
      payload: axios.put('http://127.0.0.1:8001/note/',{
        noteID:noteId,
        messenge:messenge
      }),
      meta:{
        noteId,
        messenge
      }
    }
  },
  deleteNote:(noteId:number)=>{
    return {
      type: NoteTypes.DELETE_NOTE,
      payload: axios.delete('http://127.0.0.1:8001/note/',{
        params:{
          id:noteId
        }
      }),
      meta:{
        id:noteId
      }
    }
  }
}
//{req.body.messenge}','${req.body.FK_User}','${req.body.caseID}')`      payload: axios.get('http://127.0.0.1:8001/user/validate?username='+username+'&password='+password+''),
