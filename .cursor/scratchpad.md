## Background and Motivation
SigmaGrid’s public discovery descriptors (agent descriptor, ERC-8004 registration, MCP, and OpenAPI) must all advertise the same real, working API contract. Bots and agent runtimes should only discover the 8 public GET endpoints under `https://api.sigmagrid.app` and should always use the non-www canonical domain (`https://sigmagrid.app`).

## Key Challenges and Analysis
- Multiple copies of discovery files exist in this repo (`static/`, `public/`, and generated `build/`). Docusaurus serves `static/*` at site root; `build/*` is an artifact.
- `erc8004.json` previously referenced `https://sigmagrid.app/static/openapi.json`, but the canonical OpenAPI spec is served at `/openapi.json`.
- `agent.json` includes a `website` pointing to `https://www.sigmagrid.app`; canonical should be non-www.
- Need to ensure `www.sigmagrid.app/*` redirects to `sigmagrid.app/*` (including `/.well-known/*`).

## High-level Task Breakdown
- [x] Update `agent.json` to advertise exactly 8 capabilities and endpoints under `https://api.sigmagrid.app`.
  - Success: `capabilities[*].endpoint` exactly matches the 8 canonical endpoints and includes pricing note about x402 / potential 402 responses.
- [x] Update `erc8004.json` endpoint references to canonical non-www URLs for agent, mcp, and openapi.
  - Success: references `https://sigmagrid.app/.well-known/agent.json`, `https://sigmagrid.app/mcp.json`, `https://sigmagrid.app/openapi.json`.
- [x] Add/adjust `vercel.json` redirect from www -> non-www for all paths.
  - Success: requests to `https://www.sigmagrid.app/.well-known/agent.json` redirect to `https://sigmagrid.app/.well-known/agent.json`.
- [x] Add `scripts/check-bot-contracts.ts` to fetch live descriptors and validate the same 8 paths exist across agent, MCP, and OpenAPI.
  - Success: exits non-zero on mismatch; prints actionable mismatch output.
- [ ] Verify and print HTTP status codes for required URLs.

## Project Status Board
- [x] Update discovery JSONs (`agent.json`, `erc8004.json`) in source locations
- [x] Configure www -> non-www redirect
- [x] Add contract consistency check script
- [ ] Run script (locally) and verify live HTTP status codes

## Current Status / Progress Tracking
- Located multiple copies:
  - `static/.well-known/agent.json`, `public/.well-known/agent.json`
  - `static/.well-known/erc8004.json`, `public/.well-known/erc8004.json`
  - `static/mcp.json`, `static/openapi.json`
- Updated `agent.json` (static/public/build):
  - Canonical `website`: `https://sigmagrid.app`
  - Canonical `base_url`: `https://api.sigmagrid.app`
  - 8 capabilities with x402 pricing note, and `/v1/*` endpoints only
- Updated `erc8004.json` (static/public/build) to reference:
  - `https://sigmagrid.app/.well-known/agent.json`
  - `https://sigmagrid.app/mcp.json`
  - `https://sigmagrid.app/openapi.json`
- Added `www.sigmagrid.app` -> `sigmagrid.app` redirect in `vercel.json`.
- Added `scripts/check-bot-contracts.ts` (live fetch checker).

## Executor's Feedback or Assistance Requests
- The contract checker fetches live URLs; it will fail until these repo changes are deployed. Current failure is expected (live `agent.json` still lacks `base_url`).

## Lessons
- Docusaurus serves files in `static/` at the site root; prefer editing `static/*` and avoid committing `build/*` artifacts.
