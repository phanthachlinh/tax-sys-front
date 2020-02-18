// import reducer,{IClient,ClientTypes,ClientActions} from './client';
// import axios from 'axios';
// jest.mock('axios');
// const mockedAxios = axios as any
// let client:IClient = {
//   _id: "5e1dcdf1193f7a2e81af86c7",
//   first_name: "Rick",
//   last_name: "James",
//   coming_from: 0,
//   date_of_birth: "0111-11-11T00:00:00.000Z",
//   civil_status: 0,
//   amount_of_children: 0,
//   home_address: "Robert Jacobsens Vej",
//   foreign_address: "Sommervej",
//   email: "12",
//   telephone: "12",
//   date_created: "2020-01-14T14:19:29.817Z"
// };
// let clients: Array<IClient> = []
// describe('Check return type of actions',()=>{
//   it('should return the get type',()=>{
//     mockedAxios.get.mockResolvedValue({data:'hmm'})
//     expect(ClientActions.getClients(1)).toEqual(
//       {
//           type: ClientTypes.GET_CLIENTS,
//           payload:Promise.resolve({data:'hmm'})
//       }
//     )
//   })
//   it('should return the get type',()=>{
//     mockedAxios.delete.mockResolvedValue({data:'hmm'})
//     expect(ClientActions.deleteClient(1)).toEqual(
//       {
//           type: ClientTypes.DELETE_CLIENT,
//           payload:Promise.resolve({data:'hmm'})
//       }
//     )
//   })
//   it('should return the update type',()=>{
//     mockedAxios.mockResolvedValue({data:'hmm'})
//     expect(ClientActions.updateClient(1)).toEqual(
//       {
//           type: ClientTypes.PUT_CLIENT,
//           payload:Promise.resolve({data:'hmm'})
//       }
//     )
//   })
//   it('should return the post type',()=>{
//     mockedAxios.post.mockResolvedValue({data:'hmm'})
//     expect(ClientActions.postClient(1)).toEqual(
//       {
//           type: ClientTypes.POST_CLIENT,
//           payload:Promise.resolve({data:'hmm'}),
//           meta:{client:1}
//       }
//     )
//   })
// })
// describe('Check state',()=>{
//   beforeEach(()=>{
//     for(let i = 0; i<5;i++){
//       clients.push({...client})
//     }
//   })
//   afterEach(()=>{
//     clients=[];
//   })
//   it('should return default state',()=>{
//     expect(reducer({count:20,results:clients},'shit')).toEqual({count:20,results:clients})
//   })
//   it('should return n-1 state',()=>{
//     clients[0]._id= '665';
//
//     expect(reducer({count:20,results:clients},
//       {
//         type:ClientTypes.DELETE_CLIENT,
//         payload:{
//           status:200,
//           data: {id:665}
//         }
//       }
//     ).results.length).toEqual(4)
//   })
//   it('should return list of 5 clients',()=>{
//     expect(reducer({count:20,results:[]},
//       {
//         type:ClientTypes.GET_CLIENTS,
//         payload:{
//           status:200,
//           data: {count:20,results:clients}
//         }
//       }
//     ).results.length).toEqual(5)
//   })
//   it('should return default state',()=>{
//     expect(reducer({count:20,results:clients},
//       {
//         type:ClientTypes.GET_CLIENTS,
//         payload:{
//           status:422,
//           data:[]
//         }
//       }
//     ).results.length).toEqual(5)
//   })
//   it('should return list with updated client',()=>{
//     expect(reducer({count:20,results:clients},
//       {
//         type:ClientTypes.POST_CLIENT,
//         payload:{
//           status:200,
//         },
//         meta:{
//           page:5
//         }
//
//       }
//     )).toEqual({count:20,results:clients})
//   })
//   it('should return list with updated client',()=>{
//     let newClient = {...client}
//     newClient._id='666'
//     expect(reducer({count:20,results:clients},
//       {
//         type:ClientTypes.POST_CLIENT,
//         payload:{
//           status:200,
//           data:newClient
//         },
//         meta:{
//           page:1
//         }
//
//       }
//     ).results.findIndex((client:IClient)=>client._id=='666')).not.toEqual(-1)
//   })
// })
