"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { addNewProjectSchema } from "@/app/features/dashboard/utils/validationSchema";
import { useProjectDetails } from "@/app/features/projects/api/useProjectDetails";
import { useUpdateProject } from "@/app/features/projects/api/useUpdateProject";
import { useCreateProject } from "@/app/features/projects/api/useCreateProject";
import { UploadPhotoSection } from "@/app/components/UploadPhotoSection";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { AddProjectForm } from "@/app/features/projects/types";
import { InputField } from "@/app/components/form/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/Button";
import { UploadedImage } from "@/app/types";
import { WysiwygField } from "@/app/components/form/WysiwygField";

const NewProjectPage = () => {
  const [files, setGetSuccessfulUploadsFn] = React.useState<UploadedImage[]>(
    []
  );
  const [existingImgs, setExistingImgs] = React.useState<UploadedImage[]>([]);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const params = useSearchParams().get("id");
  const route = useRouter();

  const { mutate: mutateProject, isPending: isPendingProject } =
    useCreateProject();
  const { mutate: mutateEditProject, isPending: isPendingEditProject } =
    useUpdateProject(params || "");
  const { data: projectDetailsData, isPending: detailsPending } =
    useProjectDetails(params || "");
  const projectDetails = projectDetailsData?.data;

  const editMode = !!params;
  const [removeAllFilesFn, setRemoveAllFilesFn] = React.useState<() => void>();

  const {
    register,
    reset,
    setValue,
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
    const mergedImages: UploadedImage[] = editMode
      ? [...existingImgs, ...files]
      : files;

    const payload = {
      title: values.title,
      description: values.description,
      imgUrls: mergedImages,
    };

    if (editMode) {
      mutateEditProject(payload, {
        onSuccess: () => {
          reset();
          setGetSuccessfulUploadsFn([]);
          setExistingImgs([]);
          removeAllFilesFn?.();
          route.push("/godmode/projects");
        },
      });
    } else {
      mutateProject(payload, {
        onSuccess: () => {
          reset();
          setGetSuccessfulUploadsFn([]);
          setExistingImgs([]);
          removeAllFilesFn?.();
        },
      });
    }
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
      setExistingImgs(existingFiles);
    }
  }, [projectDetails, editMode, setValue]);

  const handleDeleteExistingImg = (publicId: string) => {
    setExistingImgs((prev) => prev.filter((img) => img.publicId !== publicId));
  };

  if (!!params && detailsPending) {
    return <FullPageLoader className="h-[60vh]! " />;
  }
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
          <WysiwygField
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
            <div className="flex items-center gap-4 mb-8 mt-1">
              {" "}
              {existingImgs?.map((fileState) => (
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
                      onClick={() =>
                        handleDeleteExistingImg(fileState.publicId)
                      }
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
          isLoading={isPendingProject || uploading || isPendingEditProject}
          type="submit"
          variant="secondary"
          className="rounded-md! mt-6 px-10! sm:"
        >
          {uploading
            ? "Media Uploading..."
            : isPendingProject
              ? "Submitting..."
              : isPendingEditProject
                ? "Updating..."
                : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default NewProjectPage;
