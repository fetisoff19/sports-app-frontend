export function getMinSec(minutes: number | null | undefined): string {
	if (!minutes) return '0'
	const min = Math.floor(minutes)
	let sec: string | number = Math.round((minutes - min) * 60)
	if (sec === 0) sec = '00'
	else if (sec < 10) sec = '0' + sec
	return min + ':' + sec
}

export const roundToN = (value: number | null | string | undefined, n = 2): string =>
	value ? Number(Number(value).toFixed(n)).toLocaleString('fr-Fr').replaceAll('.', ',') : '0'

export function getHourMinSec(timestamp: Date | string | number | null | undefined): string {
	if (!timestamp) return '0'
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
