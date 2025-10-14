"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  role: z.string().min(1, "Role is required."),
  status: z.boolean(),
  permission: z.enum(["edit", "delete", "write", "read"], {
    error: "Please select a permission.",
  }),
});

export function Add() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: false,
      permission: "read",
    },
  });

  const status = watch("status");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 text-white">
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="e.g. Admin, Developer"
              {...register("role")}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Status Switch */}
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="status">Status</Label>
            <Switch
              id="status"
              checked={status}
              onCheckedChange={(checked) => setValue("status", checked)}
            />
          </div>

          {/* Permission Select */}
          <div className="flex flex-col space-y-1">
            <Label>Permission</Label>
            <Select
              onValueChange={(value) => setValue("permission", value as any)}
              defaultValue="read"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
            {errors.permission && (
              <p className="text-sm text-red-500">
                {errors.permission.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
