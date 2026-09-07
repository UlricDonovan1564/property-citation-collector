import { collectCitations, researchRequest } from "./citation_collector.js";

const body = researchRequest.parse({
  maintenanceRequests: [{ id: "m-17", summary: "Replace hallway light", citationUrl: "https://example.edu/maintenance" }],
  tenantDocuments: [{ id: "t-04", title: "Move-in checklist", citationUrl: "https://example.edu/checklist" }],
  inspectionReminders: [{ id: "i-02", note: "Quarterly fire-door review", citationUrl: "https://example.edu/maintenance" }]
});

console.log(JSON.stringify(collectCitations(body), null, 2));
