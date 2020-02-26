import { NoteActions, INote } from "./note"
import { NoteTypes } from "./note.enum"
import noteReducer from './note'
import axios from 'axios';
jest.mock('axios')
let note:INote = {
  ID:1,
  messenge: 'note text',
  FK_User: 1,
  FK_Mongo_Case: 'sfd'
}
const mockerAxios = axios as any;
describe('Note actions',()=>{
  it('should return GET Action',()=>{
    mockerAxios.get.mockResolvedValue({data:'hmmm'})
    expect(NoteActions.getNotes('mongoid')).toEqual({
      type: NoteTypes.GET_NOTES,
      payload: Promise.resolve({data:'hmmm'})
    })
  })
  it('should return POST Action',()=>{
    mockerAxios.post.mockResolvedValue({data:'hmmm'})
    expect(NoteActions.postNote('sdf',5,'sdf')).toEqual({
      type: NoteTypes.POST_NOTE,
      payload: Promise.resolve({data:'hmmm'})
    })
  })
  it('should return DELETE Action',()=>{
    mockerAxios.delete.mockResolvedValue({data:'hmmm'})
    expect(NoteActions.deleteNote(5)).toEqual({
      type: NoteTypes.DELETE_NOTE,
      payload: Promise.resolve({data:'hmmm'}),
      meta:{
        id:5
      }
    })
  })
  it('should return PUT Action',()=>{
    mockerAxios.put.mockResolvedValue({data:'hmmm'})
    expect(NoteActions.putNote(5,'hmmm')).toEqual({
      type: NoteTypes.PUT_NOTE,
      payload: Promise.resolve({data:'hmmm'}),
      meta:{
        ID:5,
        messenge: 'hmmm'
      }
    })
  })
})
describe('Note reducer',()=>{
  let notes:Array<INote>;
  beforeEach(()=>{
    notes = [];
    let newNote:INote;
    for(let i = 1; i<=10;i++){
      newNote = {...note};
      newNote.ID = i;
      notes.push(newNote)
    }
  })
  it('should return 10 notes',()=>{
    expect(noteReducer([],{
      type: NoteTypes.GET_NOTES,
      payload:{
        data:notes
      }
    }).length).toBe(10)
  })
  it('should return 11 notes',()=>{
    expect(noteReducer(notes,{
      type: NoteTypes.POST_NOTE,
      payload:{
        data:notes
      }
    }).length).toBe(11)
  })
  it('should return 9 notes',()=>{
    expect(noteReducer(notes,{
      type: NoteTypes.DELETE_NOTE,
      payload:{
        data:{}
      },
      meta:{
        id:1
      }
    }).length).toBe(9)
  })
  it('should update a note',()=>{
    expect(noteReducer(notes,{
      type: NoteTypes.PUT_NOTE,
      payload:{
        data:{}
      },
      meta:{
        ID:1,
        messenge: 'updated text'
      }
    })[0].messenge).toBe('updated text')
  })
})
