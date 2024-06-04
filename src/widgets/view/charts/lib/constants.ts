import Highcharts from 'highcharts'
import {chartsBaseOptions, getHourMinSec, prepareValues, units} from '@/shared/lib'
import {Session} from '@/entities/workout'

export const baseSeries: {
	data: [null | number, number][],
	name: string,
	color?: string,
	yAxis?: number,
	xAxis?: number
}[] = [
	{data: [], color: '#FF7EB6', name: 'p',},
	{data: [], color: '#4ADE80FF', name: 's',},
	{data: [], color: '#ec3434', name: 'hr'},
	{data: [], color: '#0989dc', name: 'a'},
	{data: [], color: '#ffcd33', name: 'c'},
]

export const powerCurveOption: Highcharts.Options = {
	...chartsBaseOptions,
	xAxis: {
		...chartsBaseOptions.xAxis,
		labels: {
			style: {
				color: '#9A9FA3'
			},
			formatter:
				function () {
					return Number(this.value) < 60
						? this.value.toString()
						: getHourMinSec(Number(this.value)).toString()
				},
		},
	},
	chart: {
		...chartsBaseOptions.chart,
		height: 300,
		events: {
			load: function () {
				this.xAxis[0].setExtremes(1, 1200)
				this.showResetZoom()
			}
		},
	},
	tooltip: {
		...chartsBaseOptions.tooltip,
		formatter: function () {
			const x = Number(this.x)
			const timestamp = x < 60 ? (this.x + ' c') : getHourMinSec(x)
			const value = (this.y ? prepareValues['p'](this.y) : this.y)
			const unit = units['p']
			return `<span class='text-white text-sm' >${value} ${unit}, ${timestamp}</span>`
		}
	},
}

export const minKeys: Record<string, keyof Session> = {
	a: 'min_altitude',
}

export const maxKeys: Record<string, keyof Session> = {
	a: 'max_altitude',
	hr: 'max_heart_rate',
}


export const avgCyclingKeys: Record<string, keyof Session> = {
	p: 'avg_power',
	c: 'avg_cadence',
	a: 'avg_altitude',
	s: 'avg_speed',
	hr: 'avg_heart_rate',
}

export const avgRunningKeys: Record<string, keyof Session> = {
	p: 'avg_power',
	c: 'avg_cadence',
	a: 'avg_altitude',
	s: 'enhanced_avg_speed',
	hr: 'avg_heart_rate',
}

