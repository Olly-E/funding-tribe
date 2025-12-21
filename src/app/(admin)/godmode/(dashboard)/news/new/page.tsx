"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import React from "react";

import { addNewNewsSchema } from "@/app/features/dashboard/utils/validationSchema";
import { UploadPhotoSection } from "@/app/components/UploadPhotoSection";
import { TextAreaField } from "@/app/components/form/TextAreaField";
import { InputField } from "@/app/components/form/InputField";
import { Button } from "@/app/components/Button";

const NewNewsPage = () => {
  const [, setFileUrl] = React.useState<string | string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addNewNewsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <div className="w-[644px] mx-auto my-[25px] px-[50px] rounded-[20px] border border-black bg-[#FFFFFF] py-[50px]">
      <ArrowLeft size={24} color="#000000" />
      <h1 className="text-[24px]! mt-6">Add new news</h1>
      <p>Add news details below</p>
      <div className="">
        <p className="mt-3.5 text-sm font-semibold">Image</p>
        <UploadPhotoSection onUploadSuccess={(url) => setFileUrl(url)} />
      </div>
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
        <InputField
          registration={{ ...register("category") }}
          hasError={errors.category}
          className="bg-[#434343] text-black"
          isRequired
          label="Category"
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
      <Button
        type="submit"
        variant="secondary"
        className="rounded-md! mt-6 px-10!"
      >
        Done
      </Button>
    </div>
  );
};

export default NewNewsPage;
