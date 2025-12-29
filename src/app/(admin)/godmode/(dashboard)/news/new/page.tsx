"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { addNewNewsSchema } from "@/app/features/dashboard/utils/validationSchema";
import { useNewsDetails } from "@/app/features/news/api/useAdminNewsDetails";
import { UploadPhotoSection } from "@/app/components/UploadPhotoSection";
import { useCreateNews } from "@/app/features/news/api/useCreateNews";
import { useUpdateNews } from "@/app/features/news/api/useUpdateNews";
import { WysiwygField } from "@/app/components/form/WysiwygField";
import { FullPageLoader } from "@/app/components/FullPageLoader";
import { InputField } from "@/app/components/form/InputField";
import { Button } from "@/app/components/Button";
import { UploadedImage } from "@/app/types";

const NewNewsPage = () => {
  const [files, setGetSuccessfulUploadsFn] = React.useState<UploadedImage[]>(
    []
  );
  const [existingImgs, setExistingImgs] =
    React.useState<UploadedImage | null>();
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [editorResetKey, setEditorResetKey] = React.useState(0);

  const params = useSearchParams().get("id");
  const route = useRouter();

  const { mutate: mutateNews, isPending: isPendingCreateNews } =
    useCreateNews();
  const { mutate: mutateEditNews, isPending: isPendingEditNews } =
    useUpdateNews(params || "");
  const { data: newsDetailsData, isPending: detailsPending } = useNewsDetails(
    params || ""
  );
  const newsDetails = newsDetailsData?.data;

  const editMode = !!params;
  const [removeAllFilesFn, setRemoveAllFilesFn] = React.useState<() => void>();


  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addNewNewsSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = (values: {
    title: string;
    description: string;
    category: string;
  }) => {
    const mergedImages: UploadedImage[] = editMode
      ? files.length === 0
        ? ([existingImgs].filter(
            (img) => img !== null && img !== undefined
          ) as UploadedImage[])
        : files
      : files;
    const payload = {
      title: values.title,
      description: values.description,
      category: values.category,
      imgUrl: mergedImages[0],
    };

    if (editMode) {
      mutateEditNews(payload, {
        onSuccess: () => {
          reset({ title: "", description: "", category: "" });
          setGetSuccessfulUploadsFn([]);
          setExistingImgs(null);
          removeAllFilesFn?.();
          setEditorResetKey((k) => k + 1);
          route.push("/godmode/news");
        },
      });
    } else {
      mutateNews(payload, {
        onSuccess: () => {
          reset({
            title: "",
            description: "",
            category: "",
          });
          setEditorResetKey((k) => k + 1);
          setGetSuccessfulUploadsFn([]);
          setExistingImgs(null);
          removeAllFilesFn?.();
        },
      });
    }
  };
  React.useEffect(() => {
    if (editMode && newsDetails) {
      setValue("title", newsDetails.title);
      setValue("description", newsDetails.description);
      setValue("category", newsDetails.category);
      const existingFiles: UploadedImage = newsDetails.imgUrl;
      setExistingImgs(existingFiles);
    }
  }, [newsDetails, editMode, setValue]);

  const description = watch("description");

  const handleDeleteExistingImg = () => {
    setExistingImgs(null);
  };

  if (detailsPending && editMode) {
    return <FullPageLoader className="h-[60vh]! " />;
  }
  return (
    <form className="sm:px-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:w-[644px] mx-auto my-[25px] px-6 sm:px-[50px] sm:rounded-[20px] border-y border-y-black sm:border sm:border-black bg-[#FFFFFF] py-6 sm:py-[50px]">
        <Link
          href="/godmode/news"
          className="hover:bg-black size-9 mb-4 centered rounded-full group group-hover:bg-black transition-colors"
        >
          <ArrowLeft size={24} className="text-black group-hover:text-white" />
        </Link>
        <h1 className="text-[24px]! mt-6">Add new news</h1>
        <p>Add news details below</p>
        <div className="">
          <p className="mt-3.5 text-sm font-semibold">Image</p>
          <UploadPhotoSection
            multiple={false}
            setGetSuccessfulUploads={setGetSuccessfulUploadsFn}
            setUploading={setUploading}
            setRemoveAllFiles={setRemoveAllFilesFn}
          />
          {editMode && (
            <div className="flex items-center gap-4 mb-8 mt-6">
              {existingImgs && (
                <div className="relative size-[100px] w-[100px] rounded-md overflow-hidden">
                  <Image
                    src={existingImgs?.url}
                    alt="file-name"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteExistingImg}
                    className="size-6 centered right-1 top-1 absolute transition-colors bg-white rounded-full"
                  >
                    <Trash2 size={12} className="text-red-state" />
                  </button>
                </div>
              )}
            </div>
          )}
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
          <WysiwygField
            id="description"
            label="Description"
            value={description}
            clearSignal={editorResetKey}
            hasError={errors.description}
            isRequired
            onChange={(val) =>
              setValue("description", val, { shouldValidate: true })
            }
          />
        </div>
        <Button
          disabled={uploading}
          isLoading={isPendingCreateNews || uploading || isPendingEditNews}
          type="submit"
          variant="secondary"
          className="rounded-md! mt-6 px-10! sm:"
        >
          {uploading
            ? "Media Uploading..."
            : isPendingCreateNews
              ? "Submitting..."
              : isPendingEditNews
                ? "Updating..."
                : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default NewNewsPage;
