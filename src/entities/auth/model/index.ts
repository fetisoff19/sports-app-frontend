import {Store} from '@tanstack/react-store'
import {PROVIDER_TYPE} from '@/shared/types'

export type User = {
	email: string | null
	provider: PROVIDER_TYPE
	login: string
	image: string
	workoutCount: number
}

export const QUERY_KEY_LOGIN = 'LOGIN'
export const QUERY_KEY_LOGOUT = 'LOGOUT'

type State = {
	isAuth: boolean,
	user: User | null
};

export const authStore = new Store<State>({
	isAuth: !!localStorage.getItem('token'),
	user: null,
})


export const updateUser = (user: User | null) => {
	authStore.setState((state) => {
		return {
			...state,
			user,
			isAuth: !!user
		}
	})
}

export const updateWorkoutsCount = (workoutCount: number) => {
	authStore.setState((state) => {
		return {
			...state,
			user: state.user && {
				...state.user,
				workoutCount,
			}
		}
	})
}

