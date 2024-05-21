export const removeTags = (str: string) => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, ' ')

export const sectionString = (
	str: string,
	query: string,
	start: number,
	end: number,
	buffer: number,
	fn: (t: string) => string,
	full = false
) => {
	const str_start = str.substring(buffer === 0 ? 0 : start - buffer, start)
	const str_end = str.substring(end, buffer === 0 ? str.length : end + buffer)
	const str_query = fn(str.substring(start, end))
	const result = full
		? `${str_start}${str_query}${str_end}`
		: `...${str_start}${str_query}${str_end.length === 0 || str_end.at(-1) === '.' ? str_end : str_end + '...'}`
	if (result === '') {
		return str
	}
	return result
}

export const singleString = (
	str: string,
	locations: [number, number][],
	fn: (t: string) => string
): string => {
	const result = locations.reduce((acc, loc, i, arr) => {
		let start = ''
		let end = ''
		if (i === 0) {
			start = str.substring(0, loc[0])
			end = str.substring(loc[1], arr.length === 1 ? undefined : arr[i + 1][0])
		}
		if (i !== 0) {
			end = str.substring(loc[1], i + 1 === arr.length ? undefined : arr[i + 1][0])
		}
		const query = fn(str.substring(loc[0], loc[1]))
		acc += `${start}${query}${end}`
		return acc
	}, '')
	return result
}

export const highlightStr = (str: string) => {
	return `<mark>${str}</mark>`
}

export const highlightAndBoldStr = (str: string) => {
	return `<strong><mark>${str}</mark></strong>`
}

export const findQueryLocation = (str: string, query: string, limit = 1) => {
	const regex = new RegExp(query, 'gi')
	let matches = 0
	let match: RegExpExecArray | null = null
	let locations = []
	while ((match = regex.exec(str)) !== null && matches < limit) {
		locations.push([match.index, regex.lastIndex])
		matches++
	}
	return locations
}
