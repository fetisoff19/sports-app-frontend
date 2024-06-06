import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'
import {addNotify} from '@/entities/notify'

export function useChangePassword() {
	return useMutation({
		mutationFn: AuthApi.changePassword,
		onSuccess: () => {
			addNotify({type: 'success', message: 'Successfully edit'})
		},
	})
}
