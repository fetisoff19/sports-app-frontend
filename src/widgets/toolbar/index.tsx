import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDebounce} from "@/shared/lib";
import {Clear, SearchIcon} from "@/shared/svg";
import {UPLOAD} from "@/entities/workout";
import {Modal} from "@/shared/ui";
import {Upload} from "@/widgets/upload";

type Props = {
	setValue: Dispatch<SetStateAction<string>>;
}

export const Toolbar = ({setValue}: Props) => {
	const [inputValue, setInputValue] = useState<string>('')
	const debouncedValue = useDebounce<string>(inputValue)
	useEffect(() => {
		setValue(debouncedValue.toString())
	}, [debouncedValue, setValue]);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value)
	}

	function clear() {
		if (inputValue.length) {
			setValue('')
			setInputValue('')
		}
	}

	function openModal() {
		const dialog = document.getElementById(UPLOAD) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}

	return (
		<div className="flex gap-8 xl:max-w-[1200px] sm:w-full mx-auto sm:h-full">
			<label className="input rounded-2xl flex-1 flex items-center gap-2">
				<input type="text" className="grow" placeholder="Search by name..." value={inputValue} onChange={onChange}/>
				<div className="flex" onClick={clear}>
					{!inputValue ? <SearchIcon/> : <Clear/>}
				</div>
			</label>
			<button onClick={openModal}
							className="btn btn-success rounded-2xl btn-wide hidden sm:block bg-green-400 hover:bg-green-500">
				Add Workout
			</button>
			<Modal id={UPLOAD} text={'Drop files on format .fit here or select'}>
				<Upload/>
			</Modal>
		</div>
	)
}
