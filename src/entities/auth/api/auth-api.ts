import api from '@/shared/api'
import {User} from '@/shared/types'

type QueryData = {
	email: string, password: string
}

export class AuthApi {

	static async registration(data: QueryData): Promise<User> {
		return api.post('auth/registration', data)
	}

	static async login(data: QueryData): Promise<User> {
		return api.post('auth', data)
	}

	static async auth(): Promise<User> {
		return api.get('auth')
	}

	static async logout(): Promise<User> {
		return api.get('auth/logout')
	}
}
