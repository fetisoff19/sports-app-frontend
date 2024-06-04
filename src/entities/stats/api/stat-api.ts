import api from '@/shared/api'
import {ChartStats, SportStats, StatsApiParam, TableStats} from '@/entities/stats'

const PATH = 'stats'

export class StatApi {
	
	static async getMain(params?: { withDates: boolean }): Promise<SportStats[]> {
		return api.get(`${PATH}/main`, {params})
	}
	
	static async getForTable(params: StatsApiParam): Promise<TableStats> {
		return api.get(`${PATH}/table`, {params})
	}
	
	static async getForCharts(params: StatsApiParam): Promise<{ workouts: ChartStats[], start: string, end: string }> {
		return api.get(`${PATH}/chart`, {params})
	}
	
	static async getPowerCurve(
		params: Omit<StatsApiParam, 'sport'>
	): Promise<{ powerCurve: Record<string, number>, start: string, end: string }> {
		return api.get(`${PATH}/power-curve`, {params})
	}
	
}
