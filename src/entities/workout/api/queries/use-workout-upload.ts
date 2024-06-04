import {useMutation} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'

export function useWorkoutUpload() {
	return useMutation({
		mutationFn: WorkoutApi.upload,
	})
}
