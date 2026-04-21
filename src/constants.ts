export const AGENTS_DIR = '.agents';
export const SKILLS_SUBDIR = 'skills';
export const UNIVERSAL_SKILLS_DIR = '.agents/skills';

/**
 * GitHub proxy URLs for faster access in China and other regions.
 * Falls back to direct connection if proxy is unavailable.
 *
 * Git clone URLs use kkgithub.com (direct domain replacement format).
 * Raw and API URLs use gh-proxy.org (prefix format: proxy/https://target).
 *
 * Multiple fallback proxies are provided for resilience.
 */
export const GITHUB_PROXY_BASE = process.env.GITHUB_PROXY_URL || 'https://v6.gh-proxy.org';
export const GITHUB_RAW_PROXY = process.env.GITHUB_RAW_PROXY_URL || 'https://v6.gh-proxy.org';
export const GITHUB_API_PROXY = process.env.GITHUB_API_PROXY_URL || 'https://v6.gh-proxy.org';

/**
 * Fallback proxy lists for when the primary proxy fails.
 * Format: [primary, backup1, backup2, ...]
 */
export const GIT_PROXY_FALLBACKS = [
  'https://kkgithub.com',
  'https://gitclone.com',
  'https://v6.gh-proxy.org',
];

export const RAW_PROXY_FALLBACKS = [
  'https://gh-proxy.org',
  'https://v6.gh-proxy.org',
  'https://cdn.gh-proxy.org',
  'https://hk.gh-proxy.org',
];

export const API_PROXY_FALLBACKS = [
  'https://gh-proxy.org',
  'https://v6.gh-proxy.org',
  'https://cdn.gh-proxy.org',
  'https://hk.gh-proxy.org',
];

/**
 * Convert a GitHub URL to use the proxy.
 * Handles:
 *   https://github.com/owner/repo.git → https://v6.gh-proxy.org/https://github.com/owner/repo.git
 *   https://raw.githubusercontent.com/... → https://v6.gh-proxy.org/https://raw.githubusercontent.com/...
 *   https://api.github.com/... → https://v6.gh-proxy.org/https://api.github.com/...
 */
export function toProxyUrl(url: string): string {
  if (url.startsWith('https://github.com/')) {
    return `${GITHUB_PROXY_BASE}/https://github.com/` + url.slice(19);
  }
  if (url.startsWith('https://raw.githubusercontent.com/')) {
    return `${GITHUB_RAW_PROXY}/https://raw.githubusercontent.com/` + url.slice(26);
  }
  if (url.startsWith('https://api.github.com/')) {
    return `${GITHUB_API_PROXY}/https://api.github.com/` + url.slice(20);
  }
  return url;
}

/**
 * Get all available git clone proxy URLs in order of preference.
 */
export function getGitProxyUrls(): string[] {
  const envOverride = process.env.GITHUB_PROXY_URL;
  if (envOverride) {
    return [envOverride];
  }
  return GIT_PROXY_FALLBACKS;
}

/**
 * Get all available raw content proxy URLs in order of preference.
 */
export function getRawProxyUrls(): string[] {
  const envOverride = process.env.GITHUB_RAW_PROXY_URL;
  if (envOverride) {
    return [envOverride];
  }
  return RAW_PROXY_FALLBACKS;
}

/**
 * Get all available API proxy URLs in order of preference.
 */
export function getApiProxyUrls(): string[] {
  const envOverride = process.env.GITHUB_API_PROXY_URL;
  if (envOverride) {
    return [envOverride];
  }
  return API_PROXY_FALLBACKS;
}

/**
 * Convert a GitHub URL to use a specific raw proxy.
 * @param url - The raw.githubusercontent.com URL
 * @param proxy - The proxy base URL (e.g., 'https://gh-proxy.org')
 */
export function toRawProxyUrl(url: string, proxy: string): string {
  if (url.startsWith('https://raw.githubusercontent.com/')) {
    return `${proxy}/https://raw.githubusercontent.com/` + url.slice(26);
  }
  return url;
}

/**
 * Convert a GitHub URL to use a specific API proxy.
 * @param url - The api.github.com URL
 * @param proxy - The proxy base URL (e.g., 'https://gh-proxy.org')
 */
export function toApiProxyUrl(url: string, proxy: string): string {
  if (url.startsWith('https://api.github.com/')) {
    return `${proxy}/https://api.github.com/` + url.slice(20);
  }
  return url;
}
