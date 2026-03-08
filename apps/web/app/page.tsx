import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto my-8 p-4">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Welcome to GearGrit
        </h1>
        <p className="mb-6 font-body">
          Find trusted expert reviews and detailed guides for the best badminton
          and trekking gear in India.
        </p>

        {/* Example Product Card */}
        <Card className="mb-4">
          <div className="flex items-center mb-2 gap-2">
            <Badge size="sm">NEW</Badge>
            <span className="font-semibold">Yonex Astrox 100zz Review</span>
          </div>
          <div className="mb-2">
            <ScoreBadge score={9.2} color="success" /> / 10
          </div>
          <Button className="mt-2" variant="default">
            Read Full Review
          </Button>
        </Card>
      </main>
      <Footer />
    </>
  );
}
