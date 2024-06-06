import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_LOGIN, updateUser} from '@/entities/auth/model'
import {AuthApi} from '@/entities/auth'

export function useAuth() {
	const {isPending, isError, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_LOGIN],
		queryFn: async () => {
			const data = await AuthApi.auth()
			if (data) {
				updateUser(data)
			}
			return data
		},
		enabled: false,
	})
	return {isPending, isError, data, error, refetch}
}
