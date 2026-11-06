// Adds a rate limiter. Limit is times it can be hit and window_ms is the window the limit counts within.
export const createRateLimiter = (limit: number, window_ms: number) => {
	const hits = new Map<string, number[]>()

	return (key: string) => {
		const now = Date.now()
		const recent = (hits.get(key) ?? []).filter((t) => now - t < window_ms)
		if (recent.length >= limit) {
			hits.set(key, recent)
			return false
		}
		recent.push(now)
		hits.set(key, recent)
		if (hits.size > 10000) {
			for (const [k, times] of hits) {
				if (times.every((t) => now - t >= window_ms)) hits.delete(k)
			}
		}
		return true
	}
}
