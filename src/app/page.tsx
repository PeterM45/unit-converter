import UnitConverter from '@/components/unit-converter';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8 px-4">
        <UnitConverter />
        <Footer />
      </div>
    </main>
  );
}
