import {useInfiniteQuery} from '@tanstack/react-query'
import {QUERY_KEY_SOME_WORKOUTS, WorkoutApiParam} from '@/entities/workout'
import {WorkoutApi} from '@/entities/workout/api/workout-api'
import {QueryLimit} from '@/shared/lib'

export function useWorkoutGetSome(type: 'OVERVIEW' | 'WORKOUTS', params: Omit<WorkoutApiParam, 'limit' | 'offset'>) {
	const {
		data,
		refetch,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isFetching,
		isLoading,
	} = useInfiniteQuery({
			queryKey: [QUERY_KEY_SOME_WORKOUTS, type, params],
			queryFn: ({pageParam}) =>
				WorkoutApi.getSome({
					limit: QueryLimit,
					offset: pageParam * QueryLimit,
					...params,
				}),
			initialPageParam: 0,
			refetchOnWindowFocus: false,
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
