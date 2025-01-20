import {Store} from '@tanstack/react-store'
import uuid4 from 'uuid4'

type Toast = {
	uuid: string
	type: 'info' | 'success' | 'error'
	message: string
}

type Status = 'added' | 'success' | 'error'

export type UploadDoc = {
	status: Status
	file: File,
	error: null | string
}

type State = {
	toasts: Toast[];
	files: UploadDoc[],
	isUploading: boolean
}

export const notifyStore = new Store<State>({
	toasts: [],
	files: [],
	isUploading: false
})

export const addNotify = (toast: Omit<Toast, 'uuid' | 'ts'>, ms = 3000) => {
	notifyStore.setState((state) => {
		if (state.toasts.find(({message}) => message === toast.message)) {
			return state
		}
		const newToast: Toast = ({...toast, uuid: uuid4()})
		setTimeout(() => removeNotify(newToast), ms)
		return {
			...state,
			toasts: [...state.toasts, newToast]
		}
	})
}

const removeNotify = (toast: Toast) => {
	notifyStore.setState((state) => {
		return {
			...state,
			toasts: state.toasts.filter(({uuid}) => uuid !== toast.uuid),
		}
	})
}

export const addFiles = (files: File[]) => {
	notifyStore.setState((state) => {
		const uniqueNames = new Set<string>(
			[...state.files.map(({file}) => file.name)]
		)
		const newFiles: UploadDoc[] = files
			.filter(file => !uniqueNames.has(file.name))
			.map(file => ({
				file,
				status: 'added',
				error: null,
			}))
		return {
			...state,
			files: [...state.files, ...newFiles]
		}
	})
}

export const changeStatus = (doc: UploadDoc, status: Status, error = null) => {
	notifyStore.setState((state) => {
		return {
			...state,
			files: state.files.map(file =>
				doc.file.name === file.file.name ? ({...file, status, _uuid: uuid4(), error}) : file),
		}
	})
}

export const removeOneFile = (doc: UploadDoc) => {
	if (doc.status === 'added') {
		notifyStore.setState((state) => {
			return {
				...state,
				files: state.files.filter(({file}) => file.name !== doc.file.name),
			}
		})
	}
}

export const removeAllFiles = () => {
	notifyStore.setState((state) => {
		return {
			...state,
			files: [],
		}
	})
}

export const setUploading = (isUploading: boolean) => {
	notifyStore.setState((state) => {
		return {
			...state,
			isUploading,
		}
	})
}

