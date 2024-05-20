import {AxiosResponse} from "axios";

export const onResponse = (response: AxiosResponse): AxiosResponse['data'] => {
	if (typeof window !== 'undefined') {
		const authorization: string | undefined = response?.headers?.authorization
		const token: string | undefined = authorization?.split(' ')?.at(-1)
		if (token) {
			localStorage.setItem('token', token)
		}
	}
	return response?.data ?? {}
}
