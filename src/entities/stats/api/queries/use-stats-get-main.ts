import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_STATS_MAIN} from '@/entities/stats'
import {StatApi} from '@/entities/stats/api/stat-api.ts'

export function useStatsGetMain(params?: { withDates: boolean }) {
	const {isPending, isFetching, isError, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_STATS_MAIN, params],
		queryFn: () => StatApi.getMain(params),
		enabled: true,
		staleTime: 3600 * 1000,
	})
	return {isPending, isFetching, isError, data, error, refetch}
}
