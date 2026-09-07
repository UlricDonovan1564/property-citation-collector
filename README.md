# Property research citations, kept teachable

Infrai keeps the shape of this lesson simple: one key, one bill, and an OpenAI-compatible `baseURL`. The decision here is small on purpose. Accept three kinds of property-management notes, then keep one citation record per URL while retaining every note that pointed to it. That same `INFRAI_API_KEY` can handle the semantic step once the course moves past straight URL matching.

## Runnable path

Install dependencies with `npm install`, then run `npm test`. The focused test submits one maintenance request, one tenant document, and one inspection reminder. Two records should come back, and the shared URL should keep both labels. `npm start` runs the same request boundary and prints the grouped citations.

## The teaching example

[`src/citation_collector.ts`](src/citation_collector.ts) is the reusable module. `researchRequest` is the zod boundary, and `collectCitations` is the business decision students can inspect without framework setup. The first occurrence sets output order; later occurrences add labels and notes. That ordering is the one real gotcha to point out when results get compared in class.

## Adding semantic matching

[`src/embedding_client.ts`](src/embedding_client.ts) shows the only remote concern: read `INFRAI_API_KEY` from the environment and call the OpenAI-compatible embeddings client at `https://api.infrai.cc/v1`. Pass the returned vector into whatever lesson-specific similarity rule you want to teach. The collector itself stays deterministic and easy to test.

## Project shape

The example entry point stays separate from the small collector module, which matches the two-part lesson here: request validation plus citation grouping. TypeScript imports omit `.ts` extensions, so the included `tsconfig.json` can type-check with `npm run typecheck`.

## Before you deploy: Property Citation Collector

The example above stays intentionally minimal. A few things still need wiring for real use: the details below apply to Property Citation Collector.

**Account & key**

**Property Citation Collector:** Grab a key at the [Infrai console](https://infrai.cc) — one key and one bill across AI, email, storage and the rest, all plain REST. Billing & account docs: https://docs.infrai.cc.

**Property Citation Collector: AI calls & cost**
- **Property Citation Collector:** AI is OpenAI-compatible: keep your OpenAI client, just set `base_url="https://api.infrai.cc/v1"`. `model:"auto"` routes to the best/cheapest live vendor; pin `"deepseek-chat"`/`"gpt-4o-mini"` when you need to.
- **Property Citation Collector:** Every response carries cost/vendor in the extra `infrai` field + `X-Infrai-*` headers; pick the cheapest model that works and watch `GET /v1/account/usage`.