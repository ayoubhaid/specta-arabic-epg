# Specta Arabic EPG

A dedicated multi-source electronic programme guide for Arabic-language television channels. This repository is separate from `specta-bein-epg`.

## Status
Initial scaffold only. No broadcaster adapters or verified live EPG feed have been implemented yet. Each source must be audited for schedule coverage, timezone, channel identity, access terms, and freshness before its adapter is enabled.

## Candidate first sources
- SNRT: Al Aoula and Arryadia
- 2M Morocco
- Medi1 TV
- Al Kass
- MBC / Shahid
- Rotana
- Al Jazeera Arabic

## Run
Requires Node.js 20 or newer.

```sh
npm run check
npm run scrape
```

The initial scrape command intentionally does not generate an empty/fabricated feed.

## Target output
`data/arabic-epg.json` will contain `schemaVersion`, `generatedAt`, `coverage`, and `channels`. Programme times will be normalized to UTC; Arabic text and source metadata will be preserved.

Use only publicly accessible sources, respect broadcaster terms and rate limits, and do not bypass access controls. Preserve the last known-good feed when a source fails.
