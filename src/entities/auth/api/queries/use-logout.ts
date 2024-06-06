import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_LOGOUT, updateUser} from '@/entities/auth/model'
import {AuthApi} from '@/entities/auth'
import {redirect} from '@tanstack/react-router'

export function useLogout() {
	const {isPending, isError, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_LOGOUT],
		queryFn: async () => {
			await AuthApi.logout()
			updateUser(null)
			localStorage.removeItem('token')
			redirect({
				to: '/login',
				throw: true,
			})
			return true
		},
		enabled: false,
	})
	return {isPending, isError, data, error, refetch}
}
