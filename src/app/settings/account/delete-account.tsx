"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { useServerAction } from "zsa-react";

export const DeleteAccount = () => {
  const [deleteField, setDeleteField] = useState("");
  const [open, setOpen] = useState(false);
  const { execute, isPending, error } = useServerAction(deleteAccountAction);

  const optionalFields = {
    username: "reazn",
    name: "",
    email: "dddd@lew.ist",
  };

  const deleteString = Object.values(optionalFields).find((field) => {
    return field.trim().length >= 3;
  });

  return (
    <Card className="border-red-600">
      <CardHeader>
        <CardTitle>Delete Personal Account</CardTitle>
        <CardDescription>
          Permanently delete your personal account and all data associated with
          you. This action is non reversible, and data cannot be retrieved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger asChild>
            <Button className="bg-red-600" onClick={() => setOpen(true)}>
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Delete Account</DialogTitle>
              <DialogDescription>
                You are about to permanently delete your personal account and
                all data associated with you. This action non reversible, and
                data cannot be retrieved.
              </DialogDescription>
            </DialogHeader>
            <Label htmlFor="deleteField">
              Type{" "}
              <code className="border rounded-sm px-1 bg-muted">
                <strong>{deleteString}</strong>
              </code>{" "}
              to confirm:
            </Label>
            <input
              id="deleteField"
              className="h-9 pl-2 bg-transparent border outline-none rounded-md focus:border-muted-foreground w-full"
              value={deleteField}
              onChange={(e) => setDeleteField(e.target.value)}
            />
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteString !== deleteField}
                onClick={() => {
                  if (deleteString === deleteField) {
                    execute();
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
