export const loadObserver = (elems: string, tracker: HTMLElement, root_el: string) => {
	const observer = new IntersectionObserver(
		(es) => {
			es.forEach((e, i) => {
				if (e.isIntersecting && e.intersectionRatio >= 0) {
					tracker.innerHTML = e.target.getAttribute('data-observe') ?? String(i)
				}
			})
		},
		{
			root: document.getElementById(root_el ?? 'theme-wrapper'),
			threshold: 0.9
		}
	)
	const to_observe = document.querySelectorAll(elems)
	for (const el of to_observe) {
		observer.observe(el)
	}
}
