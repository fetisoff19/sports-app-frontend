import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'
import {updateUser} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'

export function useLogin() {
	return useMutation({
		mutationFn: AuthApi.login,
		onSuccess: (data) => {
			if (data) {
				updateUser(data)
			}
		},
		onError: () => {
			addNotify({type: 'info', message: 'Wrong email or password'})
		}
	})
}
