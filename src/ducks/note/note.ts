import axios from 'axios';
import { NoteTypes } from './note.enum';
export default function(state: Array<INote> = [], action: any) {
	switch (action.type) {
		case (NoteTypes.GET_NOTES):
			return [...action.payload.data.data.getNotes]
		case (NoteTypes.POST_NOTE):
			action.meta.ID = action.payload.data.data.addNote
			state.push(action.meta)
			return [...state]
		case (NoteTypes.PUT_NOTE):
			let updatedNoteIndex = state.findIndex((note: INote) => note.ID == action.meta.ID)
			state[updatedNoteIndex].messenge = action.meta.messenge
			return [...state]
		case (NoteTypes.DELETE_NOTE):

			let newState = state.filter((note: INote) => note.ID !== action.meta.ID)
			return newState
		default:
			return state
	}
}
export interface INote {
	ID: number,
	messenge: string,
	FK_User: number,
	FK_Mongo_Case: string
}

export const NoteActions = {
	getNotes: (id: string) => {
		return {
			type: NoteTypes.GET_NOTES,
			payload: axios.post('http://127.0.0.1:4002', {
				query: `
					query{
						getNotes(FK_Mongo_Case: "${id}"){
							ID
							messenge
							FK_User
							FK_Mongo_Case
						}
					}
				`
			})
		}
	},
	postNote: (FK_Mongo_Case: string, userId: number, messenge: string) => {
		return {
			type: NoteTypes.POST_NOTE,
			payload: axios.post('http://127.0.0.1:4002', {
				query: `
					mutation{
						addNote(
						messenge: "${messenge}"
						FK_User: ${userId}
						FK_Mongo_Case: "${FK_Mongo_Case}"
					)
					}
				`
			}),
			meta: {
				messenge,
				userId,
				FK_Mongo_Case
			}
		}
	},
	putNote: (ID: number, messenge: string) => {
		return {
			type: NoteTypes.PUT_NOTE,
			payload: axios.put('http://127.0.0.1:8001/note/', {
				noteID: ID,
				messenge: messenge
			}),
			meta: {
				ID,
				messenge
			}
		}
	},
	deleteNote: (noteID: number) => {
		return {
			type: NoteTypes.DELETE_NOTE,
			payload: axios.post('http://127.0.0.1:4002', {
				query: `
					mutation{
						deleteNote(ID:${noteID})
					}
				`
			}),
			meta: {
				ID: noteID
			}
		}
	}
}
//{req.body.messenge}','${req.body.FK_User}','${req.body.FK_Mongo_Case}')`      payload: axios.get('http://127.0.0.1:8001/user/validate?username='+username+'&password='+password+''),
