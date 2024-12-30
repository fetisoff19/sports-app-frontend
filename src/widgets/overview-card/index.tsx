import {useWorkoutRename, WorkoutItem} from '@/entities/workout'
import {Indicator} from '@/shared/types'
import {firstCapitalLetter, orderItemValues, paramNames, units} from '@/shared/lib'
import {IconGenerator, Modal} from '@/shared/ui'
import {prepareValues} from '@/shared/lib/helpers'
import {Link} from '@tanstack/react-router'
import {useState} from 'react'
import {SERVER_URL} from '@/shared/api'

type Props = {
	data: WorkoutItem,
	isLoading: boolean
}


export const Card = ({data, isLoading}: Props) => {
	const [note, setNote] = useState<string | null>(data.note)
	const [imgIsLoading, setImgLoading] = useState<boolean>(true)
	const [imgIsError, setImgError] = useState<boolean>(false)
	
	const {mutate: rename} = useWorkoutRename()
	const src = `${SERVER_URL}/${data.map}`
	
	const indicators: Indicator[] | undefined = orderItemValues.map((item) => {
		const value = Number(data?.[item as keyof WorkoutItem] || 0)
		return ({
			field: paramNames[item],
			value: prepareValues[item](value) + ' ' + units[item],
		})
	})
	const skeleton = (w: number | string = 10, h: number = 4) => isLoading ?
		`skeleton text-transparent disabled:pointer-events-none disabled:transform-none w-${w} h-${h}` : ''
	
	const Stats = indicators?.map((item) =>
		<div key={item.field} className="flex flex-col justify-between gap-2">
			<div className={`${skeleton(16)} text-xs stat-title justify-start`}>{item?.field}</div>
			<div className={`${skeleton(18, 6)} text-xl stat-value justify-start`}>{item?.value}</div>
		</div>
	)
	
	function openModal() {
		if (!isLoading) {
			const dialog = document.getElementById(data?.uuid + 'editNote') as HTMLDialogElement | null
			if (dialog) {
				dialog.showModal()
			}
			const elem = document.activeElement as HTMLLinkElement
			if (elem) {
				elem?.blur()
			}
		}
	}
	
	function handleRenameClick() {
		rename({uuid: data.uuid, name: data.name, note})
	}
	
	return (
		<div
			className="flex sm:flex-row justify-between md:max-w-[800px] sm:w-full p-8 bg-base-100 shadow-xl hover:bg-base-100/75 rounded-xl flex-col gap-5">
			<div className="w-64 sm:max-w-64 flex items-start flex-col gap-3">
				<div className="flex flex-0 gap-3">
					<div className="flex justify-center items-center w-8 h-10">
						{!isLoading ? <IconGenerator sport={data.sport}/> :
							<div className="skeleton w-12 h-12 rounded-full shrink-0"/>}
					</div>
					<div className="flex flex-col gap-1 w-max">
						<Link
							to="/view/$uuid"
							params={{uuid: data.uuid}}
							className={`${isLoading ? skeleton(18) : 'card-title hover:text-white link '} text-base block max-w-56 link-hover truncate`}>
							{data.name}
						</Link>
						<div className={`${skeleton(18)} flex-row items-start w-full text-xs stat-title`}>
							{data && (firstCapitalLetter(data.sport) + ', ' + new Date(data.date).toLocaleString())}
						</div>
					</div>
				</div>
				<div className="flex flex-1 items-center w-full">
					<div className="grid grid-cols-2 gap-3 justify-between w-full">
						{Stats}
					</div>
				</div>
				<div onClick={openModal}
				     className={`${isLoading ? skeleton(52) : ''} max-w-64 block truncate text-xs hover:text-white hover:cursor-pointer`}>
					{data?.note || !isLoading && 'Add notes...'}
				</div>
			</div>
			<div className="flex items-center ">
				<Link
					to="/view/$uuid"
					disabled={!data.uuid}
					params={{uuid: data.uuid}}
					className={`${(isLoading || (data.map && imgIsLoading && !imgIsError)) ? 'skeleton' : 'no-map'} sm:w-52 sm:h-52 w-64`}>
					{!imgIsError && data.map &&
            <img src={src} alt={data?.name} className="rounded-xl filter" onLoad={() => setImgLoading(false)}
                 onError={() => setImgError(true)}/>}
				</Link>
			</div>
			<Modal id={data.uuid + 'editNote'} text={'Enter notes'} handleConfirm={handleRenameClick}>
				<textarea
					className="textarea textarea-bordered h-36" placeholder="Type here" value={note || ''}
					onChange={e => setNote(e.target.value)}
				/>
			</Modal>
		</div>
	)
}
