import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_STATS_FOR_CHARTS, StatsApiParam} from '@/entities/stats'
import {StatApi} from '@/entities/stats/api/stat-api.ts'

export function useStatsGetForCharts(enabled: boolean, params: StatsApiParam) {
	const {isPending, isError, isLoading, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_STATS_FOR_CHARTS, params, enabled],
		queryFn: () => StatApi.getForCharts(params),
		enabled,
	})
	return {isPending, isError, isLoading, data, error, refetch}
}
