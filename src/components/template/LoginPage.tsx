"use client";

import { useState } from "react";

import { Bool, FunctionResponse, LoginFormType } from "@/types/types";

import registerUser from "@/serverAction/registerUser";
import LoginForm from "../module/LoginForm";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState<Bool>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "email" ? value.trim().toLowerCase() : value.trim(),
    });
  };

  const loginHandler = async () => {
    const data: FunctionResponse = await registerUser(form);
    if (data.error)
      toast({
        description: data.error,
        variant: "destructive",
      });
    if (data.message) {
      toast({
        description: data.message,
      });
      setForm({ email: "", password: "" });

      router.replace("/");
    }
  };

  return (
    <>
      <div className="w-11/12 flex flex-col items-center justify-start gap-2 bg-secondary rounded-md my-4 mx-auto py-4 px-1 shadow sm:w-4/6">
        <Image
          src="/images/logo.png"
          width={300}
          height={200}
          alt="logo"
          className="w-44 mb-4 rounded"
          priority={true}
        ></Image>

        <p className="w-full text-center capitalize mb-2">
          login or register your account
        </p>

        <Image
          src="/images/header-login.png"
          width={300}
          height={200}
          alt="login header image"
          className="w-40 flex items-center justify-center mb-4 sm:w-48"
          priority={true}
        ></Image>

        <LoginForm
          form={form}
          changeHandler={changeHandler}
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
          loginHandler={loginHandler}
        />
      </div>
    </>
  );
}

export default LoginPage;
