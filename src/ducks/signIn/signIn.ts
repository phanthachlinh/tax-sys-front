import axios from 'axios';

export default function(state: IUser | null = null, action: any): IUser | null {

	switch (action.type) {
		case (SignInTypes.GET_USER):
			if (action.payload.data.errors)
				return state
			if (!action.payload.data.data.validateUser)
				return state
			return { ...action.payload.data.data.validateUser }
		case (SignInTypes.LOG_OUT):
			return null
		default:
			return state
	}
}
export const userActions = {
	signIn: (username: String, password: String) => {
		return {
			type: SignInTypes.GET_USER,
			payload: axios.post('http://127.0.0.1:4002/',
				{
					query: `
                    query{
                      validateUser(username:"${username}",password:"${password}"){
                        ID
                        isManager
                      }

                    }
                    `
				}),
			meta: {
				username: username
			}
		}
	},
	logout: () => {
		return {
			type: SignInTypes.LOG_OUT,
			payload: {}
		}
	}
}
export interface IUser {
	ID: number,
	isManager: boolean
}

export const SignInTypes = {
	GET_USER: 'GET_USER',
	LOG_OUT: 'LOG_OUT'
}
