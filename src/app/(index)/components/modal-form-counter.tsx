"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
} from "@/lib/hero-ui";

import { getLocalTimeZone, now } from "@internationalized/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useDispatch } from "react-redux";
import { countersActions } from "@/lib/features/counter.slice";
import moment from "moment";

const counterSchema = z.object({
  title: z.string().nonempty(),
  createdDate: z.string().nonempty(),
});

export function ModalFormcounter() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(counterSchema),
    defaultValues: {
      createdDate: now(getLocalTimeZone()).toAbsoluteString(),
    },
  });

  const createdDate = form.register("createdDate");

  function handleSubmit(values: z.infer<typeof counterSchema>) {
    dispatch(
      countersActions.createCounter({
        createDate: moment(values.createdDate).format("YYYY-MM-DD HH:mm:ss"),
        title: values.title,
      })
    );
    onClose();
    form.reset();
  }

  return (
    <>
      <Button variant="flat" onPress={onOpen}>
        Add
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <ModalBody className="p-0">
              <Input
                label="Title"
                placeholder="No Junk food"
                variant="flat"
                isInvalid={!!form.formState.errors.title?.message}
                errorMessage={form.formState.errors.title?.message}
                {...form.register("title")}
              />
              <DatePicker
                inert
                hideTimeZone
                granularity="second"
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                label="Start On"
                variant="flat"
                isInvalid={!!form.formState.errors.createdDate?.message}
                errorMessage={form.formState.errors.createdDate?.message}
                onChange={(value) => {
                  form.setValue("createdDate", value!.toString());
                }}
                onBlur={createdDate.onBlur}
              />
            </ModalBody>
            <ModalFooter className="p-0">
              <Button color="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
