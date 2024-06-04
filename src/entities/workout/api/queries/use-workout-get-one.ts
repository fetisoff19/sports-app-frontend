import {queryOptions} from '@tanstack/react-query'
import {QUERY_KEY_ONE_WORKOUT, Workout} from '@/entities/workout'
import {WorkoutApi} from '@/entities/workout/api/workout-api.ts'

export function useWorkoutGetOne(uuid: string) {
	return queryOptions({
		queryKey: [QUERY_KEY_ONE_WORKOUT, uuid],
		queryFn: () => WorkoutApi.getOne({uuid}),
		staleTime: 3600 * 1000,
		select: data => {
			if (data) {
				const polylinePoints = data?.polyline?.points?.length ? JSON.parse(data.polyline.points) : []
				const chartDataPoints = data?.chartData?.points?.length ? JSON.parse(data.chartData?.points) : []
				
				const powerCurve: [number, number][] = []
				if (data?.powerCurve) {
					for (const key in data.powerCurve) {
						if (Number(key) > 0 && Number(data.powerCurve[key]) > 0) {
							powerCurve.push([Number(key), Number(data.powerCurve[key])])
						}
					}
					powerCurve.toSorted((a, b) => a[0] - b[0])
				}
				
				return ({
					...data,
					polyline: data?.polyline && {
						...data?.polyline,
						points: polylinePoints,
					},
					chartData: data?.chartData && {
						...data?.chartData,
						points: chartDataPoints,
					},
					powerCurve,
				}) as Workout
			}
			return null
		}
	})
}
