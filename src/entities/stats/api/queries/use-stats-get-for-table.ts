import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_STATS_FOR_TABLE, StatsApiParam} from '@/entities/stats'
import {StatApi} from '@/entities/stats/api/stat-api.ts'

export function useStatsGetForTable(enabled: boolean, params: StatsApiParam) {
	const {isPending, isError, isLoading, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_STATS_FOR_TABLE, params, enabled],
		queryFn: () => StatApi.getForTable(params),
		enabled
	})
	return {isPending, isError, isLoading, data, error, refetch}
}
