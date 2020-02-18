import axios from 'axios';
export default (state:Array<IFile> = [],action:any)=>{
  switch(action.type){
    case FileTypes.GET_FILES:
      return action.payload.data
    case 'fuck':
      let removeIndex = state.findIndex((file:IFile)=>file.ID==action.meta.id)

      state.splice(removeIndex, 1);
      return [...state]
    case FileTypes.POST_FILE:
      state.push(action.payload.data)
      return [...state]
    case FileTypes.PUT_FILE:
      let updateIndex = state.findIndex((file:IFile)=>file.ID==action.meta.id)
      state[updateIndex].title = action.meta.title
      return [...state]
    default:
      return state
  }
}
export const FileActions = {
  getFiles:(caseId: string)=>{
    return {
      type: FileTypes.GET_FILES,
      payload: axios.get("http://127.0.0.1:8001/file?caseId="+caseId)
    }
  },
  postFile:(formData:FormData)=>{
    return{
      type: FileTypes.POST_FILE,
      payload: axios.post("http://127.0.0.1:8001/file",formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
    }
  },
  deleteFi:(id:number)=>{
    return{
      type: 'fuck',
      payload: axios.delete("http://127.0.0.1:8001/file",{params:{id}}),
      meta:{id}
    }
  },
  updateFile:(id:number,title:string)=>{
    return{
      type: FileTypes.PUT_FILE,
      payload: axios.put("http://127.0.0.1:8001/file",{id,title}),
      meta:{id,title}
    }
  }
}
enum FileTypes {
  GET_FILES = "GET_FILES",
  POST_FILE = "POST_FILE",
  DELETE_FILE = "DELETE_FILE",
  PUT_FILE = "PUT_FILE"
}
export interface IFile{
  ID:number,
  filename: string,
  title:string,
  date_created:string,
  FK_User:number,
  FK_Mongo_Case:string
}
