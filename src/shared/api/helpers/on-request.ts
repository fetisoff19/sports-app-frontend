import {InternalAxiosRequestConfig} from 'axios'

export const onRequest = (config: InternalAxiosRequestConfig) => {
	if (typeof window !== 'undefined') {
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`
	}
	return config
}
