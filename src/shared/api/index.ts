import axios, {AxiosInstance} from 'axios'
import {onRequest, onRequestError, onResponse, onResponseError,} from '@/shared/api/helpers'

export const SERVER_URL: string = import.meta.env.VITE_SERVER_URL || 'https://example'
export const SERVER_PORT: string | number = import.meta.env.VITE_SERVER_PORT || 9999


const api: AxiosInstance = axios.create({
	baseURL: `${SERVER_URL}:${SERVER_PORT}/api/`,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		authorization: localStorage.getItem('token') || ''
	}
})

api.interceptors.request.use(onRequest, onRequestError)
api.interceptors.response.use(onResponse, onResponseError)

export default api
export * from './constants'
