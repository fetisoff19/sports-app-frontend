import {useWorkoutDeleteAll} from "@/entities/workout";

const Settings = () => {
	const {mutate} = useWorkoutDeleteAll()
	return (
		<div className="p-2">
			<h3>Settings!</h3>
			<button onClick={() => mutate()} className="btn btn-ghost">Delete all</button>
		</div>
	);
};

export default Settings;