export function openModal<T extends string>(id: T) {
	const dialog = document.getElementById(id) as HTMLDialogElement | null
	if (dialog) {
		dialog.showModal()
	}
}
