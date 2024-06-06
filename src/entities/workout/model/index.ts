import {Store} from '@tanstack/react-store'
import {sortParams, sports} from '@/shared/lib'

export * from './types'

export const QUERY_KEY_SOME_WORKOUTS = 'SOME_WORKOUTS'
export const QUERY_KEY_ONE_WORKOUT = 'ONE_WORKOUT'
export const QUERY_KEY_MAP_IMAGE = 'MAP_IMAGE'
export const UPLOAD = 'UPLOAD'

type State = {
	workoutName: string
	overviewName: string
	sport: typeof sports[number]
	param: typeof sortParams[number]
	direction: 'ASC' | 'DESC'
};

export const workoutsStore = new Store<State>({
	workoutName: '',
	overviewName: '',
	sport: 'all',
	param: 'date',
	direction: 'DESC',
})

export const setName = (name: string, field: 'workoutName' | 'overviewName') => {
	workoutsStore.setState((state) => {
		return {
			...state,
			[field]: name,
		}
	})
}

export const setSport = (sport: typeof sports[number]) => {
	workoutsStore.setState((state) => {
		return {
			...state,
			sport
		}
	})
}

export const setParam = (param: typeof sortParams[number]) => {
	workoutsStore.setState((state) => {
		return {
			...state,
			param
		}
	})
}

export const setDirection = () => {
	workoutsStore.setState((state) => {
		return {
			...state,
			direction: state.direction === 'ASC' ? 'DESC' : 'ASC'
		}
	})
}

