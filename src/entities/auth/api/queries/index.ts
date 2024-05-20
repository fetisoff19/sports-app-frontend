import {useMutation, useQuery} from "@tanstack/react-query";

import {QUERY_KEY_AUTH, updateUser} from "@/entities/auth/model";
import {AuthApi} from "@/entities/auth";

export function useAuth() {
	const {isPending, isError, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_AUTH],
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

export function useLogout() {
	const {isPending, isError, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_AUTH],
		queryFn: async () => {
			await AuthApi.logout()
			updateUser(null)
			localStorage.removeItem('token')
		},
		enabled: false,
	})
	return {isPending, isError, data, error, refetch}
}

export function useRegistration() {
	return useMutation({
		mutationFn: AuthApi.registration,
		onSuccess: (data) => {
			if (data) {
				updateUser(data)
			}
		},
	})
}


export function useLogin() {
	return useMutation({
		mutationFn: AuthApi.login,
		onSuccess: (data) => {
			if (data) {
				updateUser(data)
			}
		},
	})
}
