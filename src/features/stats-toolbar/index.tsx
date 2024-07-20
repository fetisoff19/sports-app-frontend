import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {ChartsIcon, TableIcon} from '@/shared/svg'
import {Dropdown} from '@/shared/ui'
import {SportStats} from '@/entities/stats'
import {sportNames, sports} from '@/shared/lib'
import DatePicker, {DateObject} from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'

type Props = {
	data: SportStats[] | undefined
	isTable: boolean
	setIsTable: Dispatch<SetStateAction<boolean>>
	sport: typeof sports[number]
	setSport: Dispatch<SetStateAction<typeof sports[number]>>
	dates: DateObject[],
	setDates: Dispatch<SetStateAction<DateObject[]>>
}


export const StatsToolbar = ({data, isTable, setIsTable, sport, setSport, dates, setDates}: Props) => {
	const [period, setPeriod] = useState<typeof periods[number]>('All Time')
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
		const pastDate: number = Math.min(...(data?.map(({first}) => new Date(first).getTime()) || []), Math.pow(10, 13))
		const date = new DateObject()
		const curDate = new Date().getTime()
		const day = 24 * 3600 * 1000
		
		switch (period) {
			case 'Week':
				setDates(() => [new DateObject(new Date(curDate - (day * 7))), date])
				break
			case 'Month':
				setDates(() => [new DateObject(new Date(curDate - (day * 30))), date])
				break
			case '3 Months':
				setDates(() => [new DateObject(new Date(curDate - (day * 90))), date])
				break
			case '6 Months':
				setDates(() => [new DateObject(new Date(curDate - (day * 183))), date])
				break
			case 'Year':
				setDates(() => [new DateObject(new Date(curDate - (day * 365))), date])
				break
			case 'All Time':
				setDates(() => [new DateObject(new Date(pastDate === Math.pow(10, 13) ? curDate : pastDate)), date])
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
				<DatePicker
					weekStartDayIndex={1}
					range
					sort
					dateSeparator=" - "
					value={dates}
					onChange={setDates}
					format="DD MMM YYYY"
					className="bg-dark "
					containerClassName="w-min-56 w-full"
					inputClass="input w-full outline-none btn text-base text-neutral-content rounded-2xl shadow-xl hover:bg-secondary hover:cursor-pointer text-sm"
					arrowClassName="opacity-0"
					plugins={[<DatePanel/>]}
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
