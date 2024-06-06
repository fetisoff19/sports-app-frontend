export * from './date-service.ts'

export function getMinSec(minutes: number | null) {
	if (!minutes) return 0
	const min = Math.floor(minutes)
	let sec: string | number = Math.round((minutes - min) * 60)
	if (sec === 0) sec = '00'
	else if (sec < 10) sec = '0' + sec
	return min + ':' + sec
}

export const firstCapitalLetter = (text?: string): string | undefined => {
	if (text?.length) {
		const [first, ...others] = text
		return [...first.toUpperCase(), ...others].join('').toString()
	}
}
export const dayInMs = 8.64 * 10 ** 7
export const convertSpeed = (value: number) => Number((value * 3.6).toFixed(1))
export const convertPace = (value: number) =>
	getMinSec(Number((60 / (3.6 * value)).toFixed(2)))
export const convertSpeedToPace = (value: number) =>
	Math.floor(value) + ',' + ((value - Math.floor(value)) * 60).toFixed()
export const convertPaceInMinute = (value: number) =>
	+(60 / (3.6 * value)).toFixed(2)
export const doubleValue = (value: number) => Math.round(value * 2)
export const RoundToN = (value: number | null | string, n = 2) =>
	value ? Number(Number(value).toFixed(n)).toLocaleString('fr-Fr').replaceAll('.', ',') : 0

export function getHourMinSec(timestamp: Date | string | number | null) {
	if (!timestamp) return 0
	if (typeof timestamp === 'object' || typeof timestamp === 'string' || (timestamp > 10 ** 6)) {
		return new Date(timestamp).toLocaleTimeString('it-IT')
	} else {
		const hours = Math.floor(timestamp / 3600)
		const minutes = Math.floor(timestamp / 60) - hours * 60
		const seconds = Math.round(timestamp % 60)
		
		let formatted = ''
		if (hours) {
			formatted = [
				hours.toString(),
				minutes.toString().padStart(2, '0'),
				seconds.toString().padStart(2, '0'),
			].join(':')
		} else {
			formatted = [
				minutes.toString().padStart(2, '0'),
				seconds.toString().padStart(2, '0'),
			].join(':')
		}
		return formatted
	}
}
