import axios from 'axios';
import { IFile } from './file.types';
import { FileTypes } from './file.enum';
export default (state: Array<IFile> = [], action: any): Array<IFile> => {
	switch (action.type) {
		case FileTypes.GET_FILES:
			console.log('get')
			console.log(action.payload)
			return action.payload.data.data.getFiles
		case FileTypes.DELETE_FILE:
			let removeIndex = state.findIndex((file: IFile) => file.ID == action.meta.id)

			state.splice(removeIndex, 1);
			return [...state]
		case FileTypes.POST_FILE:
			if (action.error)
				return state
			console.log(action)
			state.push(action.payload.data)
			return [...state]
		case FileTypes.PUT_FILE:

			let updateIndex = state.findIndex((file: IFile) => file.ID == action.meta.id)
			state[updateIndex].title = action.meta.title;
			return [...state]
		default:
			return state
	}
}
export const FileActions = {
	getFiles: (FK_Mongo_Case: string) => {
		return {
			type: FileTypes.GET_FILES,
			payload: axios.post("http://127.0.0.1:4002", {
				query: `
                    query{
                        getFiles(FK_Mongo_Case:"${FK_Mongo_Case}"){
                            ID
                            filename
                            title
                            date_created
                            FK_User
                            FK_Mongo_Case
                        }
                    }
                `
			})
		}
	},
	postFile: (formData: FormData) => {
		return {
			type: FileTypes.POST_FILE,
			payload: axios.post("http://127.0.0.1:8889/file", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		}
	},
	deleteFile: (id: number) => {
		return {
			type: FileTypes.DELETE_FILE,
			payload: axios.post("http://127.0.0.1:4002", {
				query: `
                    mutation{
                        deleteFile(ID:${id})
                    }
                `
			}),
			meta: { id }
		}
	},
	updateFile: (id: number, title: string) => {
		return {
			type: FileTypes.PUT_FILE,
			payload: axios.put("http://127.0.0.1:8001/file", { id, title }),
			meta: { id, title }
		}
	}
}
