import {getHourMinSec, getMinSec, roundToN} from '../value-converter.ts'

export const prepareValues: Record<string, (v: number | null | undefined) => string> = {
	hr: v => roundToN(v, 0),
	'max_heart_rate': v => roundToN(v, 0),
	'avg_heart_rate': v => roundToN(v, 0),
	
	time: getHourMinSec,
	ts: getHourMinSec,
	'avg_elapsed_time': getHourMinSec,
	'avg_timer_time': getHourMinSec,
	'total_timer_time': getHourMinSec,
	'total_elapsed_time': getHourMinSec,
	'start_time': getHourMinSec,
	'end_time': getHourMinSec,
	
	elevation: v => roundToN(v, 0),
	'total_ascent': v => roundToN(v, 0),
	'total_descent': v => roundToN(v, 0),
	'max_altitude': v => roundToN(v, 0),
	'min_altitude': v => roundToN(v, 0),
	'avg_altitude': v => roundToN(v, 0),
	a: v => roundToN(v, 0),
	'avg_power': v => roundToN(v, 0),
	'power': v => roundToN(v, 0),
	p: v => roundToN(v, 0),
	'max_power': v => roundToN(v, 0),
	'normalized_power': v => roundToN(v, 0),
	
	'enhanced_avg_speed': getMinSec,
	'enhanced_max_speed': getMinSec,
	'enhanced_speed': getMinSec,
	pace: getMinSec,
	
	distance: roundToN,
	d: roundToN,
	total_distance: roundToN,
	'avg_distance': roundToN,
	
	
	'avg_speed': v => roundToN(v, 1),
	s: v => roundToN(v, 1),
	speed: v => roundToN(v, 1),
	
	'max_speed': v => roundToN(v, 1),
	
	'avg_cadence': v => roundToN(v, 0),
	'max_cadence': v => roundToN(v, 0),
	'cadence': v => roundToN(v, 0),
	c: v => roundToN(v, 0),
	'avg_calories': v => roundToN(v, 0),
	'total_calories': v => roundToN(v, 0),
	
	'max_temperature': v => roundToN(v, 1),
	'avg_temperature': v => roundToN(v, 1),
}
