export interface IClientActions {
	getClients: any,
	deleteClient: any,
	postClient: any,
	updateClient: any
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
