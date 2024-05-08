export const scrollIntoView = (e?: HTMLElement) => {
	if (e) e.scrollIntoView({ behavior: 'smooth' })
}
