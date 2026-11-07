import { readFile } from 'node:fs/promises';
import { validateFeed } from './core/validator.mjs';

const registry = JSON.parse(await readFile(new URL('../config/channels.json', import.meta.url), 'utf8'));
const enabled = registry.channels.filter((channel) => channel.enabled);
console.log(`Specta Arabic EPG: ${enabled.length} channel entries enabled.`);
console.log('No broadcaster adapters are implemented yet; no feed was generated.');

const result = validateFeed({
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  channels: []
});
if (!result.valid) {
  console.error(result.errors.join('\n'));
  process.exitCode = 1;
}
