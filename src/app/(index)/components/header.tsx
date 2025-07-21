import { Container } from "@/components/container";
import { Sort } from "@/app/(index)/components/sort";
import { ModalFormcounter } from "./modal-form-counter";

export function Header() {
  return (
    <header className="p-4">
      <Container className="flex justify-between">
        <Sort />
        <ModalFormcounter />
      </Container>
    </header>
  );
}
