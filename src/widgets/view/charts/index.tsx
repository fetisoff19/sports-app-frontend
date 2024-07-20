import {ChartPoint, Workout} from '@/entities/workout'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import {chartsBaseOptions, prepareValues, units, useDesktopDetection} from '@/shared/lib'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {
	avgCyclingKeys,
	avgRunningKeys,
	baseSeries,
	maxKeys,
	minKeys,
	powerCurveOption
} from '@/widgets/view/charts/lib/constants.ts'
import {DistanceIcon, TimeIcon} from '@/shared/svg'
import {LiveStats} from '@/widgets/stats/charts/ui/live-stats.tsx'
import {ChartData} from '@/shared/types'

type Props = {
	data: Workout,
	setIndex: Dispatch<SetStateAction<number>>
}
export const Charts = ({data, setIndex}: Props) => {
	const [options, setOptions] = useState<Highcharts.Options | null>(null)
	const [type, setType] = useState<boolean>(true)
	const [isNewType, setNewType] = useState<boolean>(false)
	const [value, setValue] = useState<number>(0)
	const [chartNames, setChartNames] = useState<string[]>([])
	const isDesktop = useDesktopDetection()
	
	useEffect(() => {
		setNewType(prev => !prev)
		setTimeout(() => setNewType(prev => !prev), 50)
	}, [type])
	
	useEffect(() => {
		if (data?.chartData?.points.length) {
			const compressionCoef =
				!isDesktop && data.chartData.points.length > 600 ? Math.round(data.chartData?.points.length / 600) :
					1
			const charts: ChartData = {
				p: {points: [], min: 0, max: 0, avg: 0},
				s: {points: [], min: 0, max: 0, avg: 0},
				hr: {points: [], min: 0, max: 0, avg: 0},
				c: {points: [], min: 0, max: 0, avg: 0},
				a: {points: [], min: 0, max: 0, avg: 0},
			}
			
			const initialSeries = structuredClone(baseSeries)
			const baseXAxis: Highcharts.XAxisOptions = {
				...chartsBaseOptions.xAxis,
				labels: {
					style: {
						color: '#9A9FA3'
					},
					formatter:
						function () {
							if (type && data.chartData?.points?.at(-1)?.d) {
								return this.value + ' km'
							}
							const value = Number(this.value)
							return value < 60 ? this.value.toString() : prepareValues.ts(value)
						}
				},
			}
			
			const indicator: 'd' | 'ts' = type && data.chartData.points?.at(-1)?.d ? 'd' : 'ts'
			data.chartData.points.forEach((item: ChartPoint, index) => {
				if (!(index % compressionCoef)) {
					data.session.enhanced_avg_speed && item?.[indicator] && item.s !== null && charts.s.points.push([item[indicator], item.s])
					data.session.avg_power && item?.[indicator] && item.p !== null && charts.p.points.push([item[indicator], item.p])
					data.session.avg_heart_rate && item?.[indicator] && item.hr !== null && charts.hr.points.push([item[indicator], item.hr])
					data.session.avg_cadence && item?.[indicator] && item.c !== null && charts.c.points.push([item[indicator], item.c])
					data.session.avg_altitude && item?.[indicator] && item.a !== null && charts.a.points.push([item[indicator], item.a])
				}
			})
			for (const key in charts) {
				if (charts[key].points.length) {
					const elem = initialSeries.find(item => item.name === key)
					elem?.data.push(...charts[key].points)
					setChartNames(prev => [...prev, key])
				}
			}
			if (data.chartData.points?.at(-1)?.d) {
				setChartNames(prev => [...prev, 'd'])
				
			}
			const series = initialSeries
				.filter(item => item.data.length)
				.map((item, index) =>
					({
						...item,
						xAxis: index,
						yAxis: index,
						type: item.name === 's' && data.session.cadence_coef === 2 ? 'spline' : 'areaspline',
						lineWidth: 3,
					}))
			
			const xAxis = Array(series.length)
				.fill({...baseXAxis, offset: 0, crosshair: {width: 1}})
				.map((item, index, array) =>
					index === array.length - 1 ? ({...item, linkedTo: 0, opposite: true}) : index ? ({
						...item,
						linkedTo: 0
					}) : item)
			
			const yAxis = Array(series.length)
				.fill({offset: 0, title: {text: undefined}, labels: {enabled: false}})
				.map((item, index, array) => {
					const name = series[index].name
					const height = (1 / array.length) * 100
					const min = (data.session?.[minKeys[name]] as number) * 0.9 || undefined
					const max = (data.session?.[maxKeys[name]] as number) * 1.1 || undefined
					const avgKeys = data.session.cadence_coef === 2 ? avgRunningKeys : avgCyclingKeys
					const avg = data.session?.[avgKeys[name]] as number | undefined
					const plotLines = avg ? [{
						color: '#ffffff',
						width: 1,
						value: avg || null,
						dashStyle: 'Dash',
						label: {
							text: `${prepareValues[avgKeys[name]](avg)} ${units[avgKeys[name]]}`,
							align: 'left',
							x: 5,
							y: -8,
							style: {
								fontWeight: 'bold',
								color: '#ffffff',
								textShadow: '#2a303c 0 0 5px'
							}
						},
						zIndex: 4
					}] : undefined
					const reversed = name === 's' && data.session.cadence_coef === 2
					return ({
						...item,
						height: `${height}%`,
						top: `${height * index}%`,
						min,
						max,
						plotLines,
						reversed,
						gridLineColor: '#5b5d5e'
					})
				})
			
			setOptions(() => ({
				...chartsBaseOptions,
				chart: {
					...chartsBaseOptions.chart,
					height: series.length * 150,
				},
				tooltip: {
					shared: true,
					enabled: false,
				},
				series,
				xAxis,
				yAxis,
				plotOptions: {
					series: {
						states: {
							hover: {
								animation: false,
								lineWidthPlus: 0,
							},
							inactive: {
								enabled: false
							}
						},
						point: {
							events: {
								mouseOver: function () {
									setIndex(() => (this.index * compressionCoef / (data?.chartData?.points?.length as number)))
									setValue(() => this.x)
								},
							}
						},
					}
				},
			}) as Highcharts.Options)
		}
	}, [data, isDesktop, setIndex, type])
	
	function changeType() {
		setType(prev => !prev)
		Highcharts?.charts?.find(item => item?.xAxis?.[0])?.zoomOut()
	}
	
	return (
		<div className="w-full">
			<div
				className="flex flex-col gap-8 pb-20 sm:pb-12 xl:pb-0 sticky top-16 sm:static bg-base-100 z-10 bg-opacity-80">
				<div className="flex flex-row justify-between h-12 w-full">
					<div className="xl:flex xl:flex-row grid sm:grid-cols-4 grid-cols-3 sm:gap-2 flex-1 p-2">
						<LiveStats points={data?.chartData?.points} type={type} value={value}
						           coef={data.session.cadence_coef} chartNames={chartNames}/>
					</div>
					{!!data?.chartData?.points?.at(-1)?.d && <label className="swap btn btn-ghost btn-circle group">
            <input type="checkbox" onChange={changeType}/>
						{type ? <TimeIcon/> : <DistanceIcon/>}
          </label>}
				</div>
			</div>
			<div className="flex flex-col w-full h-full charts">
				{options && <HighchartsReact highcharts={Highcharts} allowChartUpdate={isNewType} options={options}/>}
			</div>
			{!!data?.powerCurve?.length &&
        <HighchartsReact highcharts={Highcharts} allowChartUpdate={false} options={{
					...powerCurveOption,
					series: [{data: data.powerCurve, type: 'areaspline', color: '#ffffff', name: 'pc'}],
				}}/>}
		</div>
	)
}
