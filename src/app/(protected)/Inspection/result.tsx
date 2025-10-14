"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";

type InspectionData = {
  extractedMarking: string;
  imageUrl: string;
  isGenuine: boolean;
  mlProcessingTime: number;
  numBoxes: number;
  result: string;
  submittedAt: string;
  verified: boolean;
};

interface ResultDialogProps {
  data: any;
  open: boolean;
}

export function ResultDialog({ data, open }: ResultDialogProps) {
  const [openform, setOpen] = useState(open);
  const {
    extractedMarking,
    imageUrl,
    isGenuine,
    mlProcessingTime,
    numBoxes,
    result,
    submittedAt,
    verified,
  } = data;

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">View Result</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Inspection Result
          </DialogTitle>
          <DialogDescription>
            Detailed information of the inspection process.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Image Section
          <div className="w-full h-64 relative rounded-lg overflow-hidden border">
            <Image
              src={`/${imageUrl}`} // Adjust path if needed
              alt="Inspected IC"
              fill
              className="object-cover"
            />
          </div> */}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Extracted Marking</p>
              <p className="font-medium">{extractedMarking}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Result</p>
              <Badge
                className={`${
                  result === "fake"
                    ? "bg-red-500 hover:bg-red-500"
                    : "bg-green-500 hover:bg-green-500"
                } text-white`}
              >
                {result}
              </Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Genuine</p>
              <p
                className={`font-medium ${
                  isGenuine ? "text-green-600" : "text-red-600"
                }`}
              >
                {isGenuine ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Verified</p>
              <p className="font-medium">{verified ? "True" : "False"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">ML Processing Time</p>
              <p className="font-medium">{mlProcessingTime} sec</p>
            </div>

            <div>
              <p className="text-muted-foreground">Number of Boxes</p>
              <p className="font-medium">{numBoxes}</p>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground">Submitted At</p>
              <p className="font-medium">
                {new Date(submittedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="text-black"
            onClick={() => {
              setOpen(false);
            }}
          >
            {" "}
            Save{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
