export function validateFeed(feed) {
  const errors = [];
  if (!feed || typeof feed !== 'object') return { valid: false, errors: ['Feed must be an object'] };
  if (feed.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (typeof feed.generatedAt !== 'string' || Number.isNaN(Date.parse(feed.generatedAt))) errors.push('generatedAt must be an ISO timestamp');
  if (!Array.isArray(feed.channels)) errors.push('channels must be an array');
  for (const [i, channel] of (Array.isArray(feed.channels) ? feed.channels : []).entries()) {
    if (!channel.id) errors.push(`channels[${i}].id is required`);
    if (!channel.name) errors.push(`channels[${i}].name is required`);
    if (!Array.isArray(channel.programmes)) errors.push(`channels[${i}].programmes must be an array`);
  }
  return { valid: errors.length === 0, errors };
}
