"use client";

import { useState } from "react";
import Image from "next/image";

import { LoginFormProps } from "@/types/types";

import LoginForm from "../module/LoginForm";

import { useToast } from "@/hooks/use-toast";

function LoginPage() {
  const { toast } = useToast();

  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "email" ? value.trim().toLowerCase() : value.trim(),
    });
  };

  const loginHandler = async () => {
    const loginRes = await fetch("/api/auth/register-user", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await loginRes.json();

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

      location.replace("/");
    }
  };

  return (
    <>
      <div className="w-[calc(100%-4px)] flex flex-col items-center justify-start gap-2 bg-secondary rounded-md my-4 mx-auto py-4 px-1 shadow sm:w-4/6">
        <Image
          src="/images/new-logo.png"
          width={200}
          height={150}
          alt="logo"
          className="w-44 mb-4 rounded"
          priority={true}
        ></Image>

        <p className="w-full text-center capitalize mb-2">
          login or register your account
        </p>

        <Image
          src="/images/new-header-login.png"
          width={250}
          height={150}
          alt="login header image"
          className="w-56 flex items-center justify-center mb-4 "
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
