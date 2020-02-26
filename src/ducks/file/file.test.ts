import { FileActions } from "./file"
import { FileTypes } from "./file.enum"
import axios from 'axios';
import { IFile } from "./file.types";
import fileReducer from './file'
let newFile:IFile = {
  ID:1,
  title: 'test',
  filename: 'fsdfsdf',
  date_created: 'sdf',
  FK_User: 5,
  FK_Mongo_Case: 'sdfsfd'
}
jest.mock('axios')
const mockedAxios = axios as any;
describe('Test actions',()=>{
  it('should return get action',()=>{
    mockedAxios.get.mockResolvedValue({data:'hmm'})
    expect(FileActions.getFiles('m')).toEqual({
      type: FileTypes.GET_FILES,
      payload: Promise.resolve({data:'hmm'})
    })
  });
  it('should return post action',()=>{
    mockedAxios.post.mockResolvedValue({data:'hmm'})
    let formData = new FormData()
    expect(FileActions.postFile(formData)).toEqual({
      type: FileTypes.POST_FILE,
      payload: Promise.resolve({data: 'hmm'})
    })
  });
  it('should return put action',()=>{
    mockedAxios.put.mockResolvedValue({data:'hmm'})
    expect(FileActions.updateFile(5,'something')).toEqual({
      type: FileTypes.PUT_FILE,
      payload: Promise.resolve({data: 'hmm'}),
      meta:{
        id:5,
        title: 'something'
      }
    })
  }),
  it('should return delete action',()=>{
    mockedAxios.delete.mockResolvedValue({data:'hmm'})
    expect(FileActions.deleteFile(5)).toEqual({
      type: FileTypes.DELETE_FILE,
      payload: Promise.resolve({data: 'hmm'}),
      meta:{
        id:5
      }
    })
  })
})
describe('File reducer',()=>{
  let files: Array<IFile> = []
  beforeEach(()=>{
    files=[];
    let fileItem :IFile
    for(let i = 1; i<=5;i++){
      fileItem = {...newFile};
      fileItem.ID = i;
      files.push(fileItem)
    }
  });
  it('should return 5 files',()=>{
    expect(fileReducer([],{
      type: FileTypes.GET_FILES,
      payload:{
        data:files
      }
    })
    ).toEqual(files)
  })
  it('should return 5 files',()=>{
    expect(fileReducer(files,{
      type: FileTypes.POST_FILE,
      payload:{
        data:files
      }
    })
    ).toEqual(files)
  })
  it('should return 4 files',()=>{
    expect(fileReducer(files,{
      type: FileTypes.DELETE_FILE,
      payload:{
        data:files
      },
      meta:{
        id:1
      }
    }).length
  ).toEqual(4)
  })
  it('should update title name',()=>{
    files[2].title = 'test title'
    expect(fileReducer(files,{
      type: FileTypes.PUT_FILE,
      meta:{
        id:2,
        title:'test titlexxxx'
      }
    })[1].title
  ).toBe('test titlexxxx')
  })
})
