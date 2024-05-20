import {AxiosError} from 'axios'
import {updateUser} from "@/entities/auth/model";
import {addNotify} from "@/entities/notify";


export const onResponseError = async (
	error: AxiosError,
): Promise<AxiosError> => {
	if (error.response?.status === 401) {
		console.log(error.response)
// сбросить ауф
		if (typeof window !== 'undefined') {
			updateUser(null)
			localStorage.removeItem('token')
		}
	} else if (error.response?.status !== 422) {
		//@ts-ignore
		addNotify({type: 'error', message: `An error has occurred: ${error.response?.data?.message}`}, 5000)
	}
	return Promise.reject(error)
	// return error
}
