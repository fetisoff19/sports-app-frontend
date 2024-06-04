import api from '@/shared/api'
import {User} from '@/entities/auth/model'

type QueryData = {
	email: string, password: string
}

const PATH = 'auth/'


export class AuthApi {
	
	static async registration(data: QueryData): Promise<User> {
		return api.post(PATH + 'registration', data)
	}
	
	static async login(data: QueryData): Promise<User> {
		return api.post(PATH, data)
	}
	
	static async auth(): Promise<User> {
		return api.get(PATH)
	}
	
	static async logout(): Promise<User> {
		return api.get(PATH + 'logout')
	}
	
	static async changePassword(data: { current: string, new: string }): Promise<boolean> {
		return api.patch(PATH, data)
	}
	
	static async deleteUser(): Promise<boolean> {
		return api.delete(PATH)
	}
}
