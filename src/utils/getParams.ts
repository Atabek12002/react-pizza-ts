import qs from 'qs';

export const params = qs.parse(window.location.search.substring(1)) as Record<string, string>;
