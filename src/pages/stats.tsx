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
import {sports} from '@/shared/lib'
import {DateObject} from 'react-multi-date-picker'


const Stats = () => {
	const [isTable, setIsTable] = useState<boolean>(false)
	const [sport, setSport] = useState<typeof sports[number]>('all')
	const [param, setParam] = useState<keyof ChartStats | 'power_curve'>('uuid')
	const [dates, setDates] = useState<DateObject[]>([])
	
	const [firstDate, secondDate] = dates
	const start = firstDate?.format('YYYY-MM-DD') || null
	const end = secondDate?.format('YYYY-MM-DD') || null
	
	const {data: mainStats, isFetching} = useStatsGetMain({withDates: true})
	const {data: tableData, isLoading: isTableLoading} =
		useStatsGetForTable(!!(isTable && start && end), {sport, start, end})
	const {data: chartData} =
		useStatsGetForCharts(!!(!isTable && start && end), {sport, start, end})
	const {data: powerCurve} = useStatsGetPowerCurve(!!(!isTable && start && end && param === 'power_curve'), {
		start,
		end
	})
	
	const content = isTable
		? <StatsTable data={tableData} isLoading={isTableLoading}/>
		: <StatsCharts data={chartData} param={param} setParam={setParam} powerCurve={powerCurve}
		               sport={sport}/>
	
	if (!isFetching) return (
		<div className="flex flex-col justify-items-center gap-4 md:gap-8 padding h-full xl:w-[1200px] pb-8 w-96 sm:w-full">
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
