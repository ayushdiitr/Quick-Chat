"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";

import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { createChatSchema, createChatSchemaType } from "@/validations/GroupChatValidation";
import { GROUP_CHAT_URL } from "@/lib/apiEndpoints";
import { clearCache } from "@/app/actions/common";

export default function EditGroupChat({
  user,
  group,
  open,
  setOpen,
}: {
  user: CustomUser;
  group: ChatGroupType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: yupResolver(createChatSchema),
  });

  useEffect(() => {
    setValue("title", group.title);
    setValue("passCode", group.passCode);
  }, [group]);

  const onSubmit = async (payload: createChatSchemaType) => {
    // console.log("The payload is", payload);
    try {
      setLoading(true);
      const { data } = await axios.put(`${GROUP_CHAT_URL}/${group.id}`, payload, {
        headers: {
          Authorization: user.token,
        },
      });

      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        clearCache("dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passCode")} />
            <span className="text-red-400">{errors.passCode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}