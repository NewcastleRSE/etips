import type { RequestEvent } from '@sveltejs/kit'

// adapter-node throws when ADDRESS_HEADER (CF-Connecting-IP) is configured but
// missing, which happens for requests that reach the VM without Cloudflare.
export const clientAddress = (event: Pick<RequestEvent, 'getClientAddress'>) => {
	try {
		return event.getClientAddress()
	} catch {
		return 'unknown'
	}
}
