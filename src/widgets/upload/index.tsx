import {useStore} from '@tanstack/react-store'
import {
	addFiles,
	addNotify,
	changeStatus,
	notifyStore,
	removeAllFiles,
	removeOneFile,
	setUploading
} from '@/entities/notify'
import React, {useEffect, useRef} from 'react'
import {QUERY_KEY_SOME_WORKOUTS, useWorkoutUpload} from '@/entities/workout'
import {useQueryClient} from '@tanstack/react-query'
import {ClearIcon, DoneIcon, ErrorIcon} from '@/shared/svg'
import classnames from 'classnames'
import {useAuth} from '@/entities/auth/api/queries'
import axios from 'axios'
import {QUERY_KEY_STATS_MAIN} from '@/entities/stats'

export const Upload = () => {
	const [isDrag, setDrag] = React.useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const isUploading = useStore(notifyStore, state => state.isUploading)
	const docs = useStore(notifyStore, state => state.files)
	const disabled = docs.find(({status}) => status !== 'added')
	const {refetch} = useAuth()
	
	const {mutateAsync} = useWorkoutUpload()
	const queryClient = useQueryClient()
	
	useEffect(() => {
		if (isUploading && docs.length) {
			const successfullyCount = docs.filter(({status}) => status === 'success').length
			addNotify({
				type: 'info',
				message: `Processing completed: ${successfullyCount} workouts out of ${docs.length} have been successfully added.`
			})
		}
	}, [isUploading, docs])
	
	function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setDrag(true)
	}
	
	function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setDrag(false)
	}
	
	function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		if (e.dataTransfer?.files?.length) {
			const files = [...e.dataTransfer.files]
				.filter(workout => workout.name.split('.').pop() === 'fit')
			addFiles(files)
		}
	}
	
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target?.files?.length) {
			const files = [...e.target.files]
				.filter(workout => workout.name.split('.')
					.pop()?.toLowerCase() === 'fit')
			
			addFiles(files)
		}
	}
	
	async function upload() {
		if (docs.length) {
			for (const doc of docs) {
				const formData = new FormData()
				formData.append('file', doc.file, doc.file.name)
				try {
					await mutateAsync({formData, doc})
					changeStatus(doc, 'success')
				} catch (e: unknown) {
					if (axios.isAxiosError(e)) {
						changeStatus(doc, 'error', e?.response?.data?.message || e?.message)
					} else {
						addNotify({type: 'error', message: e?.toString() || 'Unknown error'})
					}
				}
			}
			await queryClient.invalidateQueries({queryKey: [QUERY_KEY_SOME_WORKOUTS], refetchType: 'all'},)
			await queryClient.invalidateQueries({queryKey: [QUERY_KEY_STATS_MAIN], refetchType: 'all'},)
			await refetch()
			setUploading(true)
			if (inputRef.current) {
				inputRef.current.value = ''
			}
		}
	}
	
	function onClose() {
		if (isUploading) {
			setUploading(false)
			removeAllFiles()
			if (inputRef.current) {
				inputRef.current.value = ''
			}
		}
	}
	
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<div
				className={`flex items-center justify-center h-44 sm:h-44 w-full rounded-2xl ${isDrag ? 'bg-neutral' : 'bg-secondary'}`}
				onDragStart={e => dragStartHandler(e)}
				onDragLeave={e => dragLeaveHandler(e)}
				onDragOver={e => dragStartHandler(e)}
				onDrop={e => onDropHandler(e)}>
				<div className="p-4">
					<input
						onDragStart={e => dragStartHandler(e)}
						onDragLeave={e => dragLeaveHandler(e)}
						onDragOver={e => dragStartHandler(e)}
						onDrop={e => onDropHandler(e)}
						type="file" multiple={true} accept={'.fit'}
						onChange={e => handleInputChange(e)}
						className="file-input w-full max-w-xs"
						ref={inputRef}
					/>
				</div>
			</div>
			<div className="overflow-x-auto h-44 sm:h-72 w-full overflow-y-auto scroll">
				<table className="table table-sm table-zebra">
					<thead/>
					<tbody>
					{docs.map((doc) =>
						<tr key={doc.file.name} className={classnames({
							'text-green-400': doc.status === 'success',
							'text-red-600': doc.status === 'error',
							'hover': true,
						})}>
							<td className="w-full">
								{doc.status !== 'error' ? <div className="p-1">{doc.file.name}</div>
									: <div className="collapse w-full rounded-none">
										<input type="checkbox"/>
										<div className="collapse-title p-1">
											{doc.file.name}
										</div>
										<div className="collapse-content px-1">
											<p>{doc.error}</p>
										</div>
									</div>}
							</td>
							<td onClick={() => removeOneFile(doc)} className={classnames({
								'cursor-pointer': doc.status === 'added',
								'group': true,
							})}>
								{doc.status === 'added' ? <ClearIcon/> : doc.status === 'error' ? <ErrorIcon/> : <DoneIcon/>}
							</td>
						</tr>)}
					</tbody>
				</table>
			</div>
			<div className="w-full flex flex-row gap-4 justify-end">
				<button className="btn btn-neutral w-32" onClick={onClose}>Hide</button>
				<div className={`btn btn-success w-32 ${(!docs.length || !!disabled) && 'btn-disabled'}`}
				     onClick={upload}>Upload
				</div>
			</div>
		</div>
	)
}
