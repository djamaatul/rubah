"use client";

import { countersActions } from "@/lib/features/counter.slice";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@/lib/hero-ui";
import { RootState } from "@/lib/store";
import { Counter } from "@/lib/types/counter";
import moment from "moment";
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export interface ModalDetailRef {
  open: (id: string) => void;
  close: () => void;
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col justify-end">
      <h4 className="font-semibold text-lg">{value}</h4>
      <p className="text-sm text-foreground/50">{title}</p>
    </div>
  );
}

function Stats({ data }: { data: Counter }) {
  const since = moment().diff(moment(data.createDate ?? null), "day");

  const longestStreak = Math.max(
    ...data.resets.reduce<number[]>(
      (acc, curr, i, data) => {
        if (!i) return acc;
        acc.push(
          moment(curr.createDate).diff(moment(data[i - 1].createDate), "day")
        );
        return acc;
      },
      [0]
    )
  );

  const averageStreak =
    data.resets.reduce((acc, curr, i, data) => {
      if (!i) return 0;
      return (
        acc +
        moment(curr.createDate).diff(moment(data[i - 1].createDate), "day")
      );
    }, 0) / (data.resets.length || 1);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Stat title="Resets" value={data.resets.length.toString()} />
      <Stat title="Since Started" value={since.toString() + " Days"} />
      <Stat title="Longest Streak" value={longestStreak + " Days"} />
      <Stat title="Average Streak" value={averageStreak.toString() + " Days"} />
    </div>
  );
}

const initalData = {
  createDate: "",
  id: "",
  resets: [],
  title: "",
  color: "",
};

export function ModalDetailcounter({ ref }: { ref: Ref<ModalDetailRef> }) {
  const [, setTick] = useState(0);
  const interval = useRef<NodeJS.Timeout>(undefined);

  const [id, setId] = useState<string>("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const data =
    useSelector((state: RootState) =>
      state.counters.data.find((v) => v.id === id)
    ) ?? initalData;

  useImperativeHandle(ref, () => ({
    open: (id: string) => {
      setId(id);
      onOpen();
    },
    close() {
      onClose();
    },
  }));

  function handleReset() {
    dispatch(countersActions.resetCounter(data.id));
  }

  function handleDelete() {
    onClose();
    dispatch(countersActions.deleteCounter(data.id));
  }

  useEffect(() => {
    if (isOpen) {
      interval.current = setInterval(() => setTick((i) => (i ? 0 : 1)), 1000);
    }

    return () => clearInterval(interval.current);
  }, [isOpen]);

  const now = moment();
  const lastReset = moment(
    data.resets[data.resets.length - 1]?.createDate ?? data.createDate
  );
  const f = (c: number) => (c % 60 || 0).toString();

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent className="p-4 gap-4">
        <ModalHeader className="flex-col p-0">
          <div
            className="p-4 rounded-lg bg-gradient-to-tr from-black/50 from-0% aspect-[4/1] grid grid-cols-4"
            style={{
              backgroundColor: data.color ?? "hsl(var(--heroui-primary-500))",
            }}
          >
            <Stat title="Days" value={f(now.diff(lastReset, "day"))} />
            <Stat title="Hour" value={f(now.diff(lastReset, "hour"))} />
            <Stat title="Minute" value={f(now.diff(lastReset, "minute"))} />
            <Stat title="Second" value={f(now.diff(lastReset, "second"))} />
          </div>
        </ModalHeader>
        <Button className="bg-warning" onPress={handleReset}>
          Reset Counter
        </Button>
        <div className="p-2 space-y-4">
          <h2 className="font-semibold text-xl">Stats</h2>
          <Stats data={data} />
        </div>
        <button
          className="text-danger-500 hover:cursor-pointer"
          onClick={handleDelete}
        >
          Delete counter
        </button>
      </ModalContent>
    </Modal>
  );
}
