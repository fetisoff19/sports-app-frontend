import {useState} from 'react'
import {StatsCharts, StatsTable} from '@/widgets/stats'
import {AddFirstWorkout} from '@/features/add-first-workout'
import {StatsToolbar} from '@/features/stats-toolbar'
import {
	ChartStats,
	useStatsGetForCharts,
	useStatsGetForTable,
	useStatsGetMain,
	useStatsGetPowerCurve
} from '@/entities/stats'
import {curDate, day, sports} from '@/shared/lib'
import {DateRange} from '@/shared/types'


const Stats = () => {
	const [isTable, setIsTable] = useState<boolean>(false)
	const [sport, setSport] = useState<typeof sports[number]>('all')
	const [param, setParam] = useState<keyof ChartStats | 'power_curve'>('uuid')
	const [dates, setDates] = useState<DateRange>([new Date(curDate - (day * 365)), new Date(curDate)])
	
	const start = dates && Array.isArray(dates) ? dates?.[0] : null
	const end = dates && Array.isArray(dates) ? dates?.[1] : null
	
	const {data: tableData, isLoading: isTableLoading} =
		useStatsGetForTable(!!(isTable && start && end), {sport, start, end})
	const {data: chartData, isLoading: isChartLoading} =
		useStatsGetForCharts(!!(!isTable && start && end), {sport, start, end})
	const {data: powerCurve} = useStatsGetPowerCurve(!!(!isTable && start && end && param === 'power_curve'), {
		start,
		end
	})
	const {data: mainStats, isFetching} = useStatsGetMain({withDates: true})
	
	const content = isTable
		? <StatsTable data={tableData} isLoading={isTableLoading}/>
		: <StatsCharts data={chartData} isLoading={isChartLoading} param={param} setParam={setParam} powerCurve={powerCurve}
		               sport={sport}/>
	
	if (!isFetching) return (
		<div className="flex flex-col justify-items-center gap-4 md:gap-8 pt-8 w-full h-full xl:w-[1200px] pb-8">
			<StatsToolbar
				data={mainStats}
				isTable={isTable} setIsTable={setIsTable}
				sport={sport} setSport={setSport}
				dates={dates} setDates={setDates}
			/>
			{mainStats?.length !== 0 ? content : <AddFirstWorkout/>}
		</div>
	)
}

export default Stats
