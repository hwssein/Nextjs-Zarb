import { Suspense } from "react";
import { redirect } from "next/navigation";
import checkSession from "@/serverAction/auth/checkSession";

import LoginPage from "@/components/template/LoginPage";

import Loader from "@/components/element/animation/Loader";

function Login() {
  const session = checkSession();
  if ("email" in session) redirect("/dashboard");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    </>
  );
}

export default Login;
