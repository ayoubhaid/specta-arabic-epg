export function normalizeProgramme(input, { sourceId, sourceUrl, timezone = 'UTC' } = {}) {
  if (!input || typeof input !== 'object') throw new TypeError('Programme must be an object');
  const title = String(input.title ?? '').trim();
  const start = toIsoUtc(input.start);
  const end = toIsoUtc(input.end);
  if (!title) throw new Error('Programme title is missing');
  if (!start || !end || Date.parse(end) <= Date.parse(start)) throw new Error(`Invalid time range for: ${title}`);
  return {
    id: `${sourceId ?? 'unknown'}:${Date.parse(start)}:${title.toLocaleLowerCase()}`,
    title,
    ...(input.description ? { description: String(input.description).trim() } : {}),
    ...(input.category ? { category: String(input.category).trim() } : {}),
    start, end,
    startEpochSeconds: Math.floor(Date.parse(start) / 1000),
    endEpochSeconds: Math.floor(Date.parse(end) / 1000),
    source: { ...(sourceId ? { channelId: String(sourceId) } : {}), ...(sourceUrl ? { url: sourceUrl } : {}), timezone }
  };
}
function toIsoUtc(value) {
  if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date)) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
