import {ChangeEvent, useEffect, useState} from 'react'
import {openModal, useDebounce} from '@/shared/lib'
import {ClearIcon, SearchIcon} from '@/shared/svg'
import {setName, UPLOAD, workoutsStore} from '@/entities/workout'
import classNames from 'classnames'
import {useStore} from '@tanstack/react-store'


export const OverviewToolbar = () => {
	const name = useStore(workoutsStore, state => state.overviewName)
	
	const [inputValue, setInputValue] = useState<string>(name)
	const debouncedValue = useDebounce<string>(inputValue)
	
	useEffect(() => {
		setName(debouncedValue.toString(), 'overviewName')
	}, [debouncedValue])
	
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value)
	}
	
	function handleClear() {
		if (inputValue.length) {
			setName('', 'overviewName')
			setInputValue('')
		}
	}
	
	return (
		<div className="flex justify-center">
			<div className="flex gap-4 xl:max-w-[1200px] sm:w-full md:max-w-[800px] w-80">
				<label className="input rounded-2xl flex-1 flex items-center gap-2 shadow-xl">
					<input
						type="text"
						className="grow"
						placeholder="Search by name..."
						value={inputValue}
						onChange={onChange}
					/>
					<div onClick={handleClear} className={classNames({flex: true, 'cursor-pointer': !!inputValue})}>
						{!inputValue ? <SearchIcon/> : <ClearIcon/>}
					</div>
				</label>
				<button
					onClick={() => openModal(UPLOAD)}
					className="btn btn-success rounded-2xl btn-wide hidden sm:block">
					Add Workout
				</button>
			</div>
		</div>
	)
}
