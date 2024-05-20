import {useInfiniteQuery} from '@tanstack/react-query'
import {QUERY_KEY_WORKOUTS} from '@/entities/workout'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QueryLimit} from '@/shared/api'

export function useWorkoutGet(type: 'OVERVIEW' | "WORKOUTS", params?: Record<string, unknown>) {
	const {
		data,
		refetch,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isFetching,
		isLoading,
	} = useInfiniteQuery({
			queryKey: [QUERY_KEY_WORKOUTS, type, params],
			queryFn: ({pageParam}) =>
				WorkoutApi.getMany({
					limit: QueryLimit,
					offset: pageParam * QueryLimit,
					...params,
				}),
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) =>
				lastPage?.length ? allPages.length : undefined
		},
	)

	const isShowingLoader = isFetching || isLoading || (hasNextPage && isFetchingNextPage)

	return {
		data,
		refetch,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isFetching,
		isLoading,
		isShowingLoader
	}
}
