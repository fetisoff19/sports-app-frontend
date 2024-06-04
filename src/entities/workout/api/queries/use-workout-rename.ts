import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_ONE_WORKOUT, QUERY_KEY_SOME_WORKOUTS, WorkoutFromDb, WorkoutItem} from '@/entities/workout'
import {addNotify} from '@/entities/notify'


export function useWorkoutRename() {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: WorkoutApi.rename,
		onSuccess: (workout) => {
			queryClient.setQueriesData<InfiniteData<WorkoutItem[], unknown>>(
				{queryKey: [QUERY_KEY_SOME_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: cache.pages.map(page => page.map(item =>
						item.uuid === workout.uuid ? workout : item
					))
				})
			)
			queryClient.setQueriesData<WorkoutFromDb>(
				{queryKey: [QUERY_KEY_ONE_WORKOUT, workout.uuid]},
				cache => cache && ({
					...cache,
					name: workout.name,
					note: workout.note,
				})
			)
			addNotify({type: 'success', message: 'Successfully edit'})
		}
	})
}
