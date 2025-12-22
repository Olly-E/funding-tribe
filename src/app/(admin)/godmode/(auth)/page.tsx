"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import React from "react";

import { loginSchema } from "@/app/features/auth/utils/validationSchema";
import { InputField } from "@/app/components/form/InputField";
import { useLogin } from "@/app/features/auth/apis/useLogin";
import { LoginFormProps } from "@/app/features/auth/types";
import { tokenStorage } from "@/app/utils/storage";
import { useToggle } from "@/app/hooks/useToggle";
import { Button } from "@/app/components/Button";

const Page = () => {
  const { show, handleToggle } = useToggle();
  const { mutate, isPending } = useLogin();
  const [checked, setChecked] = React.useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: LoginFormProps) => {
    mutate(values, {
      onSuccess: () => {
        router.push("");
        toast.success("Login Successful");
      },
    });
  };
  React.useEffect(() => {
    const token = tokenStorage.getToken();
    if (token) {
      router.replace("/godmode/projects");
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;
  
  return (
    <div className="centered h-full">
      <form
        className="w-[425px] p-[30px]  h-fit bg-white shadow-sm mt-20 border border-white/10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="bg-black/10 rounded-md px-2 py-[3px] text-xs w-fit mx-auto">
          ADMIN AREA
        </p>

        <h1 className="text-[32px] text-black text-center leading-[34.56px]">
          Enter email
        </h1>
        <p className="text-black text-center mt-4">
          Welcome to Funding Tribe Admin
        </p>
        <div className="mt-6">
          <InputField
            registration={{ ...register("email") }}
            hasError={errors.email}
            className="bg-[#434343] text-black"
            isRequired
            label="Email"
            type="email"
            placeholder=""
          />
        </div>
        <div className="my-6">
          <InputField
            registration={{ ...register("password") }}
            hasError={errors.password}
            className="bg-[#434343] text-black"
            isRequired
            label="Password"
            type={show ? "text" : "password"}
            placeholder=""
            handleShowPassword={handleToggle}
            withIcon
          />
        </div>
        {/* <Link
          className="text-gray-4 mt-4 text-xs flex justify-end"
          href="/forgot-password"
        >
          Forgot password
        </Link> */}
        <Button
          isLoading={isPending}
          disabled={isPending}
          type="submit"
          variant="secondary"
          className="rounded-none! w-full mt-8"
        >
          {isPending ? "Logging in..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default Page;
