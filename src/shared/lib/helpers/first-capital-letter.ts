export const firstCapitalLetter = (text?: string): string | undefined => {
	if (text?.length) {
		const [first, ...others] = text
		return [...first.toUpperCase(), ...others].join('').toString()
	}
	return text
}