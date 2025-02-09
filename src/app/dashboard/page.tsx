import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";

import DashboardPage from "@/components/template/DashboardPage";
import Loader from "@/components/element/animation/Loader";
import sessionRequest from "@/config/sessionRequest";

export const metadata: Metadata = {
  title: "ZARBBEAT | Dashboard",
};

async function Dashboard() {
  const user = await sessionRequest();

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
