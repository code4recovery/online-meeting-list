const normalizeBasename = (value?: string | null) => {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
};

export const getRouterBasename = (container: HTMLElement) => {
  const fromRoot = normalizeBasename(container.dataset.baseUrl);
  if (fromRoot) return fromRoot;

  return normalizeBasename(process.env.REACT_APP_BASE_URL);
};
