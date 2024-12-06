import { redirect } from "next/navigation";

import checkSession from "@/serverAction/checkSession";

function page() {
  const session = checkSession();
  if ("error" in session) redirect("/login");
  return <div>Dashboard</div>;
}

export default page;
