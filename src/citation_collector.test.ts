import assert from "node:assert/strict";
import { collectCitations, researchRequest } from "./citation_collector.js";

const input = researchRequest.parse({
  maintenanceRequests: [{ id: "m-1", summary: "Leak", citationUrl: "https://research.example/leak" }],
  tenantDocuments: [{ id: "d-1", title: "Lease", citationUrl: "https://research.example/lease" }],
  inspectionReminders: [{ id: "i-1", note: "Check seal", citationUrl: "https://research.example/leak" }]
});
const result = collectCitations(input);
assert.equal(result.length, 2);
assert.deepEqual(result[0].labels, ["maintenance:m-1", "inspection:i-1"]);
console.log("citation decision test passed");
