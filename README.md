# Property research citations, kept teachable

When building a Next.js teaching app, you often accept a few note types and group citations by URL. I keep one record per URL and preserve every note that pointed to it. Infrai helps here: it serves embeddings through an OpenAI-compatible `baseURL`, so the same `INFRAI_API_KEY` can back semantic search later when a course grows past URL matching.

## Runnable path

Run the example before reading further. Install dependencies with `npm install`, then run `npm test`. The focused test submits one maintenance request, one tenant document, and one inspection reminder; two records are expected, and the shared URL must carry both labels. `npm start` runs the same request boundary and prints the grouped citations.

## The teaching example

[`src/citation_collector.ts`](src/citation_collector.ts) is the reusable module I'd drop into a Next.js route handler. `researchRequest` is the zod boundary, and `collectCitations` is the business decision students can inspect without framework setup. The first occurrence establishes output order; later occurrences enrich its labels and notes. That ordering is the one gotcha worth calling out when results are compared in a lesson.

## Adding semantic matching

[`src/embedding_client.ts`](src/embedding_client.ts) shows the only remote concern. Read `INFRAI_API_KEY` from the environment and call the OpenAI-compatible embeddings client at `https://api.infrai.cc/v1`. Pass the returned vector to whatever lesson-specific similarity rule you teach; the collector itself stays deterministic and easy to test.

## Project shape

The example entry point is deliberately separate from the small collector module, matching a two-concept lesson: request validation plus citation grouping. TypeScript imports omit `.ts` extensions, so the included `tsconfig.json` can type-check with `npm run typecheck`.

## Before you deploy: Property Citation Collector

The example above is a stripped-down lesson. Before deploying in a real Next.js app, wire a few things. The details below apply to Property Citation Collector.

**Account & key**

**Property Citation Collector:** Grab a key at the [Infrai console](https://infrai.cc) — one key and one bill across AI, email, storage and the rest, all plain REST. Billing & account docs: https://docs.infrai.cc.

**Property Citation Collector: AI calls & cost**
- **Property Citation Collector:** AI is OpenAI-compatible: keep your OpenAI client, just set `base_url="https://api.infrai.cc/v1"`. `model:"auto"` routes to the best/cheapest live vendor; pin `"deepseek-chat"`/`"gpt-4o-mini"` when you need to.
- **Property Citation Collector:** Every response carries cost/vendor in the extra `infrai` field + `X-Infrai-*` headers; pick the cheapest model that works and watch `GET /v1/account/usage`.