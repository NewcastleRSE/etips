import type { PagesCard, TopicsCard } from "$lib/types"

export const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const genTitle = (strings: (string | number)[]): string => {
	return strings.reduce((acc: string, str, i) => {
		acc += `${i === 0 ? '' : '|'} ${capitalise(`${str}`).replaceAll('-', ' ')} `
		return acc
	}, 'eTIPS -')
}

export const genDescription = (data: PagesCard[] | TopicsCard[] | null) => {
  if(!data) return ''
  if(data.length === 0) return ''
const card = data[0].cards_id
  if(typeof card === 'string' || card === null) return ''
const copy = card.copy
  if(copy === null) return ''
return copy
}
