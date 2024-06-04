import {useMutation, useQuery} from '@tanstack/react-query'

import {QUERY_KEY_LOGIN, QUERY_KEY_LOGOUT, updateUser} from '@/entities/auth/model'
import {AuthApi} from '@/entities/auth'
import {addNotify} from '@/entities/notify'
import {redirect} from '@tanstack/react-router'

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

export function useRegistration() {
	return useMutation({
		mutationFn: AuthApi.registration,
		// onSuccess: (data) => {
		// 	if (data) {
		// 		updateUser(data)
		// 	}
		// },
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
		onError: () => {
			addNotify({type: 'info', message: 'Wrong email or password'})
		}
	})
}

export function useChangePassword() {
	return useMutation({
		mutationFn: AuthApi.changePassword,
		onSuccess: () => {
			addNotify({type: 'success', message: 'Successfully edit'})
		},
	})
}

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
