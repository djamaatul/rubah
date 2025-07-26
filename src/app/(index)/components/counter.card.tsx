"use client";

import { Counter } from "@/lib/types/counter";
import { Card, CardBody, CardFooter } from "@heroui/react";
import moment from "moment";
import { useMemo } from "react";

export function CountersCard({
  data,
  onClick,
}: {
  data: Counter;
  onClick: (data: Counter) => void;
}) {
  const createDate = moment(data.createDate);
  const lastReset = data.resets[0]
    ? moment(data.resets[0].createDate)
    : createDate;
  const now = moment();

  const lastStreak = useMemo(() => {
    if (data.resets.length <= 1) return createDate.get("day");
    return now.diff(
      moment(data.resets[data.resets.length - 1].createDate),
      "day"
    );
  }, [data.resets, createDate, now]);

  return (
    <Card
      className="p-4 hover:shadow bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 gap-4"
      isPressable
      onPress={() => onClick(data)}
    >
      <CardBody className="p-0">
        <div
          className="aspect-video p-4 rounded-lg bg-gradient-to-tr from-black/50 from-0%"
          style={{
            backgroundColor: data.color ?? "hsl(var(--heroui-primary-500))",
          }}
        >
          {lastStreak} Day
        </div>
      </CardBody>
      <CardFooter className="flex-col items-start p-0">
        <p className="font-bold">{data.title}</p>
        <small className="text-default-500">
          Reset on {lastReset.format("DD MMM")}
        </small>
      </CardFooter>
    </Card>
  );
}
