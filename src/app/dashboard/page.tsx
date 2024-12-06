import { redirect } from "next/navigation";
import { Suspense } from "react";

import findUser from "@/serverAction/findUser";

import DashboardPage from "@/components/template/DashboardPage";
import Loader from "@/components/element/Loader";

async function Dashboard() {
  const user = await findUser();
  if ("error" in user) redirect("/");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <DashboardPage user={user} />
      </Suspense>
    </>
  );
}

export default Dashboard;
