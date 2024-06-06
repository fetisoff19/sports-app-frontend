import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'
import {updateUser} from '@/entities/auth/model'
import {redirect} from '@tanstack/react-router'
import {addNotify} from '@/entities/notify'

export function useDeleteUser() {
	return useMutation({
		mutationFn: AuthApi.deleteUser,
		onSuccess: () => {
			updateUser(null)
			localStorage.removeItem('token')
			redirect({
				to: '/login'
			})
			addNotify({type: 'success', message: 'Successfully delete'})
		},
	})
}
