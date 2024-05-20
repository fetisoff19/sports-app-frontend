import {RefObject} from 'react'

export function getMinSec(minutes: number) {
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
export const convertSpeed = (value: number) => +(value * 3.6).toFixed(1)
export const convertPace = (value: number) =>
	getMinSec(Number((60 / (3.6 * value)).toFixed(2)))
export const convertSpeedToPace = (value: number) =>
	Math.floor(value) + ',' + ((value - Math.floor(value)) * 60).toFixed()
export const convertPaceInMinute = (value: number) =>
	+(60 / (3.6 * value)).toFixed(2)
export const doubleValue = (value: number) => Math.round(value * 2)
export const convertDistance = (value: number) =>
	(value / 1000).toFixed(2).replaceAll('.', ',')

export function getHourMinSec(timestamp: Date | string | number) {
	if (
		typeof timestamp === 'object' ||
		(typeof timestamp === 'number' && timestamp > 10 ** 6)
	) {
		return new Date(timestamp).toLocaleTimeString('it-IT')
	} else if (typeof timestamp === 'number') {
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
	} else return timestamp
}

export function findDeepParentNode(
	e: any,
	current: RefObject<HTMLElement>,
	equality: boolean,
) {
	if (!equality) {
		if (
			e.target !== current.current &&
			e.target.parentNode !== current.current &&
			e.target.parentNode.parentNode !== current.current &&
			e.target.parentNode.parentNode.parentNode !== current.current
		) {
			return true
		}
	}
	if (equality) {
		if (
			e.target === current.current ||
			e.target.parentNode === current.current ||
			e.target.parentNode.parentNode === current.current ||
			e.target.parentNode.parentNode.parentNode === current.current
		) {
			return true
		}
	}
	return false
}
