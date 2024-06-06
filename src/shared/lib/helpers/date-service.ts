import {DateValueCount} from '@/shared/types'
import dayjs from 'dayjs'


export class DateService {
	public static getDateValueCountArray(start: string, end: string): DateValueCount[] {
		const firstDay = dayjs(start)
		const lastDay = dayjs(end)
		const days = lastDay.diff(start, 'day')
		const year = firstDay.year()
		const month = firstDay.month()
		
		if (days > 750) {
			return this.more750Days(firstDay, days, year)
		}
		if (days > 180) {
			return this.daysOver180(firstDay, month, days)
		}
		if (days > 28) {
			return this.more28Days(firstDay, days)
		} else return this.less28days(firstDay, days)
	}
	
	
	private static more750Days(firstDay: dayjs.Dayjs, days: number, year: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i < days / 365; i++) {
			const date = i === 0
				? firstDay
				: dayjs().year(year + i)
			result.push({date: date.valueOf(), value: 0, counter: 0})
		}
		return result
	}
	
	private static daysOver180(firstDay: dayjs.Dayjs, month: number, days: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i < days / 30.4; i++) {
			const date = firstDay.month(month + i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
	private static more28Days(firstDay: dayjs.Dayjs, days: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i < days / 7; i++) {
			const date = firstDay.day(i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
	private static less28days(firstDay: dayjs.Dayjs, days: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i < days; i++) {
			const date = firstDay.day(i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
}
