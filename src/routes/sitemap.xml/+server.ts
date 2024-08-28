import { DOMAIN } from '$env/static/private'
import { readItems } from '@directus/sdk'
import { error } from '@sveltejs/kit'

const site: string = `https://${DOMAIN}`
export async function GET({ locals }) {
	const { directus } = locals
	const pages = await directus.request(
			readItems('pages', {
				fields: [
					'id',
					'status',
					'sort',
					'title',
					'category',
					'slug',
					'copy',
					'icon',
					{ topics: ['*'] }
				],
				deep: {
					topics: {
						_filter: {
							status: {
								_eq: 'published'
							}
						}
					}
				}
			})
		)
  .then((r) => r.flatMap((v) => v.topics?.flatMap((t) => `${v.slug}/${t.slug}`)).filter(v => v!== undefined))
		.catch(() => error(500, `Backend is not reachable right now...`))
	const body = sitemap([...pages])
	const response = new Response(body)
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600')
	response.headers.set('Content-Type', 'application/xml')
	return response
}

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  `
		)
		.join('')}
</urlset>`
