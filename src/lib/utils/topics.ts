import type { Topic } from '$lib/types'

export const groupTopics = (topics: Topic[]) => {
	return topics.reduce(
		(acc, topic) => {
			if (topic.category && typeof topic.category !== 'string' && topic.category.title) {
				const key = topic.category.title
				;(acc[key] = acc[key] || []).push(topic)
			}
			return acc
		},
		{} as Record<string, Topic[]>
	)
}
