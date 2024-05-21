import {useStore} from "@tanstack/react-store";
import {addFiles, notifyStore, removeAllFiles, removeOneFile, setUploading} from "@/entities/notify";
import React from "react";
import {QUERY_KEY_WORKOUTS, useWorkoutUpload} from "@/entities/workout";
import {useQueryClient} from "@tanstack/react-query";
import {Clear, Done, Error} from "@/shared/svg";
import classnames from "classnames";
import {QUERY_KEY_AUTH} from "@/entities/auth/model";

export const Upload = () => {
	const [isDrag, setDrag] = React.useState<boolean>(false)
	const docs = useStore(notifyStore, state => state.files)
	const disabled = docs.find(({status}) => status !== "added");
	const isUploading = useStore(notifyStore, state => state.isUploading)
	
	const {mutate} = useWorkoutUpload()
	const queryClient = useQueryClient()
	
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
					.pop() === 'fit')
			addFiles(files)
		}
	}
	
	async function upload() {
		if (docs.length) {
			for (const doc of docs) {
				const formData = new FormData()
				formData.append('file', doc.file, doc.file.name)
				mutate({formData, doc})
			}
			await queryClient.invalidateQueries({queryKey: [QUERY_KEY_AUTH]})
			await queryClient.invalidateQueries({queryKey: [QUERY_KEY_WORKOUTS]})
			setUploading(true)
		}
	}
	
	function onClose() {
		if (isUploading) {
			setUploading(false)
			removeAllFiles()
		}
	}
	
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<div
				className={`flex items-center justify-center h-44 sm:h-44 w-full rounded-2xl ${isDrag ? 'bg-gray-600' : 'bg-gray-700'}`}
				onDragStart={e => dragStartHandler(e)}
				onDragLeave={e => dragLeaveHandler(e)}
				onDragOver={e => dragStartHandler(e)}
				onDrop={e => onDropHandler(e)}>
				<div className='p-4'>
					<input
						onDragStart={e => dragStartHandler(e)}
						onDragLeave={e => dragLeaveHandler(e)}
						onDragOver={e => dragStartHandler(e)}
						onDrop={e => onDropHandler(e)}
						type="file" multiple={true} accept={'.fit'}
						onChange={e => handleInputChange(e)}
						className="file-input w-full max-w-xs"
					/>
				</div>
			</div>
			<div className="overflow-x-auto h-44 sm:h-72 w-full">
				<table className="table table-sm table-zebra">
					<thead/>
					<tbody>
					{docs.map((doc) =>
						<tr key={doc.file.name} className={classnames({
							'text-green-400': doc.status === 'success',
							'text-red-600': doc.status === 'error',
							'hover': true,
						})}>
							<td>
								{doc.status !== 'error' ? <div className='p-1'>{doc.file.name}</div>
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
								'group': true
							})}>
								{doc.status === 'added' ? <Clear/> : doc.status === 'error' ? <Error/> : <Done/>}
							</td>
						</tr>)}
					</tbody>
				</table>
			</div>
			<div className='w-full'>
				<button className='btn' onClick={onClose}>Hide</button>
				<div className={`btn ${(!docs.length || !!disabled) && 'btn-disabled'}`} onClick={upload}>Upload</div>
			</div>
		</div>
	)
}
