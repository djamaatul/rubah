import { Container } from "@/components/container";
import { GridViewCounterCard } from "./components/grid-view-counter-card";

export default function Home() {
  return (
    <Container className="space-y-4">
      <div>
        <h1 className="text-4xl font-semibold">Rubah</h1>
        <p>Kontrol habitmu, agar berubah menjadi lebih baik</p>
      </div>
      <GridViewCounterCard />
    </Container>
  );
}
