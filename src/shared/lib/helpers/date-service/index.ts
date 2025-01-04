import {DateValueCount} from '@/shared/types'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

export class DateService {
	
	public static getDateValueCountArray(start: string, end: string): DateValueCount[] {
		const firstDay = dayjs(start)
		const lastDay = dayjs(end)
		const days = lastDay.diff(start, 'day')
		const year = firstDay.year()
		const month = firstDay.month()
		const startWeek = firstDay.week()
		const endWeek = lastDay.week()
		
		if (days > 750) {
			return this.moreThan750(firstDay, days, year)
		}
		if (days > 180) {
			return this.moreThan180(firstDay, month, days)
		}
		if (days > 28) {
			return this.moreThan28(firstDay, startWeek, endWeek)
		}
		return this.lessThan28(firstDay, days)
	}
	
	
	private static moreThan750(firstDay: dayjs.Dayjs, days: number, year: number) {
		const millisecond = dayjs(firstDay).millisecond()
		const second = dayjs(firstDay).second()
		const minute = dayjs(firstDay).minute()
		const hour = dayjs(firstDay).hour()
		const result: DateValueCount[] = []
		for (let i = 0; i < days / 365; i++) {
			const date = i === 0
				? firstDay
				: dayjs()
					.year(year + i)
					.hour(hour)
					.minute(minute)
					.second(second)
					.millisecond(millisecond)
			result.push({date: date.valueOf(), value: 0, counter: 0})
		}
		return result
	}
	
	private static moreThan180(firstDay: dayjs.Dayjs, month: number, days: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i < days / 30.4; i++) {
			const date = firstDay.month(month + i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
	private static moreThan28(firstDay: dayjs.Dayjs, startWeek: number, endWeek: number) {
		const result: DateValueCount[] = []
		for (let i = startWeek; i < endWeek; i++) {
			const date = firstDay.week(i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
	private static lessThan28(firstDay: dayjs.Dayjs, days: number) {
		const result: DateValueCount[] = []
		for (let i = 0; i <= days; i++) {
			const date = firstDay.date(firstDay.date() + i).valueOf()
			result.push({date, value: 0, counter: 0})
		}
		return result
	}
	
}
