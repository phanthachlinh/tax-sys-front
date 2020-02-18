// import reducer,{CaseTypes,CaseActions,ICase} from './case';
// import axios,{AxiosResponse} from 'axios';
// jest.mock('axios')
// const mockedAxios = axios as any;
// let newCases:Array<ICase> = [];
// const casex:ICase = {
//   ID:1,
//   status:1,
//   country: ['DK'],
//   date_created: Date.now().toString(),
//   FK_User: 5,
//   FK_Mongo_Client: 'sdffdssd'
// }
// describe('Test action return type',()=>{
//   it('should return get action',()=>{
//     mockedAxios.get.mockResolvedValue({data:'hmm'})
//     expect(CaseActions.getCases('shit',1)).toEqual({type: CaseTypes.GET_CASES,payload:Promise.resolve({data:'hmm'})})
//   });
//   // it('should return POST action',()=>{
//   //   let newCase = {...casex};
//   //   newCase.ID= 7;
//   //   mockedAxios.post.mockResolvedValue({data: newCase})
//   //   expect(CaseActions.postCase(1,casex as unknown as FormData,'')).toEqual(
//   //     {
//   //       type: CaseTypes.POST_CASE,
//   //       payload:Promise.resolve({data:'hmm'}),
//   //       meta:{
//   //         page:1
//   //       }
//   //     })
//   // })
//   it('should return DELETE action',()=>{
//     let newCase = {...casex};
//     casex.ID= 7;
//     mockedAxios.delete.mockResolvedValue({status:200,data:{id: 7}});
//     expect(CaseActions.deleteCase(7)).toEqual(
//       {
//         type: CaseTypes.DELETE_CASE,
//         payload:Promise.resolve({data:{id:7}}),
//         meta:{
//           id:7
//         }
//       })
//   })
//   it('should return PUT action',()=>{
//     let newCase = {...casex};
//     casex.ID= 7;
//     mockedAxios.post.mockResolvedValue({data: 6})
//     expect(CaseActions.putCase(newCase as unknown as FormData)).toEqual(
//       {
//         type: CaseTypes.PUT_CASE,
//         payload:Promise.resolve({data: newCase})
//       })
//   })
// })/*
// describe('Test case reducer',()=>{
//   beforeEach(()=>{
//     for(let i =0; i<5;i++){
//       newCases.push({...casex})
//     }
//   });
//   afterEach(()=>{
//     newCases = []
//   })
//   it('should return new state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     expect(reducer([],
//       {
//         type:CaseTypes.GET_CASES,
//         payload: {data: newCases}
//       })
//     ).toEqual(newCases)
//   })
//   it('should return new state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     let newCase = {...casex}
//     newCase.country = 'en'
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.POST_CASE,
//         payload: {data: newCase},
//         meta:{
//           page:1
//         }
//       }).indexOf(newCase)
//     ).not.toEqual(-1)
//   })
//   it('should return old state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     let newCase = {...casex}
//     newCase.country = 'en'
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.POST_CASE,
//         payload: {data: newCase},
//         meta:{
//           page:2
//         }
//       })
//     ).toEqual(newCases)
//   })
//   it('should return remove a case from state',()=>{
//     newCases[0].ID = 400;
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.DELETE_CASE,
//         payload: {status:200,data: 400},
//         meta:{id:400}
//       }).length
//     ).toEqual(4)
//   })
//   it('should return updated state',()=>{
//     newCases[0].ID = 400;
//     let updatedCase:ICase = {...casex};
//     updatedCase.country="fr";
//     updatedCase.status = 6;
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.PUT_CASE,
//         payload: {data: updatedCase}
//       }).indexOf(updatedCase)
//     ).not.toEqual(-1)
//   })
// })*/
