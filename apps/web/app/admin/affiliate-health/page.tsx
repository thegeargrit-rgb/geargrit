import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buildPageMetadata } from "@/lib/seo";
import { getAffiliateHealthReport } from "@/lib/affiliate/health";

export const metadata: Metadata = buildPageMetadata({
  title: "Affiliate Health",
  description: "Internal dashboard for affiliate mapping quality and click activity.",
  path: "/admin/affiliate-health",
  noIndex: true,
});

export default async function AffiliateHealthPage() {
  const report = await getAffiliateHealthReport();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-5xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">
          Affiliate Health
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Founder dashboard for affiliate mapping quality and click activity
          over the last 7 days.
        </p>

        {!report.available ? (
          <Card>
            <p className="text-sm text-muted-foreground">
              Supabase environment variables are missing. Add `SUPABASE_URL` and
              `SUPABASE_SERVICE_ROLE_KEY` in `apps/web/.env.local`.
            </p>
          </Card>
        ) : (
          <>
            <section className="mb-6 grid gap-3 sm:grid-cols-3">
              <Card>
                <p className="text-xs uppercase text-muted-foreground">
                  Window Start
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {new Date(report.rangeStartIso).toLocaleString()}
                </p>
              </Card>
              <Card>
                <p className="text-xs uppercase text-muted-foreground">
                  Total Clicks (7d)
                </p>
                <p className="mt-1 text-2xl font-bold">{report.totalClicks}</p>
              </Card>
              <Card>
                <p className="text-xs uppercase text-muted-foreground">
                  Unmapped Slugs
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {report.unmappedClickedSlugs.length}
                </p>
              </Card>
            </section>

            <section className="mb-6">
              <h2 className="mb-3 text-xl font-semibold">Top Clicked Slugs</h2>
              {report.topClickedSlugs.length > 0 ? (
                <div className="grid gap-2">
                  {report.topClickedSlugs.map((item) => (
                    <Card
                      key={item.slug}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-mono text-sm">{item.slug}</p>
                      </div>
                      <Badge variant="primary">{item.clicks} clicks</Badge>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <p className="text-sm text-muted-foreground">
                    No click events recorded in the last 7 days.
                  </p>
                </Card>
              )}
            </section>

            <section className="mb-6">
              <h2 className="mb-3 text-xl font-semibold">
                Clicked Slugs Missing Active Mapping
              </h2>
              {report.unmappedClickedSlugs.length > 0 ? (
                <div className="grid gap-2">
                  {report.unmappedClickedSlugs.map((item) => (
                    <Card
                      key={item.slug}
                      className="flex items-center justify-between"
                    >
                      <p className="font-mono text-sm">{item.slug}</p>
                      <Badge variant="outline">{item.clicks} clicks</Badge>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <p className="text-sm text-muted-foreground">
                    No unmapped clicked slugs detected.
                  </p>
                </Card>
              )}
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">
                Quick SQL Fix Snippets
              </h2>
              {report.sqlFixSnippets.length > 0 ? (
                <div className="grid gap-3">
                  {report.sqlFixSnippets.map((snippet, index) => (
                    <Card key={`${snippet}-${index}`}>
                      <pre className="overflow-x-auto text-xs whitespace-pre-wrap">
                        {snippet}
                      </pre>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <p className="text-sm text-muted-foreground">
                    No fix snippets needed right now.
                  </p>
                </Card>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}