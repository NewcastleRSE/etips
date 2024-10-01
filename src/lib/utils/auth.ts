import type { Cookies } from '@sveltejs/kit'

export const verifyAccess = (
	type: 'slug' | 'topic',
	cookies: Cookies,
	bot: boolean,
	cat?: 'home' | 'open' | 'restricted' | 'research' | 'restricted_hcp' | null
): boolean => {
	if (type === 'slug') {
		if (cat === null) return false
		if (cat !== 'restricted' && cat !== 'restricted_hcp') {
			return false
		}
	}
	if (bot) return true
	if (cat === 'restricted' || cat === 'restricted_hcp') {
		if (
			!cookies.get('etips-side') ||
			!cookies.get('etips-role') ||
			!cookies.get('etips-disclaimer-consent')
		)
			return false
	}
	if (cookies.get('etips-disclaimer-consent') !== 'true') {
		cookies.delete('etips-disclaimer-consent', { path: '/' })
		cookies.delete('etips-role', { path: '/' })
		cookies.delete('etips-side', { path: '/' })
		return false
	}
	return true
}
