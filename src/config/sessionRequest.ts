import { cookies } from "next/headers";

const sessionRequest = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/auth/find-user`, {
    method: "POST",
    body: JSON.stringify({ token: token || "" }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const user = await res.json();

  return user;
};

export default sessionRequest;
