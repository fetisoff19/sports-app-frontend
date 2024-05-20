import {useLogin} from "@/entities/auth/api/queries";

const Login = () => {
	const {mutate} = useLogin()

	function login() {
		mutate({email: 'test@test.com', password: '12345678'})
	}

	return (
		<div className="p-2">
			<button onClick={login}>Login!</button>
		</div>
	);
};

export default Login;