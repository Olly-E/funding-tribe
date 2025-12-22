"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import { addNewProjectSchema } from "@/app/features/dashboard/utils/validationSchema";
import { UploadPhotoSection } from "@/app/components/UploadPhotoSection";
import { TextAreaField } from "@/app/components/form/TextAreaField";
import { InputField } from "@/app/components/form/InputField";
import { Button } from "@/app/components/Button";

const NewProjectPage = () => {
  const [, setFileUrl] = React.useState<string | string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addNewProjectSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <div className="px-6">
      <div className="md:w-[644px] mx-auto my-[25px] px-6 sm:px-[50px] rounded-[20px] border border-black bg-[#FFFFFF] py-6 sm:py-[50px]">
        <Link
          href="/godmode/projects"
          className="hover:bg-black size-9 centered rounded-full group group-hover:bg-black transition-colors"
        >
          <ArrowLeft size={24} className="text-black group-hover:text-white" />
        </Link>
        <h1 className="text-[24px]! mt-4">Add new project</h1>
        <p>Add project details below</p>
        <div className="mt-6">
          <InputField
            registration={{ ...register("title") }}
            hasError={errors.title}
            className="bg-[#434343] text-black"
            isRequired
            label="Tile"
            placeholder=""
          />
        </div>
        <div className="mt-6">
          <TextAreaField
            id="description"
            className="bg-none"
            label="Description"
            registration={{ ...register("description") }}
            hasError={errors.description}
            isRequired
          />
        </div>
        <div className="">
          <p className="mt-3.5 text-sm font-semibold">Image</p>
          <UploadPhotoSection onUploadSuccess={(url) => setFileUrl(url)} />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="rounded-md! mt-6 px-10! sm:"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default NewProjectPage;
