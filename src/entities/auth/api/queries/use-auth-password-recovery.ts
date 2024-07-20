import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'
import {addNotify} from '@/entities/notify'

export function useAuthPasswordRecovery() {
	return useMutation({
		mutationFn: AuthApi.passwordRecovery,
		onSuccess: (data) => {
			if (data) {
				addNotify({
					type: 'success', message: 'Check your email. If you are registered, you will shortly receive reset email link'
				}, 8000)
			}
			return data
		},
	})
}
