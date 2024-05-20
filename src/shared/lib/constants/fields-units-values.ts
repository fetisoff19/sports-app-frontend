import {getHourMinSec} from '../helpers'

export const units = {
	distance: 'km',
	time: '',
	elevation: 'm',
	hr: 'bpm',
}

export const prepareValues = {
	distance: (a: number | null) => a || 0,
	time: getHourMinSec,
	elevation: Math.round,
	hr: Math.round,
}

export const fieldsForCard = {
	distance: 'distance',
	time: 'duration',
	elevation: 'elevation',
	hr: 'heart rate',
}

export const orderValues = [
	'distance',
	'time',
	'elevation',
	'hr',
] as const
