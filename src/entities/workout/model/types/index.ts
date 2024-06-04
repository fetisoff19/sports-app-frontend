import {sortParams, sports} from '@/shared/lib'
import {LatLngExpression} from 'leaflet'

export type WorkoutItem = {
	uuid: string
	distance: number | null
	time: number | null
	elevation: number | null
	speed: number | null
	enhanced_speed: number | null
	hr: number | null
	power: number | null
	cadence: number | null
	name: string
	sport: string
	note: string
	date: Date
	map: string | null,
	
}

export type Session = {
	start_time: Date
	end_time: Date
	
	time_step: number
	smoothing: number
	total_elapsed_time?: number
	
	total_timer_time: number
	total_distance: number
	total_work?: number
	total_strides?: number
	
	enhanced_avg_speed?: number
	enhanced_max_speed?: number
	avg_speed?: number
	max_speed?: number
	
	avg_heart_rate?: number
	max_heart_rate?: number
	min_heart_rate?: number
	
	cadence_coef?: number
	avg_cadence?: number
	max_cadence?: number
	avg_temperature?: number
	max_temperature?: number
	
	enhanced_max_altitude?: number
	enhanced_min_altitude?: number
	max_altitude?: number
	avg_altitude?: number
	min_altitude?: number
	total_ascent?: number
	total_descent?: number
	
	avg_power?: number
	max_power?: number
	normalized_power?: number
	left_right_balance?: number
	avg_left_torque_effectiveness?: number
	avg_right_torque_effectiveness?: number
	avg_left_pedal_smoothness?: number
	avg_right_pedal_smoothness?: number
	
	total_calories?: number
	training_stress_score?: number
}

export type WorkoutFromDb = {
	uuid: string
	name: string
	sport: string
	note: string | null
	device: string
	date: Date
	session: Session | null
	polyline: {
		points: string
		array_length: number
		orig_length: number
	} | null
	powerCurve: Record<string, number | string | null | Date> | null
	chartData: {
		array_length: number
		orig_length: number
		points: string
	} | null
}

export type Workout = {
	uuid: string
	name: string
	sport: string
	note: string | null
	device: string
	date: Date
	session: Session
	polyline: {
		points: LatLngExpression[]
		array_length: number
		orig_length: number
	} | null
	powerCurve: Point[] | null
	chartData: {
		array_length: number
		orig_length: number
		points: ChartPoint[]
	} | null
}

export type ChartPoint = {
	ts: number | null
	d: number | null
	s: number | null
	hr: number | null
	p: number | null
	c: number | null
	a: number | null
}

export type Point = [unknown, number]


export type WorkoutApiParam = {
	name: string
	limit: number
	offset: number
	direction?: 'DESC' | 'ASC'
	sport?: typeof sports[number]
	param?: typeof sortParams[number]
}
