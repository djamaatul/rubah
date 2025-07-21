"use client";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { CountersCard } from "./counter.card";
import { ModalDetailcounter, ModalDetailRef } from "./modal-detail-counter";
import { useRef } from "react";
import { Counter } from "@/lib/types/counter";

export function GridViewCounterCard() {
  const modalRef = useRef<ModalDetailRef>(null);
  const counters = useSelector((state: RootState) => state.counters.data);

  function handleClickDetail(data: Counter) {
    modalRef.current?.open(data.id);
  }

  return (
    <section className="grid md:grid-cols-2 gap-4">
      {counters.map((counter) => (
        <CountersCard
          data={counter}
          key={counter.id}
          onClick={handleClickDetail}
        />
      ))}
      <ModalDetailcounter ref={modalRef} />
    </section>
  );
}
