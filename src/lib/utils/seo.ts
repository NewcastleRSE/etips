export const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const genTitle = (strings: (string | number)[]): string => {
	return strings.reduce((acc: string, str, i) => {
		acc += `${i === 0 ? '' : '|'} ${capitalise(`${str}`).replaceAll('-', ' ')} `
		return acc
	}, 'eTIPS -')
}
