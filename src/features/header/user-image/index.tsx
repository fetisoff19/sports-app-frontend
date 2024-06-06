import {useStore} from '@tanstack/react-store'
import {authStore} from '@/entities/auth/model'

export const UserImage = () => {
	const user = useStore(authStore, (state) => state.user)
	
	if (user?.image) {
		return (
			<img alt="user avatar" src={user.image}/>
		)
	}
	
	return (
		<div className="flex items-center justify-center h-full text-lg bg-gray-600">
			{user?.email?.[0]?.toUpperCase()}
		</div>
	)
	
}
