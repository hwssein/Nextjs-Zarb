import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import LoginPage from "@/components/template/LoginPage";

import Loader from "@/components/element/animation/Loader";

async function Login() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
    method: "POST",
    body: JSON.stringify({ token: token || "" }),
    headers: { "Content-Type": "application/json" },
    cache: "reload",
  });
  const user = await res.json();

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
