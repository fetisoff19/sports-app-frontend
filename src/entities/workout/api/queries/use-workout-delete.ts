import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_SOME_WORKOUTS, WorkoutItem} from '@/entities/workout'
import {QUERY_KEY_LOGIN, updateWorkoutsCount, User} from '@/entities/auth/model'
import {addNotify} from '@/entities/notify'
import {QUERY_KEY_STATS_MAIN} from '@/entities/stats'


export function useWorkoutDelete() {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: WorkoutApi.deleteOne,
		onSuccess: (_, {uuid}) => {
			queryClient.setQueryData<User>(
				[QUERY_KEY_LOGIN],
				cache => {
					if (cache) {
						const workoutCount = cache.workoutCount > 0 ? cache.workoutCount - 1 : 0
						updateWorkoutsCount(workoutCount)
						return ({
							...cache,
							workoutCount
						})
					}
				}
			)
			queryClient.invalidateQueries({queryKey: [QUERY_KEY_STATS_MAIN], refetchType: 'all'},)
			queryClient.setQueriesData<InfiniteData<WorkoutItem[], unknown>>(
				{queryKey: [QUERY_KEY_SOME_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: cache.pages.map(page => page.filter(elem => elem.uuid !== uuid))
				})
			)
			addNotify({type: 'success', message: 'Successfully deleted'})
		}
	})
}
