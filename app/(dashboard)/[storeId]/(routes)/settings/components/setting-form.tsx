"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { store } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";

interface SettingFormProps {
  initialData: store;
}

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* {JSON.stringify(initialData)} */}
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          disabled={false}
          variant="destructive"
          size="sm"
          onClick={() => {}}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default SettingForm;
