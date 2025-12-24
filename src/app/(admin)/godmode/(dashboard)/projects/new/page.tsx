"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { addNewProjectSchema } from "@/app/features/dashboard/utils/validationSchema";
import { useProjectDetails } from "@/app/features/projects/api/useProjectDetails";
import { useCreateProject } from "@/app/features/projects/api/useCreateProject";
import { UploadPhotoSection } from "@/app/components/UploadPhotoSection";
import { TextAreaField } from "@/app/components/form/TextAreaField";
import { AddProjectForm } from "@/app/features/projects/types";
import { InputField } from "@/app/components/form/InputField";
import { useSearchParams } from "next/navigation";
import { Button } from "@/app/components/Button";
import { UploadedImage } from "@/app/types";
import Image from "next/image";

const NewProjectPage = () => {
  const [files, setGetSuccessfulUploadsFn] = React.useState<UploadedImage[]>(
    []
  );
  const [uploading, setUploading] = React.useState<boolean>(false);
  const params = useSearchParams().get("id");

  const { mutate: mutateProject, isPending: isPendingProject } =
    useCreateProject();
  const { data: projectDetailsData, isPending: detailsPending } =
    useProjectDetails(params || "");
  const projectDetails = projectDetailsData?.data;

  const editMode = !!params;
  const [removeAllFilesFn, setRemoveAllFilesFn] = React.useState<() => void>();

  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectForm>({
    resolver: zodResolver(addNewProjectSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: { title: string; description: string }) => {
    const payload = {
      title: values.title,
      description: values.description,
      imgUrls: files,
    };

    mutateProject(payload, {
      onSuccess: () => {
        reset();
        setGetSuccessfulUploadsFn([]);
        removeAllFilesFn?.();
      },
    });
  };

  React.useEffect(() => {
    if (editMode && projectDetails) {
      setValue("title", projectDetails.title);
      setValue("description", projectDetails.description);

      const existingFiles: UploadedImage[] = (projectDetails.imgUrls || []).map(
        (img: { url: string; publicId: string }) => ({
          url: img.url,
          publicId: img.publicId,
        })
      );
      setGetSuccessfulUploadsFn(existingFiles);
    }
  }, [projectDetails, editMode, setValue]);

  const handleDeleteImg = (fileState: string) => {};

  return (
    <form className="px-6" onSubmit={handleSubmit(onSubmit)}>
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
          {editMode && (
            <div>
              {" "}
              {files?.map((fileState) => (
                <div key={fileState.publicId}>
                  <div className="relative size-[100px] w-[100px] rounded-md overflow-hidden">
                    <Image
                      src={fileState.url}
                      alt="file-name"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImg(fileState.publicId)}
                      className="size-6 centered right-1 top-1 absolute transition-colors bg-white rounded-full"
                    >
                      <Trash2 size={12} className="text-red-state" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <UploadPhotoSection
            setGetSuccessfulUploads={setGetSuccessfulUploadsFn}
            setUploading={setUploading}
            setRemoveAllFiles={setRemoveAllFilesFn}
          />
        </div>
        <Button
          disabled={uploading}
          isLoading={isPendingProject || uploading}
          type="submit"
          variant="secondary"
          className="rounded-md! mt-6 px-10! sm:"
        >
          {uploading
            ? "Media Uploading..."
            : isPendingProject
              ? "Submitting..."
              : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default NewProjectPage;
