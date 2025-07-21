"use client";

import { countersActions } from "@/lib/features/counter.slice";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from "@/lib/hero-ui";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function Sort() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(new Set([""]));

  function handleSelection(a: SharedSelection) {
    dispatch(countersActions.sort(a.currentKey!));
    setSelected(new Set(a.currentKey));
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" className="hidden md:block">Sort {selected}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Static Actions"
        selectedKeys={selected}
        selectionMode="single"
        onSelectionChange={handleSelection}
      >
        <DropdownItem key="ASC">A - Z</DropdownItem>
        <DropdownItem key="DESC">Z - A</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
