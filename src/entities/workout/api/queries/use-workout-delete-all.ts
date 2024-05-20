import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QUERY_KEY_WORKOUTS, Workout} from "@/entities/workout";
import {QUERY_KEY_AUTH, User} from "@/entities/auth/model";
import {addNotify} from "@/entities/notify";


export function useWorkoutDeleteAll() {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: WorkoutApi.deleteAll,
		onSuccess: () => {
			queryClient.setQueryData<User>(
				[QUERY_KEY_AUTH],
				cache => cache && ({
					...cache,
					workoutCount: 0
				})
			)
			queryClient.setQueriesData<InfiniteData<Workout[], unknown>>(
				{queryKey: [QUERY_KEY_WORKOUTS]},
				cache => cache && ({
					...cache,
					pages: []
				})
			)
			addNotify({type: 'success', message: 'All workouts have been deleted'})
		}
	})
}
