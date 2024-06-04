import {AxiosError} from 'axios'
import {updateUser} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'
import {redirect} from '@tanstack/react-router'


export const onResponseError = async (
	error: AxiosError<{ message: string }>,
): Promise<AxiosError> => {
	if (error.response?.status === 401) {
		redirect({
			to: '/login',
		})
		updateUser(null)
		localStorage.removeItem('token')
	} else if (error.response?.status !== 422) {
		const message = error.response?.data?.message || error?.message
		addNotify({type: 'error', message: `An error has occurred: ${message}`}, 5000)
	}
	return Promise.reject(error)
}
