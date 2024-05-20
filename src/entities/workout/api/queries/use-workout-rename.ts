import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_WORKOUTS, Workout} from "@/entities/workout";
import {addNotify} from "@/entities/notify";


export function useWorkoutRename() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: WorkoutApi.rename,
		onSuccess: (workout) => {
			queryClient.setQueriesData<InfiniteData<Workout[], unknown>>(
				{queryKey: [QUERY_KEY_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: cache.pages.map(page => page.map(item =>
						item.uuid === workout.uuid ? workout : item
					))
				})
			)
			addNotify({type: 'success', message: 'Successfully edit'})
		}
	})
}
