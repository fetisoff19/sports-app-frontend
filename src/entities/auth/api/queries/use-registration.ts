import {useMutation} from '@tanstack/react-query'
import {AuthApi} from '@/entities/auth'


export function useRegistration() {
	return useMutation({
		mutationFn: AuthApi.registration,
	})
}
