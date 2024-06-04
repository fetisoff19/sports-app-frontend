import {useQuery} from '@tanstack/react-query'
import {QUERY_KEY_STATS_POWER_CURVE, StatsApiParam} from '@/entities/stats'
import {StatApi} from '@/entities/stats/api/stat-api.ts'

export function useStatsGetPowerCurve(enabled: boolean, params: Omit<StatsApiParam, 'sport'>) {
	const {isPending, isError, isLoading, data, error, refetch} = useQuery({
		queryKey: [QUERY_KEY_STATS_POWER_CURVE, params, enabled],
		queryFn: () => StatApi.getPowerCurve(params),
		enabled,
	})
	return {isPending, isError, isLoading, data, error, refetch}
}
