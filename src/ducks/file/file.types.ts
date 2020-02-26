export interface IFile{
  ID:number,
  filename: string,
  title:string,
  date_created:string,
  FK_User:number,
  FK_Mongo_Case:string
}
