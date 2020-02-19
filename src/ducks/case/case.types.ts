export interface ICaseAction{
      payload:{
        data:{
          count:number,
          results:Array<ICase>
        }
      }
    }
export interface ICase{
      _id: string,
      status: Number,
      country: string,
      date_created: string,
      FK_User: Number,
      FK_Mongo_Client: String
    }
export interface IGetCasesAction{
      type: typeof CaseTypes.GET_CASES,
      payload: any
    }
export interface IPutCaseAction{
      type: typeof CaseTypes.PUT_CASE,
      payload: any
    }
export interface IDeleteCaseAction{
      type: typeof CaseTypes.DELETE_CASE,
      payload: any,
      meta:{
        id: Number
      }
    }
export interface IPostCaseAction{
      type: typeof CaseTypes.POST_CASE,
      payload: any,
      meta:{
        page: number
      }
    }
