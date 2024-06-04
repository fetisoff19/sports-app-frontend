import {createFileRoute,} from '@tanstack/react-router'
import {useWorkoutGetOne} from '@/entities/workout'
import {View} from '@/pages/view.tsx'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import Login from '@/pages/login.tsx'

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
