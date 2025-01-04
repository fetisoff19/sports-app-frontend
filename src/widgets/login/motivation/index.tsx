export const Motivation = () => {
	const link: string = 'https://drive.google.com/drive/folders/1NCrcDjoPpgEUH09G-hz3cVeMb9vs1rhc?usp=sharing'
	
	return (
		<div className="flex flex-col gap-3">
			<div>
				<h1 className="text-2xl pb-1">Motivation</h1>
				Different applications for viewing workouts don’t offer a
				convenient and advanced interface with the ability to analyze
				indicators. For example, the Garmin Connect interface is very cluttered,
				and Strava doesn’t provide advanced statistics. In this application I am
				trying to combine the best solutions.
			</div>
			<div>
				<h1 className="text-2xl pb-1">About</h1>
				The application was created for educational and non-commercial purposes. View your
				activities by uploading your tracks in the .fit extension or{' '}
				<a className="link hover:text-white" href={link}>download my files</a>. Stable support for the following
				sports: cycling, running, hiking.
				<br/>
				Tested on files from Garmin, Wahoo, Lezyne and Bryton devices.
				<br/>
			</div>
			<div>
				<h3 className="text-lg pb-1">Core tech stack:</h3>
				<ul className="list-disc pl-4">
					<li className="link hover:text-white">
						<a href="https://github.com/fetisoff19/sports-app-frontend">Client - React with DaisyUI component library,
							TanStack's products: Query, Router and Store.
						</a>
					</li>
					<li className="link hover:text-white">
						<a href="https://github.com/fetisoff19/sports-app-backend">Server - NestJS, PostgreSQL and parser by
							Garmin</a>
					</li>
					<li className="link hover:text-white">
						<a
							href="https://www.figma.com/design/94hPA28wNLfIk30QAhtfM0/be-active?node-id=0-1&m=dev&t=putY7j2fPXpOhJUF-1">
							Interface design - Figma
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h3 className="text-lg pb-1">Contacts:</h3>
				<ul className="list-disc pl-4">
					<li className="link hover:text-white">
						<a href="https://www.linkedin.com/in/oleg-fetisov-733900275">LinkedIn</a>
					</li>
					{/*<li className="link hover:text-white">*/}
					{/*	<a href="">Gmail</a>*/}
					{/*</li>*/}
				</ul>
			</div>
		
		</div>
	)
}
