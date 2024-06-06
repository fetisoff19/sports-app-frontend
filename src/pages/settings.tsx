import {useWorkoutDeleteAll} from '@/entities/workout'
import {SettingsCard} from '@/widgets/settings-card'
import {Modal} from '@/shared/ui'
import {useState} from 'react'
import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'
import {ChangePassword} from '@/features/change-password'
import {useChangePassword, useDeleteUser} from '@/entities/auth/api/queries'

type Actions = 'delete-all-workouts' | 'delete-account' | 'change-password'

const Settings = () => {
	const [currentPassword, setCurrentPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [repeatNewPassword, setRepeatNewPassword] = useState<string>('')
	
	const user = useStore(authStore, state => state.user)
	
	const {mutate: deleteAll} = useWorkoutDeleteAll()
	const {mutate: changePassword} = useChangePassword()
	const {mutate: deleteUser} = useDeleteUser()
	
	
	function openModal(type: Actions) {
		const dialog = document.getElementById(type) as HTMLDialogElement | null
		if (dialog) {
			dialog.showModal()
		}
	}
	
	function closeModal() {
		const dialog = document.activeElement as HTMLLinkElement
		if (dialog) {
			dialog.blur()
		}
	}
	
	
	return (
		<>
			<div className="flex flex-col justify-items-center gap-8 padding xl:w-[1200px]">
				<h3 className="text-2xl">Settings</h3>
				<SettingsCard
					title={'Change password'}
					btnText={'Change password'} btnError={false} onClick={() => openModal('change-password')}/>
				<SettingsCard
					title={'Delete All Workouts'}
					disabled={!user?.workoutCount}
					description={'Permanently remove your workouts from app. This action is not reversible, so please continue with caution.'}
					btnText={'Delete All Workouts'} btnError={true} onClick={() => openModal('delete-all-workouts')}/>
				<SettingsCard
					title={'Delete Account'}
					description={'Permanently remove your Personal Account and all workouts from app. This action is not reversible, so please continue with caution.'}
					btnText={'Delete Account'} btnError={true} onClick={() => openModal('delete-account')}/>
			</div>
			<Modal id={'change-password'} showCloseBtn={false}>
				<ChangePassword onClose={closeModal}
				                onChangePassword={() => changePassword({current: currentPassword, new: newPassword})}
				                currentPassword={currentPassword} setCurrentPassword={setCurrentPassword}
				                newPassword={newPassword} setNewPassword={setNewPassword}
				                repeatNewPassword={repeatNewPassword} setRepeatNewPassword={setRepeatNewPassword}/>
			</Modal>
			<Modal id={'delete-all-workouts'} text={'Do you want to delete all workouts?'} handleConfirm={deleteAll}/>
			<Modal id={'delete-account'} text={'Do you want to delete account?'} handleConfirm={() => deleteUser()}/>
		</>
	
	)
}

export default Settings
