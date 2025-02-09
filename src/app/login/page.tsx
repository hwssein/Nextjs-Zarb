import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import sessionRequest from "@/config/sessionRequest";

import LoginPage from "@/components/template/LoginPage";

import Loader from "@/components/element/animation/Loader";

export const metadata: Metadata = {
  title: "ZARBBEAT | SignUp Or Login",
};

async function Login() {
  const user = await sessionRequest();

  if (user.email) redirect("/dashboard");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    </>
  );
}

export default Login;
