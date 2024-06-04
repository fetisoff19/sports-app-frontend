import {getHourMinSec, getMinSec, RoundToN} from '../helpers'
import {WorkoutItem} from '@/entities/workout'

export const units: Record<string, string> = {
	distance: 'km',
	d: 'km',
	time: '',
	ts: '',
	elevation: 'm',
	a: 'm',
	hr: 'bpm',
	count: '',
	'total_distance': 'km',
	'total_timer_time': '',
	'total_elapsed_time': '',
	'total_ascent': 'm',
	'avg_altitude': 'm',
	'total_calories': '',
	'avg_heart_rate': 'bpm',
	'avg_power': 'w',
	'power_curve': 'w',
	'enhanced_avg_speed': 'min/km',
	'enhanced_max_speed': 'min/km',
	'enhanced_speed': 'min/km',
	'pace': 'min/km',
	'avg_distance': 'km',
	'avg_elapsed_time': '',
	'avg_timer_time': '',
	start_time: '',
	end_time: '',
	'avg_speed': 'km/h',
	's': 'km/h',
	'avg_cadence': '',
	'c': '',
	'max_heart_rate': 'bpm',
	'cadence': '',
	'speed': 'km/h',
	'power': 'w',
	p: 'w',
	'temperature': '°C',
}

export const sportNames: Record<string, string> = {
	all: 'All Sports',
	running: 'Running',
	cycling: 'Cycling',
	training: 'Training',
	walking: 'Walking',
	hiking: 'Hiking',
	other: 'Other',
}


export const sortParams = [
	'date',
	'distance',
	'time',
	'elevation',
	'speed',
	'enhanced_speed',
	'hr',
	'power',
	'cadence',
]

export const QueryLimit = 10


export const curDate = new Date().getTime()
export const day = 24 * 3600 * 1000


export const sports = [
	'all',
	'running',
	'cycling',
	'training',
	'walking',
	'hiking',
	'other',
]


export const prepareValues: Record<string, (v: number | null) => string | number | null> = {
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


export const paramNames: Record<string, string> = {
	date: 'Date',
	hr: 'Heart Rate',
	'heart_rate': 'Heart Rate',
	// 'max_heart_rate': 'Max',
	// 'avg_heart_rate': 'Avg',
	distance: 'Distance',
	'd': 'Distance',
	elevation: 'Elevation',
	'a': 'Altitude',
	time: 'Duration',
	'ts': 'Time',
	speed: 'Speed',
	pace: 'Pace',
	's': 'Speed',
	power: 'Power',
	'p': 'Power',
	cadence: 'Cadence',
	'c': 'Cadence',
	
	uuid: 'Workouts',
	other: 'Other',
	'total_distance': 'Total Distance',
	'total_timer_time': 'Total Duration',
	'total_elapsed_time': 'Total Spend Time',
	'total_ascent': 'Total Ascent',
	'total_calories': 'Total Calories',
	'avg_heart_rate': 'Average Heart Rate',
	'avg_power': 'Average Power',
	'enhanced_avg_speed': 'Average Pace',
	'enhanced_speed': 'Pace',
	'avg_distance': 'Average Distance',
	'avg_elapsed_time': 'Average Motion Time',
	'avg_timer_time': 'Average Timer Time',
	'avg_speed': 'Average Speed',
	'avg_cadence': 'Average Cadence',
	'avg_calories': 'Average Calories',
	'max_heart_rate': 'Max Heart Rate',
	count: 'Workouts',
	'power_curve': 'Power Curve',
	'temperature': 'Temperature',
}

export const orderItemValues = [
	'distance',
	'time',
	'elevation',
	'hr',
]

export const orderCyclingValues = [
	// 'totalDistance',
	// 'totalTimerTime',
	// 'totalAscent',
	// 'avgHeartRate',
	// 'avgPower',
	// 'avgSpeed'
	'total_distance',
	'total_timer_time',
	'total_ascent',
	'avg_heart_rate',
	'avg_power',
	'avg_speed'
] as const

export const orderRunningValues = [
	// 'totalDistance',
	// 'totalTimerTime',
	// 'totalAscent',
	// 'avgHeartRate',
	// 'enhancedAvgSpeed',
	// 'avgCadence'
	'total_distance',
	'total_timer_time',
	'total_ascent',
	'avg_heart_rate',
	'enhanced_avg_speed',
	'avg_cadence'
] as const


export const mockWorkout: WorkoutItem = ({
	uuid: 'asdasasdasd',
	distance: 50,
	time: 5282452525,
	enhanced_speed: 5,
	elevation: 1250,
	speed: 5282452525,
	hr: 125,
	power: 500,
	cadence: 120,
	name: 'asdddddddadddddadddd',
	sport: 'running',
	note: 'asdddddddasdasdasdassaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddadddd',
	date: new Date(),
	map: null,
})
