import {useMutation} from '@tanstack/react-query'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {changeStatus} from "@/entities/notify";

export function useWorkoutUpload() {
	return useMutation({
		mutationFn: WorkoutApi.upload,
		onError: (e: any, {doc}) => changeStatus(doc, 'error', e?.response?.data?.message || e?.message)
		,
		onSuccess: (data, {doc}) => {
			changeStatus(doc, 'success')
			return data
		}
	})
}
