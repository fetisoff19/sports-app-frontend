import {AxiosError} from 'axios'

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	if (error) {
		console.log(error)
	}
	return Promise.reject(error)
}
