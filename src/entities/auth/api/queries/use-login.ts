import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'
import {updateUser} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'
import axios from 'axios'

export function useLogin() {
	return useMutation({
		mutationFn: AuthApi.login,
		onSuccess: (data) => {
			if (data) {
				updateUser(data)
			}
		},
		onError: (e: unknown) => {
			if (axios.isAxiosError(e) && e?.response?.status === 401) {
				addNotify({type: 'info', message: 'Wrong email or password'})
			}
		}
	})
}
