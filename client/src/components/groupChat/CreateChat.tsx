"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/GroupChatValidation";
import { Input } from "../ui/input";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { GROUP_CHAT_URL } from "@/lib/apiEndpoints";
import { clearCache } from "@/app/actions/common";

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: yupResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);
      const {data} = await axios.post(
        GROUP_CHAT_URL,
        {
          ...payload,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        });

        if(data?.message){
            clearCache("dashboard");
            setOpen(false);
            toast.success(data?.message);
        }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New group</DialogTitle>
          <DialogDescription>Create a new chat group</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-500">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passCode")} />
            <span className="text-red-500">{errors.passCode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
