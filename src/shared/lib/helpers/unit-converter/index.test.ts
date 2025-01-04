import {describe, expect, it} from 'vitest'
import {prepareValues} from '@/shared/lib'

type TestData = {
	input: string,
	output: string | undefined
}

describe.each([
	{
		input: prepareValues['hr'](-1),
		output: '-1'
	},
	{
		input: prepareValues['hr'](null),
		output: '0'
	},
	{
		input: prepareValues['hr'](undefined),
		output: '0'
	},
	{
		input: prepareValues['hr'](0),
		output: '0'
	},
	{
		input: prepareValues['hr'](149.74932723),
		output: '150'
	},
	{
		input: prepareValues['hr'](150.74932723),
		output: '151'
	},
])('prepareValues[hr] roundToN fn', ({input, output}: TestData) => {
	it(`input: ${input} => output: ${output}`, () => {
		expect(input).toEqual(output)
	})
})


describe.each([
	{
		input: prepareValues?.['wrong_key']?.(14),
		output: undefined
	},
	{
		input: prepareValues?.[0]?.(14),
		output: undefined
	},
	{
		input: prepareValues?.[undefined as unknown as string]?.(14),
		output: undefined
	},
	{
		input: prepareValues?.[null as unknown as string]?.(14),
		output: undefined
	},
])('prepareValues[wrong_key]', ({input, output}: TestData) => {
	it(`input: ${input} => output: ${output}`, () => {
		expect(input).toEqual(output)
	})
})

describe.each([
	{
		input: prepareValues['avg_elapsed_time'](null),
		output: '0'
	},
	{
		input: prepareValues['avg_elapsed_time'](0),
		output: '0'
	},
	{
		input: prepareValues['avg_elapsed_time'](undefined),
		output: '0'
	},
	{
		input: prepareValues['avg_elapsed_time'](new Date(2023, 10, 12, 0, 11, 19, 298).getTime()),
		output: '00:11:19'
	},
	{
		input: prepareValues['avg_elapsed_time'](new Date(2023, 10, 12, 23, 11, 19, 298).getTime()),
		output: '23:11:19'
	},
	{
		input: prepareValues['avg_elapsed_time'](149.74932723),
		output: '02:30'
	},
	{
		input: prepareValues['avg_elapsed_time'](150.74932723),
		output: '02:31'
	},
])('prepareValues[avg_elapsed_time] getHourMinSec fn', ({input, output}: TestData) => {
	it(`input: ${input} => output: ${output}`, () => {
		expect(input).toEqual(output)
	})
})

describe.each([
	{
		input: prepareValues['enhanced_avg_speed'](null),
		output: '0'
	},
	{
		input: prepareValues['enhanced_avg_speed'](0),
		output: '0'
	},
	{
		input: prepareValues['enhanced_avg_speed'](undefined),
		output: '0'
	},
	{
		input: prepareValues['enhanced_avg_speed'](3.3333),
		output: '3:20'
	},
	{
		input: prepareValues['enhanced_avg_speed'](49.74932723),
		output: '49:45'
	},
	{
		input: prepareValues['enhanced_avg_speed'](150.74932723),
		output: '150:45'
	},
])('prepareValues[avg_elapsed_time] getMinSec fn', ({input, output}: TestData) => {
	it(`input: ${input} => output: ${output}`, () => {
		expect(input).toEqual(output)
	})
})
