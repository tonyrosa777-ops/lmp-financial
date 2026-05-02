/**
 * Sanity image URL builder helper.
 *
 * Returns null when no Sanity client is configured (env vars missing). Blog
 * components must guard for null and fall back to gradient-placeholder UI.
 */

import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { sanityClient } from '../client';

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!builder || !source) return null;
  return builder.image(source).url();
}
