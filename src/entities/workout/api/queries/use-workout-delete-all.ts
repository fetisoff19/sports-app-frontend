import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_SOME_WORKOUTS, WorkoutItem} from '@/entities/workout'
import {QUERY_KEY_LOGIN, updateWorkoutsCount, User} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'


export function useWorkoutDeleteAll() {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: WorkoutApi.deleteAll,
		onSuccess: () => {
			updateWorkoutsCount(0)
			queryClient.setQueryData<User>(
				[QUERY_KEY_LOGIN],
				cache => cache && ({
					...cache,
					workoutCount: 0
				})
			)
			queryClient.setQueriesData<InfiniteData<WorkoutItem[], unknown>>(
				{queryKey: [QUERY_KEY_SOME_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: []
				})
			)
			addNotify({type: 'success', message: 'All workouts have been deleted'})
		}
	})
}
