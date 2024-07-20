import {getHourMinSec, getMinSec, RoundToN} from './value-converter.ts'

export const prepareValues: Record<string, (v: number | null) => string> = {
	hr: (v: number | null) => RoundToN(v, 0),
	'max_heart_rate': (v: number | null) => RoundToN(v, 0),
	'avg_heart_rate': (v: number | null) => RoundToN(v, 0),
	
	time: getHourMinSec,
	ts: getHourMinSec,
	'avg_elapsed_time': getHourMinSec,
	'avg_timer_time': getHourMinSec,
	'total_timer_time': getHourMinSec,
	'total_elapsed_time': getHourMinSec,
	'start_time': getHourMinSec,
	'end_time': getHourMinSec,
	
	elevation: (v: number | null) => RoundToN(v, 0),
	'total_ascent': (v: number | null) => RoundToN(v, 0),
	'total_descent': (v: number | null) => RoundToN(v, 0),
	'max_altitude': (v: number | null) => RoundToN(v, 0),
	'min_altitude': (v: number | null) => RoundToN(v, 0),
	'avg_altitude': (v: number | null) => RoundToN(v, 0),
	a: (v: number | null) => RoundToN(v, 0),
	'avg_power': (v: number | null) => RoundToN(v, 0),
	'power': (v: number | null) => RoundToN(v, 0),
	p: (v: number | null) => RoundToN(v, 0),
	'max_power': (v: number | null) => RoundToN(v, 0),
	'normalized_power': (v: number | null) => RoundToN(v, 0),
	
	'enhanced_avg_speed': getMinSec,
	'enhanced_max_speed': getMinSec,
	'enhanced_speed': getMinSec,
	pace: getMinSec,
	
	distance: RoundToN,
	d: RoundToN,
	total_distance: RoundToN,
	'avg_distance': RoundToN,
	
	
	'avg_speed': (v: number | null) => RoundToN(v, 1),
	s: (v: number | null) => RoundToN(v, 1),
	speed: (v: number | null) => RoundToN(v, 1),
	
	'max_speed': (v: number | null) => RoundToN(v, 1),
	
	'avg_cadence': (v: number | null) => RoundToN(v, 0),
	'max_cadence': (v: number | null) => RoundToN(v, 0),
	'cadence': (v: number | null) => RoundToN(v, 0),
	c: (v: number | null) => RoundToN(v, 0),
	'avg_calories': (v: number | null) => RoundToN(v, 0),
	'total_calories': (v: number | null) => RoundToN(v, 0),
	
	'max_temperature': (v: number | null) => RoundToN(v, 1),
	'avg_temperature': (v: number | null) => RoundToN(v, 1),
	
}
