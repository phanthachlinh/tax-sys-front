import axios from 'axios';
import { ClientTypes } from './client.enum';
import { IClientActions } from './client.types'
export default function(state: { page: number, count: number, results: Array<IClient> } = { page: 1, count: 0, results: [] }, action: any) {

	console.log(state)
	switch (action.type) {
		case ClientTypes.GET_CLIENTS:
			if (action.payload.status !== 200) {
				return state
			}
			return {
				page: action.meta.page,
				count: action.payload.data.data.getClients.count,
				results: action.payload.data.data.getClients.results
			}
		case ClientTypes.DELETE_CLIENT:

			if (action.payload.status === 200) {
				let newState: any = {};
				newState.results = state.results.filter(function(value: IClient, _index: number) {
					return value._id != action.meta._id
				});
				newState.count = state.count - 1
				newState.page = state.page
				newState.action = ClientTypes.DELETE_CLIENT
				return newState
			}
			return state;
		case ClientTypes.POST_CLIENT:
			if (action.payload.status === 200 && action.meta.page === 1) {
				state.results.pop();
				let newClient = action.meta.client;

				newClient._id = action.payload.data.data.addClient._id
				state.results.unshift(newClient)
				return { ...state }
			}
			return state;
		case ClientTypes.PUT_CLIENT:
			console.log()
			let updatedClientIndex: number = state.results.findIndex(function(value: IClient, _index: number) {
				return value._id === action.meta._id
			});
			console.log(action.meta)
			Object.keys(action.meta.data).map((key: string) => {
				(state.results[updatedClientIndex] as any)[key] = action.meta.data[key]
			})
			return { ...state };
		default:

			return state;

	}
}
export interface IClient {
	_id: string,
	amount_of_children: Number,
	civil_status: Number,
	coming_from: Number,
	date_created: String,
	date_of_birth: String,
	email: String,
	first_name: String,
	foreign_address: String,
	home_address: String,
	last_name: String,
	telephone: String,
}
export const ClientActions: IClientActions = {
	getClients: (page: Number, searchTerm: string) => {
		return {
			type: ClientTypes.GET_CLIENTS,
			payload: axios.post('http://localhost:4002/)', {
				query: `
					query{
						getClients(searchTerm: "${searchTerm}",page:${page}){
							count
							results{
								_id
								amount_of_children
								civil_status
								coming_from
								date_created
								date_of_birth
								email
								first_name
								foreign_address
								home_address
								last_name
								telephone
							}
						}
					}
				`
			}),
			meta: {
				page
			}
		}
	},
	deleteClient: (id: String) => {
		return {
			type: ClientTypes.DELETE_CLIENT,
			payload: axios.post('http://localhost:4002/', {
				query: `
					mutation{
						removeClient(_id:"${id}")
					}
				`
			}),
			meta: {
				_id: id
			}
		}
	},
	updateClient: (_id: string, data: any) => {
		return {
			type: ClientTypes.PUT_CLIENT,
			payload: axios({
				url: 'http://localhost:4002',
				method: 'post',
				data: {
					query: `
						mutation{
							updateClient(_id:"${_id}",input:{
								first_name: "${data.first_name}",
								last_name:"${data.last_name}",
								amount_of_children: ${data.amount_of_children},
								civil_status: ${data.civil_status},
								coming_from: ${data.coming_from},
								date_created: "${data.date_created}",
								date_of_birth: "${typeof data.date_of_birth === "undefined" ? '' : data.date_of_birth}",
								email: "${data.email}",
								foreign_address: "${data.foreign_address}",
								home_address: "${data.home_address}",
								telephone: "${data.telephone}",
							})
						}
					`
				},
			}),
			meta: {
				_id,
				data
			}
		}
	},
	postClient: (newClient: IClient, page: number) => {
		return {
			type: ClientTypes.POST_CLIENT,
			payload: axios({
				url: 'http://localhost:4002/',
				method: 'post',
				data: {
					query: `
					mutation{
						addClient(input:{first_name:"${newClient.first_name}",last_name:"${newClient.last_name}",coming_from:${newClient.coming_from},date_of_birth:"${newClient.date_of_birth}",civil_status:${newClient.civil_status},amount_of_children:${newClient.amount_of_children},home_address:"${newClient.home_address}",foreign_address:"${newClient.foreign_address}",email:"${newClient.email}",telephone:"${newClient.telephone}"}){
						_id
						}
					}
					`
				}
			}),
			meta: {
				client: newClient,
				page: page
			}
		}
	}
}
