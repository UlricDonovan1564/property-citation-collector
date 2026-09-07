import { z } from "zod";

export const researchRequest = z.object({
  maintenanceRequests: z.array(z.object({ id: z.string(), summary: z.string(), citationUrl: z.string().url() })),
  tenantDocuments: z.array(z.object({ id: z.string(), title: z.string(), citationUrl: z.string().url() })),
  inspectionReminders: z.array(z.object({ id: z.string(), note: z.string(), citationUrl: z.string().url() }))
});

export type ResearchRequest = z.infer<typeof researchRequest>;
export type Citation = { url: string; labels: string[]; notes: string[] };

export function collectCitations(input: ResearchRequest): Citation[] {
  const entries: Array<{ url: string; label: string; note: string }> = [
    ...input.maintenanceRequests.map((item) => ({ url: item.citationUrl, label: `maintenance:${item.id}`, note: item.summary })),
    ...input.tenantDocuments.map((item) => ({ url: item.citationUrl, label: `document:${item.id}`, note: item.title })),
    ...input.inspectionReminders.map((item) => ({ url: item.citationUrl, label: `inspection:${item.id}`, note: item.note }))
  ];
  const byUrl = new Map<string, Citation>();
  for (const entry of entries) {
    const existing = byUrl.get(entry.url);
    if (existing) {
      existing.labels.push(entry.label);
      existing.notes.push(entry.note);
    } else {
      byUrl.set(entry.url, { url: entry.url, labels: [entry.label], notes: [entry.note] });
    }
  }
  return [...byUrl.values()];
}
