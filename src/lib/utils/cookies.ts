export const verifyCookie = (cookie: string | undefined, options: string[]) => {
	if (!cookie) {
		return false
	}
	if (options.includes(cookie)) return true
	return false
}
