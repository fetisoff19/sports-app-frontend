import axios, {AxiosInstance} from 'axios'
import {onRequest, onRequestError, onResponse, onResponseError,} from '@/shared/api/helpers'

export const SERVER_URL: string = import.meta.env.VITE_SERVER_URL
export const STATIC_URL: string = import.meta.env.VITE_STATIC_URL

const api: AxiosInstance = axios.create({
	baseURL: `${SERVER_URL}/api/`,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		authorization: localStorage.getItem('token') || ''
	}
})

api.interceptors.request.use(onRequest, onRequestError)
api.interceptors.response.use(onResponse, onResponseError)

export default api
