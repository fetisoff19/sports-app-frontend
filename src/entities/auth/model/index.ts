import {Store} from "@tanstack/react-store";

export type User = {
	email: string
	// avatar?: string
	// workouts?: [object] | []
	// stats?: object
	// info?: object
	// language?: string
	login: string
	image: string
	workoutCount: number
	// createdAt: Date
	// updatedAt: Date
}


export const QUERY_KEY_AUTH = 'AUTH'


type State = {
	isAuth: boolean,
	user: User | null
};

export const authStore = new Store<State>({
	isAuth: !!localStorage.getItem('token'),
	user: null,
});

export const updateAuth = (isAuth: boolean) => {
	authStore.setState((state) => {
		return {
			...state,
			isAuth,
		};
	});
};

export const updateUser = (user: User | null) => {
	authStore.setState((state) => {
		return {
			...state,
			user,
			isAuth: !!user
		};
	});
};
