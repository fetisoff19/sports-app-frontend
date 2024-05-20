import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_WORKOUTS, Workout} from "@/entities/workout";
import {QUERY_KEY_AUTH, User} from "@/entities/auth/model";
import {addNotify} from "@/entities/notify";


export function useWorkoutDelete() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: WorkoutApi.deleteOne,
		onSuccess: (_, {uuid}) => {
			queryClient.setQueryData<User>(
				[QUERY_KEY_AUTH],
				cache => cache && ({
					...cache,
					workoutCount: cache.workoutCount > 0 ? cache.workoutCount - 1 : 0
				})
			)
			queryClient.setQueriesData<InfiniteData<Workout[], unknown>>(
				{queryKey: [QUERY_KEY_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: cache.pages.map(page => page.filter(elem => elem.uuid !== uuid))
				})
			)
			addNotify({type: 'success', message: 'Successfully deleted'})
		}
	})
}
