import {ErrorComponent, ErrorComponentProps, Link, rootRouteId, useMatch, useRouter} from '@tanstack/react-router'

export function DefaultCatchBoundary({error}: ErrorComponentProps) {
	const router = useRouter()
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	})
	
	console.error(error)
	
	return (
		<div className="min-w-80 flex-1 p-4 flex flex-col items-center justify-center gap-4">
			<ErrorComponent error={error}/>
			<div className="flex justify-items-center gap-4">
				<button onClick={() => router.invalidate()}
				        className={`text-white btn rounded-2xl uppercase font-extrabold`}
				>
					Try Again
				</button>
				{isRoot ? (
					<Link to="/"
					      className="btn btn-success bg-green-400 hover:bg-green-500 rounded-2xl uppercase"
					>
						Home Page
					</Link>
				) : (
					<Link to="/"
					      className="btn btn-success bg-green-400 hover:bg-green-500 rounded-2xl uppercase"
					      onClick={(e) => {
						      e.preventDefault()
						      window.history.back()
					      }}
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	)
}

