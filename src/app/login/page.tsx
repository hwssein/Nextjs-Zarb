import { Suspense } from "react";
import { redirect } from "next/navigation";
import checkSession from "@/serverAction/checkSession";

import LoginPage from "@/components/template/LoginPage";

import Loader from "@/components/element/Loader";

async function Login() {
  const session = await checkSession();
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
