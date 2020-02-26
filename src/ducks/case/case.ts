import axios from 'axios';
import { CaseTypes } from './case.enum';
import { IPutCaseAction, IGetCasesAction, IPostCaseAction, ICaseAction, ICase, IDeleteCaseAction, ICaseState } from './case.types';
const initialState: ICaseState = {
	count: 0,
	results: []
}
const initialAction: ICaseAction = {
	payload: {
		data: {
			count: 0,
			results: []
		}
	}
}
export default (state: ICaseState = initialState, action: any = initialAction) => {

	switch (action.type) {
		case CaseTypes.GET_CASES:
			if (action.payload.data.data.getCases.results.length === 0)
				return state
			let { count, results } = action.payload.data.data.getCases
			return { count, results };
		case CaseTypes.POST_CASE:
			if (action.payload.status == 422)
				return state
			if (action.meta.page === 1) {
				let newState: { count: number, results: Array<ICase> } = { ...state }
				let newCase: ICase = { ...action.payload.data.data.addCase, ...action.meta.clientData }
				newState.results.pop()
				newState.results.unshift(newCase)
				return newState
			}
			return state
		case CaseTypes.DELETE_CASE:
			if (action.payload.status === 422)
				return state
			if (action.payload.status === 200) {
				let newState = { ...state };
				newState.results = newState.results.filter((casex: ICase) => { return casex._id != action.meta.id })
				return newState
			}
			return state

		case CaseTypes.PUT_CASE:
			let updatedCaseIndex = state.results.findIndex((casex: ICase) => casex._id === action.meta._id)
			state.results[updatedCaseIndex].country = action.meta.country
			state.results[updatedCaseIndex].status = action.meta.status
			return { ...state }
		default:
			return state
	}
}
export const CaseActions = {
	getCases: (id: String, page: Number): IGetCasesAction => {
		return {
			type: CaseTypes.GET_CASES,
			payload: axios.post('http://localhost:4002', {
				query: `
						query{
							getCases(FK_Mongo_Client:"${id}",page:${page}){
								count
								results{
									_id
									status
									country
									date_created
									FK_User
									FK_Mongo_Client
								}
							}
						}
						`
			}),
		}


	},
	postCase: (status: number, country: string, page: number, userId: number, clientId: string): IPostCaseAction => {
		return {
			type: CaseTypes.POST_CASE,
			payload: axios.post('http://localhost:4002/)', {
				query: `
					mutation{
					  addCase(input:{
						  	status: ${status},
							country: "${country}",
					        date_created: "2019-07-02T09:51:16.000Z",
					        FK_User: ${userId},
					        FK_Mongo_Client: "${clientId}"})
					  {
					    _id
						date_created
					  }


					}
				`
			}),

			meta: {
				page,
				clientData: {
					status,
					country,
					userId,
					clientId
				}

			}
		}
	},
	deleteCase: (ID: string): IDeleteCaseAction => {
		return {
			type: CaseTypes.DELETE_CASE,
			payload: axios.post('http://localhost:8888/case/', {
				query: `
					mutation{
						removeCase(_id:"${ID}")
					}
				`

			}),
			meta: {
				id: ID
			}
		}
	},
	putCase: (_id: string, status: number, country: string): IPutCaseAction => {
		return {
			type: CaseTypes.PUT_CASE,
			payload: axios.post('http://localhost:4002', {
				query: `
				mutation{
					updateCase(_id:"${_id}",country:"${country}",status:${status})
				}
				`
			}),
			meta: {
				_id, country, status
			}

		}
	}
}
