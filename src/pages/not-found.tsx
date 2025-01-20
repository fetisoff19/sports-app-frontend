import {Link} from '@tanstack/react-router'

export function NotFound() {
	
	return (
		<div className="m-auto flex flex-col justify-items-center gap-4">
			<div className="text-gray-400">
				<p>The page you are looking for does not exist.</p>
			</div>
			<div className="flex justify-center gap-4 flex-wrap">
				<button
					onClick={() => window.history.back()}
					className="bg-emerald-500 text-white btn btn-success rounded-2xl uppercase"
				>
					Go back
				</button>
				<Link
					to="/"
					className="bg-cyan-600 text-white btn btn-info rounded-2xl uppercase"
				>
					Home Page
				</Link>
			</div>
		</div>
	)
}
