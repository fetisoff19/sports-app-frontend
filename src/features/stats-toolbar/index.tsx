import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {ChartsIcon, TableIcon} from '@/shared/svg'
import {Dropdown} from '@/shared/ui'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {DateRange} from '@/shared/types'
import {SportStats} from '@/entities/stats'
import {curDate, day, sportNames, sports} from '@/shared/lib'


type Props = {
	data: SportStats[] | undefined
	isTable: boolean
	setIsTable: Dispatch<SetStateAction<boolean>>
	sport: typeof sports[number]
	setSport: Dispatch<SetStateAction<typeof sports[number]>>
	dates: DateRange,
	setDates: Dispatch<SetStateAction<DateRange>>
}

export const StatsToolbar = ({data, isTable, setIsTable, sport, setSport, dates, setDates}: Props) => {
	const [period, setPeriod] = useState<typeof periods[number]>('All TimeIcon')
	
	const sports = ['all', ...(data?.map(({sport}) => sport) || [])]
	
	const periods = [
		'Week',
		'Month',
		'3 Months',
		'6 Months',
		'Year',
		'All Time'
	]
	useEffect(() => {
		const pastDate: number = Math.min(...(data?.map(({first}) => new Date(first).getTime()) || []), 10000000000000)
		switch (period) {
			case 'Week':
				setDates(() => [new Date(curDate - (day * 7)), new Date(curDate)])
				break
			case 'Month':
				setDates(() => [new Date(curDate - (day * 30)), new Date(curDate)])
				break
			case '3 Months':
				setDates(() => [new Date(curDate - (day * 90)), new Date(curDate)])
				break
			case '6 Months':
				setDates(() => [new Date(curDate - (day * 180)), new Date(curDate)])
				break
			case 'Year':
				setDates(() => [new Date(curDate - (day * 365)), new Date(curDate)])
				break
			case 'All Time':
				setDates(() => [new Date(pastDate === 10000000000000 ? curDate : pastDate), new Date(curDate)])
				break
		}
	}, [data, period, setDates])
	
	
	function handleTypeChange() {
		setIsTable(prev => !prev)
	}
	
	return (
		<div className="flex flex-col gap-4 justify-between sm:w-full md:flex-row xl:max-w-[1200px]">
			<div className="flex  flex-row gap-2 sm:gap-4 justify-between md:justify-center">
				<Dropdown valueList={periods} setValue={setPeriod} value={period} style={'hidden sm:block'}/>
				<DateRangePicker
					onChange={setDates}
					value={dates}
					className="input border-none text-base text-neutral-content rounded-2xl hover:bg-secondary px-2 sm:px-4 shadow-xl"
				/>
				<label className="swap btn btn-ghost bg-base-100 rounded-2xl hover:bg-secondary group shadow-xl">
					<input type="checkbox" onChange={handleTypeChange}/>
					{isTable ? <TableIcon/> : <ChartsIcon/>}
				</label>
			</div>
			<div className="flex flex-row gap-2 sm:gap-4 justify-between md:justify-center">
				<Dropdown valueList={periods} setValue={setPeriod} value={period} style={'block sm:hidden'}/>
				<Dropdown valueList={sports} setValue={setSport} value={sport} fields={sportNames} btnSuccess={true}/>
			</div>
		</div>
	)
}
