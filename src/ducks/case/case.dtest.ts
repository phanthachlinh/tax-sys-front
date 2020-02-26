// import reducer, { CaseActions } from './case';
// import axios from 'axios';
// import { ICase } from './case.types';
// import { CaseTypes } from './case.enum';
// jest.mock('axios')
// const mockedAxios = axios as any;
// let newCases:{count:number,results:Array<ICase>} = {count:0,results:[]};
// const casex:ICase = {
//   _id:'1',
//   status:1,
//   country: 'DK',
//   date_created: Date.now().toString(),
//   FK_User: 5,
//   FK_Mongo_Client: 'sdffdssd'
// }
// describe('Test action return type',()=>{
//   it('should return get action',()=>{
//     mockedAxios.get.mockResolvedValue({data:'hmm'})
//     expect(CaseActions.getCases('shit',1)).toEqual({type: CaseTypes.GET_CASES,payload:Promise.resolve({data:'hmm'})})
//   });
//   it('should return POST action',()=>{
//     let newCase = {...casex};
//     newCase._id= '7';
//     mockedAxios.post.mockResolvedValue({data: newCase})
//     expect(CaseActions.postCase(casex as unknown as FormData,1,1,'1')).toEqual(
//       {
//         type: CaseTypes.POST_CASE,
//         payload:Promise.resolve({data:'hmm'}),
//         meta:{
//           page:1
//         }
//       })
//   })
//   it('should return DELETE action',()=>{
//     casex._id= '7';
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
//     let newCase =casex;
//     casex._id= '7';
//     mockedAxios.put.mockResolvedValue({data: 6})
//     expect(CaseActions.putCase(casex._id,casex.status,casex.country)).toEqual(
//       {
//         type: CaseTypes.PUT_CASE,
//         payload:Promise.resolve({data: newCase})
//       })
//   })
// })
// describe('Test case reducer',()=>{
//   beforeEach(()=>{
//     for(let i =0; i<5;i++){
//       newCases.results.push({...casex})
//     }
//     newCases.count = 5;
//   });
//   afterEach(()=>{
//     newCases = {count:0,results:[]}
//   })
//   it('should return new state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.GET_CASES,
//         payload: {status:200,data: newCases}
//       })
//     ).toEqual(newCases)
//   })
//   it('should return updated state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     let newCase = {...casex}
//     newCase.country = 'en'
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.POST_CASE,
//         payload: {status:200,data: newCase},
//         meta:{
//           page:1
//         }
//       }).results.indexOf(newCase)
//     ).not.toEqual(-1)
//   })
//   it('should return old state',()=>{
//     mockedAxios.get.mockResolvedValue({data:newCases})
//     let newCase = {...casex}
//     newCase.country = 'en'
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.POST_CASE,
//         payload: {status:200,data: newCase},
//         meta:{
//           page:2
//         }
//       })
//     ).toEqual(newCases)
//   })
//   it('should return remove a case from state',()=>{
//     newCases.results[0]._id = '401';
//
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.DELETE_CASE,
//         payload: {status:200,data: 401},
//         meta:{id:'401'}
//       }).results.length
//     ).toEqual(4)
//   })
//   it('should return updated state',()=>{
//     newCases.results[0]._id = '400';
//     let updatedCase:ICase = {...casex};
//     updatedCase.country="fr";
//     updatedCase.status = 6;
//     expect(reducer(newCases,
//       {
//         type:CaseTypes.PUT_CASE,
//         payload: {
//           status:200,
//           data: updatedCase
//         }
//       }).results.indexOf(updatedCase)
//     ).not.toEqual(-1)
//   })
// })
