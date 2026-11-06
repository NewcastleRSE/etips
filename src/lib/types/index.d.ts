// Generated from the Directus schema snapshot (Directus 11.17.4).
// Regenerate after changing the schema in Directus — do not edit by hand.
import type { DirectusFile, DirectusUser } from '@directus/sdk'

export interface Card {
	id: string
	status?: 'published' | 'draft' | 'archived'
	sort?: number | null
	user_created?: string | DirectusUser | null
	date_created?: string | null
	user_updated?: string | DirectusUser | null
	date_updated?: string | null
	title?: string | null
	subtitle?: string | null
	type?: 'text' | 'media' | 'alert' | 'numbered' | 'button' | 'emphasis' | 'hero' | 'form' | 'rhyme'
	media?: CardsFile[]
	category?: 'all' | 'left' | 'right' | 'twin'
	icon?: string | null
	url?: string | null
	media_type?: 'photo' | 'video' | 'vimeo' | 'youtube' | 'file' | null
	copy?: string | null
	number?: number | null
	position?: 'full' | 'left' | 'right' | 'full_end' | null
	thumbnail?: string | DirectusFile | null
	transcript?: string | null
}

export interface CardsFile {
	id: number
	cards_id?: string | Card | null
	directus_files_id?: string | DirectusFile | null
	sort?: number | null
}

export interface Contact {
	id: string
	sort?: number | null
	first_name?: string | null
	last_name?: string | null
	email?: string | null
	job_title?: string | null
	role?: string | null
	gdpr_consent?: boolean
	age_weeks?: number | null
	age_preterm?: number | null
	disclaimer_consent?: boolean
	side_affected?: string | null
	date_created?: string | null
	date_updated?: string | null
}

export interface Page {
	id: string
	status?: 'published' | 'draft' | 'archived'
	sort?: number | null
	user_created?: string | DirectusUser | null
	date_created?: string | null
	user_updated?: string | DirectusUser | null
	date_updated?: string | null
	title?: string
	cards?: PagesCard[]
	topics?: Topic[]
	category?: 'home' | 'open' | 'restricted' | 'research' | 'restricted_hcp' | null
	icon?: string | null
	slug?: string
	copy?: string | null
}

export interface PagesCard {
	id: number
	pages_id?: string | Page | null
	cards_id?: string | Card | null
	sort?: number | null
}

export interface Topic {
	id: string
	status?: 'published' | 'draft' | 'archived'
	sort?: number | null
	user_created?: string | DirectusUser | null
	date_created?: string | null
	user_updated?: string | DirectusUser | null
	date_updated?: string | null
	cards?: TopicsCard[]
	category?: string | Page | null
	display?: 'cards' | 'list' | 'continuous' | null
	title?: string
	slug?: string | null
	icon?: string | null
}

export interface TopicsCard {
	id: number
	topics_id?: string | Topic | null
	cards_id?: string | Card | null
	sort?: number | null
}

export interface Collections {
	cards: Card[]
	cards_files: CardsFile[]
	contacts: Contact[]
	pages: Page[]
	pages_cards: PagesCard[]
	topics: Topic[]
	topics_cards: TopicsCard[]
}
