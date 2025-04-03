import {describe, expect, it} from 'vitest'
import {DateValueCount} from '@/shared/types'
import {DateService} from '@/shared/lib'

type TestData = {
	start: string,
	end: string
	output: DateValueCount[]
}

const currentDate = new Date

describe.each([
	{
		start: new Date('2025-01-10T16:30:00.000').toISOString(),
		end: new Date('2025-01-10T16:30:00.000').toISOString(),
		output: [
			{
				date: new Date(new Date('2025-01-10T16:30:00.000').toISOString()).getTime(),
				value: 0,
				counter: 0,
			}
		],
	},
	{
		start: new Date('2025-01-20T16:30:00.000').toISOString(),
		end: new Date('2025-01-23T16:30:00.000').toISOString(),
		output: [
			{
				date: new Date('2025-01-20T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-21T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-22T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-23T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			}
		]
	},
])('DateService.getDateValueCountArray.lessThan28', ({start, end, output}: TestData) => {
	it(`start: ${start}, end: ${end} => output.length: ${output.length}`, () => {
		expect(DateService.getDateValueCountArray(start, end)).toEqual(output)
	})
})

describe.each([
	{
		start: new Date('2025-01-10T16:30:00.000').toISOString(),
		end: new Date('2025-02-08T16:30:00.000').toISOString(),
		output: [
			{
				date: new Date('2025-01-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-17T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-24T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-01-31T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
		]
	},
])('DateService.getDateValueCountArray.moreThan28', ({start, end, output}: TestData) => {
	it(`start: ${start}, end: ${end} => output.length: ${output.length}`, () => {
		expect(DateService.getDateValueCountArray(start, end)).toEqual(output)
	})
})

describe.each([
	{
		start: new Date('2025-01-10T16:30:00.000').toISOString(),
		end: new Date('2025-07-10T16:30:00.000').toISOString(),
		output: [
			{
				date: new Date('2025-01-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-02-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-03-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-04-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-05-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date('2025-06-10T16:30:00.000').getTime(),
				value: 0,
				counter: 0,
			},
		]
	},
])('DateService.getDateValueCountArray.moreThan180', ({start, end, output}: TestData) => {
	it(`start: ${start}, end: ${end} => output.length: ${output.length}`, () => {
		expect(DateService.getDateValueCountArray(start, end)).toEqual(output)
	})
})


describe.each([
	{
		start: new Date(currentDate.setFullYear(2024)).toISOString(),
		end: new Date(currentDate.setFullYear(2027)).toISOString(),
		output: [
			{
				date: new Date(currentDate.setFullYear(2024)).getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date(currentDate.setFullYear(2025)).getTime(),
				value: 0,
				counter: 0,
			},
			{
				date: new Date(currentDate.setFullYear(2026)).getTime(),
				value: 0,
				counter: 0,
			}
		]
	},
])('DateService.getDateValueCountArray.moreThan750', ({start, end, output}: TestData) => {
	it(`start: ${start}, end: ${end} => output: ${[...output]}`, () => {
		expect(DateService.getDateValueCountArray(start, end)).toEqual(output)
	})
})

