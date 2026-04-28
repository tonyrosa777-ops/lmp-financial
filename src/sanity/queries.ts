/**
 * Sanity GROQ queries + the TypeScript types they project to.
 *
 * The types here are the ONLY contract between the CMS layer and the
 * blog page components. The seed JSON fallback (seed-posts.json) conforms
 * to these same types, so swapping the data source is a single import change.
 *
 * BlockContent here is a SIMPLIFIED structure (not full PortableText) so the
 * fallback JSON stays readable and so we don't need the @portabletext/react
 * package for Phase 1G. When real Sanity data is wired (Phase 1G+), the
 * Sanity-side blockContent can be transformed to this shape, OR PortableText
 * can be dropped in and the renderBlock helper in [slug]/page.tsx replaced.
 */

export interface PostAuthor {
  name: string;
  role?: string;
}

export interface PostHeaderImage {
  url: string;
  alt: string;
}

export interface BlockContent {
  type: 'paragraph' | 'heading' | 'list' | 'quote';
  text?: string;
  level?: 2 | 3;
  items?: string[];
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: PostAuthor;
  body: BlockContent[];
  headerImage?: PostHeaderImage | null;
  flag?: string;
}

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "_id": _id,
  title,
  "slug": slug.current,
  excerpt,
  "publishedAt": publishedAt,
  "category": category->title,
  "author": author->{name, role},
  body,
  "headerImage": headerImage{ "url": asset->url, alt }
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  "_id": _id,
  title,
  "slug": slug.current,
  excerpt,
  "publishedAt": publishedAt,
  "category": category->title,
  "author": author->{name, role},
  body,
  "headerImage": headerImage{ "url": asset->url, alt }
}`;
