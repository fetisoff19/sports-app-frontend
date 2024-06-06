import {createFileRoute} from '@tanstack/react-router'
import {useWorkoutGetOne} from '@/entities/workout'
import {authStore} from '@/entities/auth/model'
import {useStore} from '@tanstack/react-store'
import Login from '@/pages/login.tsx'
import {lazy} from 'react'

const View = lazy(
	() => import('@/pages/view')
		.then(({View}) => ({default: View})))

export const Route = createFileRoute('/view/$uuid')({
	loader: ({context: {queryClient}, params: {uuid}}) => {
		return queryClient.ensureQueryData(useWorkoutGetOne(uuid))
	},
	component: () => {
		const isAuth = useStore(authStore, (state) => state.isAuth)
		if (isAuth) {
			return <View/>
		}
		return <Login/>
	}
})

