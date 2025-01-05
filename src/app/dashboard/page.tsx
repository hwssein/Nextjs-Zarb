import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import DashboardPage from "@/components/template/DashboardPage";
import Loader from "@/components/element/animation/Loader";

async function Dashboard() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
    method: "POST",
    body: JSON.stringify({ token: token || "" }),
    headers: { "Content-Type": "application/json" },
    cache: "reload",
  });
  const user = await res.json();

  if (user.error) redirect("/login");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <DashboardPage user={user} />
      </Suspense>
    </>
  );
}

export default Dashboard;
