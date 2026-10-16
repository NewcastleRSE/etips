export const verifyCookie = (cookie: string | undefined, options: string[]) => {
	if (!cookie) {
		return false
	}
	if (options.includes(cookie)) return true
	return false
}

export const cookie_opts = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax',
	maxAge: 60 * 60 * 24 * 360
} as const
