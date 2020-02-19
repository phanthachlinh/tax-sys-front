// import {signInAction,SignInTypes} from './signIn';
// import axios from 'axios';
// import reducer from './signIn';
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>
// let state:any;
// describe('Test sign in actions',()=>{
//   beforeEach(()=>{
//     state = {ID: 5,isManager:true}
//   })
//   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//     let expectedResponse = {
//       type: SignInTypes.GET_USER,
//       payload: Promise.resolve({data:'hmm'}),
//       meta:{
//         username: 'usern'
//       }
//     }
//     mockedAxios.get.mockResolvedValue({data:'hmm'})
//     expect(signInAction.signIn('usern','something')).toEqual(expectedResponse)
//   })
//   it('should return null when state null',()=>{
//     expect(reducer(null,{})).toEqual(null)
//   })
//   it('should return state when state defined',()=>{
//     expect(reducer(state,{})).toEqual(state)
//   })
//   it('should return null when state defined',()=>{
//     expect(reducer(state,
//       {
//         type: SignInTypes.SIGN_OUT,
//       }
//     )).toEqual(null)
//   })
//   it('should return state when state is null',()=>{
//     expect(reducer(state,
//       {
//         type: SignInTypes.GET_USER,
//         payload:{data:state}
//       }
//     )).toEqual(state)
//   })
// })
