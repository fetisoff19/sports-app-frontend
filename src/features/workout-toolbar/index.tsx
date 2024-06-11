import {ChangeEvent, useEffect, useState} from 'react'
import {paramNames, sortParams, sportNames, useDebounce} from '@/shared/lib'
import {ClearIcon, DirectionIcon, SearchIcon} from '@/shared/svg'
import {Dropdown} from '@/shared/ui'
import {setDirection, setName, setParam, setSport, workoutsStore} from '@/entities/workout'
import {useStore} from '@tanstack/react-store'
import classnames from 'classnames'

type Props = {
	sportsList: string[]
}

export const WorkoutToolbar = ({sportsList}: Props) => {
	const param = useStore(workoutsStore, state => state.param)
	const sport = useStore(workoutsStore, state => state.sport)
	const name = useStore(workoutsStore, state => state.workoutName)
	const direction = useStore(workoutsStore, state => state.direction)
	
	const [inputValue, setInputValue] = useState<string>(name)
	const debouncedValue = useDebounce<string>(inputValue)
	
	useEffect(() => {
		setName(debouncedValue.toString(), 'workoutName')
	}, [debouncedValue])
	
	useEffect(() => {
		if (!sportsList.includes(sport)) {
			setSport('all')
		}
	}, [sport, sportsList])
	
	
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value)
	}
	
	function handleClear() {
		if (inputValue.length) {
			setName('', 'workoutName')
			setInputValue('')
		}
	}
	
	function handleDirectionChange() {
		setDirection()
	}
	
	const filteredParamFields = () => {
		if (sport === 'all') {
			return sortParams.filter((item) => !item.includes('power') && !item.includes('speed'))
		}
		if (sport !== 'cycling') {
			return sortParams.filter((item) => !item.includes('power') && item !== 'speed')
		}
		if (sport === 'cycling') {
			return sortParams.filter((item) => item !== 'enhanced_speed')
		}
		return []
	}
	
	return (
		<div className="flex flex-col gap-4 sm:w-full md:flex-row xl:max-w-[1200px]">
			<div className="w-full min-w-32">
				<label className="input min-w-32 rounded-2xl flex items-center gap-2 shadow-xl">
					<input type="text" className="grow min-w-20" placeholder="Search by name..." value={inputValue}
					       onChange={onChange}/>
					<div className="flex cursor-pointer" onClick={handleClear}>
						{!inputValue ? <SearchIcon/> : <ClearIcon/>}
					</div>
				</label>
			</div>
			<div className="flex  flex-row gap-4 justify-between md:justify-center">
				<label className={classnames({
					'swap btn btn-ghost bg-base-100 rounded-2xl group shadow-xl': true,
					'scale-y-[-1]': direction !== 'DESC'
				})}>
					<input type="checkbox" onChange={handleDirectionChange}/>
					<DirectionIcon/>
				</label>
				<Dropdown valueList={filteredParamFields()} setValue={setParam} value={param} fields={paramNames}/>
				<Dropdown valueList={sportsList} setValue={setSport} value={sport} fields={sportNames} btnSuccess={true}/>
			</div>
		</div>
	)
}
