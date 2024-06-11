import classnames from 'classnames'
import {ClearIcon} from '@/shared/svg'
import {notifyStore, removeAllFiles, setUploading} from '@/entities/notify'
import {useStore} from '@tanstack/react-store'
import {UPLOAD} from '@/entities/workout'
import {Modal} from '@/shared/ui'
import {Upload} from '@/widgets/upload'
import {openModal} from '@/shared/lib'

export const UploadProgressBar = () => {
	const files = useStore(notifyStore, state => state.files)
	const isUploading = useStore(notifyStore, state => state.isUploading)
	const status = files.length && (files.filter(({status}) => status !== 'added').length) / files.length * 100
	
	function clearFileList() {
		if (isUploading) {
			setUploading(false)
			removeAllFiles()
		}
	}
	
	
	return (
		<>
			{!!files.length && <div>
        <div className={classnames({
					'btn btn-ghost btn-circle group opacity-0': true,
					'opacity-100': isUploading,
					'hover:cursor-default': !isUploading,
				})} onClick={clearFileList}>
          <ClearIcon/>
        </div>
        <div className="btn btn-ghost p-2 no-animation" onClick={() => openModal(UPLOAD)}>
          <progress className="progress w-32 sm:w-40" value={status} max="100"/>
        </div>
      </div>}
			<Modal id={UPLOAD} text={'Drop files on format .fit here or select'} showCloseBtn={false}>
				<Upload/>
			</Modal>
		</>
	
	)
}
