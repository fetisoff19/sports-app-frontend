import {ChartStats} from '@/entities/stats'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {ButtonFieldsForStats, chartsBaseOptions, paramNames, sports, units} from '@/shared/lib'
import {DateService} from '@/shared/lib/'
import {DateValueCount} from '@/shared/types'
import {Dropdown} from '@/shared/ui'
import dayjs from 'dayjs'
import {prepareValues} from '@/shared/lib/helpers'

type Props = {
	data: { workouts: ChartStats[], start: string, end: string } | undefined
	param: keyof ChartStats | 'power_curve'
	setParam: Dispatch<SetStateAction<keyof ChartStats | 'power_curve'>>
	powerCurve: { powerCurve: Record<string, number>, start: string, end: string } | undefined
	sport: typeof sports[number]
}

export const StatsCharts = ({data, param, setParam, powerCurve, sport}: Props) => {
	const [points, setPoints] = useState<[number, number][]>([])
	
	useEffect(() => {
		if (data && param !== 'power_curve') {
			const period: DateValueCount[] = DateService.getDateValueCountArray(data.start, data.end)
			
			for (const workout of data.workouts) {
				const last = period.findLast((elem: DateValueCount) => elem.date <= dayjs(workout.date).valueOf())
				if ((Number(workout?.[param]) > 0 || param === 'uuid') && last) {
					const value = param === 'uuid' ? 1 : Number(workout?.[param])
					switch (param) {
						case 'max_heart_rate':
							last.value = Math.max(last.value, value)
							break
						case 'enhanced_avg_speed':
							if (workout.cadence_coef === 2) {
								last.value += value
								last.counter++
							}
							break
						case 'avg_speed':
							if (workout.cadence_coef === 1) {
								last.value += value
								last.counter++
							}
							break
						default:
							last.value += value
							last.counter++
							break
					}
				}
			}
			
			const dataForChart: [number, number][] = period.map(elem => {
				if (param === 'uuid') {
					return [elem.date, elem.counter]
				}
				if (param.includes('avg') && elem.counter > 1) {
					return [elem.date, elem.value / elem.counter]
				}
				return [elem.date, elem.value]
			})
			
			setPoints(() => dataForChart)
		}
	}, [data, param])
	
	useEffect(() => {
		if (powerCurve && param === 'power_curve') {
			const dataForChart: [number, number][] = []
			for (const key in powerCurve.powerCurve) {
				dataForChart.push([Number(key), powerCurve.powerCurve[key]])
			}
			setPoints(() => dataForChart)
		}
	}, [powerCurve, param])
	
	
	const filteredButtonFields = () => {
		if (sport === 'all') {
			return ButtonFieldsForStats.filter((item) => !item.includes('power') && !item.includes('speed'))
		}
		if (sport !== 'cycling') {
			return ButtonFieldsForStats.filter((item) => !item.includes('power') && item !== 'avg_speed')
		}
		if (sport === 'cycling') {
			return ButtonFieldsForStats.filter((item) => item !== 'enhanced_avg_speed')
		}
		return []
	}
	
	const buttons = filteredButtonFields().map((item, index) => {
		return <button className={
			`inline-block w-full btn rounded-xl text-left hover:text-white ${param === item ? 'text-white' : 'btn-ghost'}`
		} key={index} onClick={() => setParam(() => item as keyof ChartStats)}>{paramNames[item]}</button>
	})
	
	const chartOptions: Highcharts.Options = {
		...chartsBaseOptions,
		series: [{data: points, type: powerCurve && param === 'power_curve' ? 'areaspline' : 'column', color: '#0989dc'}],
		xAxis: {
			...chartsBaseOptions.xAxis,
			type: powerCurve && param === 'power_curve' ? 'linear' : 'datetime',
			labels: {
				style: {
					color: '#9A9FA3'
				},
				formatter: powerCurve && param === 'power_curve' ?
					function (): string {
						const value = Number(this.value)
						return value < 60 ? this.value.toString() : prepareValues.ts(value)
					} : undefined,
			},
		},
		chart: {
			...chartsBaseOptions.chart,
			type: 'column',
		},
		tooltip: {
			...chartsBaseOptions.tooltip,
			formatter: function () {
				if (powerCurve && param === 'power_curve') {
					const x = Number(this.x)
					const timestamp = x < 60 ? (this.x + ' c') : prepareValues.ts(x)
					const value = (prepareValues?.[param] && this.y ? prepareValues?.[param](this.y) : this.y)
					const unit = units?.[param] || ''
					return `<span class='text-white text-sm' >${value} ${unit}, ${timestamp}</span>`
				}
				const value = (prepareValues?.[param] && this.y ? prepareValues?.[param](this.y) : this.y)
				const unit = units?.[param] || ''
				return `<span class='text-white text-sm' >${value} ${unit}</span>`
			},
		},
	}
	
	if (data?.workouts.length === 0) {
		return <div className="flex justify-center items-center h-20 text-lg">
			There's no data available for your selection
		</div>
	}
	
	
	return (
		<div className="md:flex flex-row gap-4 md:gap-8 justify-between grid grid-cols-1">
			<div className="hidden flex-col w-44 lg:w-52 md:flex">
				{buttons}
			</div>
			<Dropdown valueList={filteredButtonFields()} setValue={setParam as Dispatch<SetStateAction<string>>}
			          value={param} style={'block md:hidden'} fields={paramNames}/>
			<div className="flex-1 p-4 bg-base-100 rounded-2xl h-[482px] shadow-xl">
				<HighchartsReact highcharts={Highcharts} options={chartOptions}/>
			</div>
		</div>
	)
}
