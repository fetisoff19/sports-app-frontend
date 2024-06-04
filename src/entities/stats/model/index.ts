export type SportStats = {
	sport: string
	count: number
	first: string
	last: string
}

export type TableStats = {
	total_distance: number
	total_timer_time: number
	total_elapsed_time: number
	total_ascent: number
	avg_heart_rate: number
	avg_power: number
	avg_tempo: number
	avg_distance: number
	avg_timer_time: number
	avg_elapsed_time: number
	enhanced_avg_speed: number
	avg_speed: number
	avg_cadence: number
	max_heart_rate: number
	count: number
}

export type ChartStats = {
	uuid: string
	name: string
	date: string
	sport: string
	total_distance: number
	total_timer_time: number
	total_elapsed_time: number
	total_ascent: number
	avg_heart_rate: number
	avg_power: number
	enhanced_avg_speed: number
	avg_timer_time: number
	avg_speed: number
	max_heart_rate: number
	total_calories: number
	avg_cadence: number
	avg_calories: number
	cadence_coef: 2 | 1,
}


export const QUERY_KEY_STATS_MAIN = 'STATS_MAIN'
export const QUERY_KEY_STATS_FOR_TABLE = 'STATS_FOR_TABLE'
export const QUERY_KEY_STATS_FOR_CHARTS = 'QUERY_KEY_STATS_FOR_CHARTS'
export const QUERY_KEY_STATS_POWER_CURVE = 'QUERY_KEY_STATS_POWER_CURVE'


export type StatsApiParam = {
	sport: string
	start: Date | null
	end: Date | null
}
