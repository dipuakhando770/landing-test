/**
 * Top-Level SEO URL & Slug Utility (Clean HTML5 Routes - Zero Hashtags)
 * Example: https://www.nasirdigitalhub.com/purchase/canva-pro-lifetime-subscription
 * Supports English, Bengali (বাংলা), numbers, and international characters.
 */

export function generateSlug(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    // Normalize unicode characters
    .normalize('NFD')
    // Remove diacritics but keep Bengali characters (\u0980-\u09FF), English (a-z), and Numbers (0-9)
    .replace(/[\u0300-\u036f]/g, '')
    // Replace non-alphanumeric characters (except Bengali and Latin alphanumerics) with hyphens
    .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
    // Replace whitespace and underscores with a single hyphen
    .replace(/[\s_]+/g, '-')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns the SEO slug for any product.
 * Guarantees never to return 'purchase' or empty strings.
 */
export function getProductSlug(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  if (product.slug && product.slug.trim()) {
    const s = generateSlug(product.slug);
    if (s && s !== 'purchase' && s !== 'landing') return s;
  }
  if (product.title && product.title.trim()) {
    const s = generateSlug(product.title);
    if (s && s !== 'purchase' && s !== 'landing') return s;
  }
  if (product.id && product.id.trim()) {
    const s = generateSlug(product.id);
    if (s && s !== 'purchase' && s !== 'landing') return s;
  }
  return 'freelancing-digital-product-bundle';
}

/**
 * Returns the clean HTML5 product detail path:
 * Example: /product/canva-pro-lifetime-subscription
 */
export function getProductPath(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  return `/product/${getProductSlug(product)}`;
}

/**
 * Returns the clean HTML5 dedicated landing/purchase path:
 * Example: /purchase/canva-pro-lifetime-subscription
 */
export function getProductLandingPath(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  return `/purchase/${getProductSlug(product)}`;
}

/**
 * Returns the full clean top-level SEO URL for the product detail page:
 * Example: https://www.nasirdigitalhub.com/product/canva-pro-lifetime-subscription
 */
export function getProductFullUrl(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://www.nasirdigitalhub.com';
  return `${origin}/product/${getProductSlug(product)}`;
}

/**
 * Returns the full clean top-level SEO URL for the product landing page:
 * Example: https://www.nasirdigitalhub.com/purchase/canva-pro-lifetime-subscription
 */
export function getProductLandingFullUrl(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://www.nasirdigitalhub.com';
  return `${origin}/purchase/${getProductSlug(product)}`;
}

/**
 * Backward compatibility alias
 */
export function getProductHash(product: {
  id?: string;
  title?: string;
  slug?: string;
}): string {
  return getProductPath(product);
}

/**
 * Robust Product Finder: Matches by slug, auto-generated title slug, or fallback ID.
 */
export function findProductBySlugOrId<T extends { id: string; title: string; slug?: string }>(
  products: T[],
  param: string
): T | undefined {
  if (!param || !products || products.length === 0) return undefined;

  // Strip leading slashes, hashes or 'product/' or 'purchase/' or 'landing/' prefix if passed
  const cleanParam = param
    .replace(/^#\/?/, '')
    .replace(/^\/?(product|purchase|landing)\//, '')
    .replace(/^\//, '')
    .trim();

  const decodedParam = decodeURIComponent(cleanParam).toLowerCase();
  const slugifiedParam = generateSlug(decodedParam);

  if (!slugifiedParam || slugifiedParam === 'purchase') {
    return products.find((p) => (p as any).featured) || products[0];
  }

  // 1. Exact slug match
  const exactSlug = products.find(
    (p) => p.slug && p.slug.toLowerCase() === decodedParam
  );
  if (exactSlug) return exactSlug;

  // 2. Slugified title match
  const titleSlugMatch = products.find(
    (p) => generateSlug(p.title) === slugifiedParam || generateSlug(p.slug || '') === slugifiedParam
  );
  if (titleSlugMatch) return titleSlugMatch;

  // 3. Fallback: Exact ID match
  const idMatch = products.find((p) => p.id === cleanParam || p.id === decodedParam);
  if (idMatch) return idMatch;

  // 4. Loose match
  return products.find((p) => {
    const pSlug = generateSlug(p.title);
    return pSlug.includes(slugifiedParam) || slugifiedParam.includes(pSlug);
  });
}
