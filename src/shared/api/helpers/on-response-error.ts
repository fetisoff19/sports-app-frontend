import {AxiosError} from 'axios'
import {updateUser} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'
import {redirect} from '@tanstack/react-router'


export const onResponseError = async (e: AxiosError<{ message: string }>): Promise<AxiosError> => {
	if (e.response?.status === 401) {
		// without auth error
		redirect({
			to: '/',
		})
		updateUser(null)
		localStorage.removeItem('token')
	} else if (e.response?.status !== 422) {
		// without upload files
		const message = e.response?.data?.message || e?.message
		addNotify({type: 'error', message: `An error has occurred: ${message}`}, 5000)
	}
	return Promise.reject(e)
}
