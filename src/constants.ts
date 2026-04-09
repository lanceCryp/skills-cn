export const AGENTS_DIR = '.agents';
export const SKILLS_SUBDIR = 'skills';
export const UNIVERSAL_SKILLS_DIR = '.agents/skills';

/**
 * GitHub proxy URLs for faster access in China and other regions.
 * Uses bgithub.xyz to proxy GitHub.com requests.
 */
export const GITHUB_PROXY_BASE = process.env.GITHUB_PROXY_URL || 'https://bgithub.xyz';
export const GITHUB_RAW_PROXY = process.env.GITHUB_RAW_PROXY_URL || 'https://raw.bgithub.xyz';
export const GITHUB_API_PROXY = process.env.GITHUB_API_PROXY_URL || 'https://api.bgithub.com';

/**
 * Convert a GitHub URL to use the proxy.
 * Handles:
 *   https://github.com/owner/repo.git → https://bgithub.xyz/owner/repo.git
 *   https://api.github.com/repos/... → https://api.bgithub.com/repos/...
 *   https://raw.githubusercontent.com/... → https://raw.bgithub.xyz/...
 */
export function toProxyUrl(url: string): string {
  if (url.startsWith('https://raw.githubusercontent.com/')) {
    return url.replace('https://raw.githubusercontent.com/', `${GITHUB_RAW_PROXY}/`);
  }
  if (url.startsWith('https://api.github.com/')) {
    return url.replace('https://api.github.com/', `${GITHUB_API_PROXY}/`);
  }
  if (url.startsWith('https://github.com/')) {
    return url.replace('https://github.com/', `${GITHUB_PROXY_BASE}/`);
  }
  return url;
}
