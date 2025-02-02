import Link from "next/link";
import { Button } from "../ui/button";

function InformationSection({
  user,
}: {
  user: { email: string; createdAt: string; role: string };
}) {
  const date = new Date(user.createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return (
    <section className="w-full p-2 flex flex-col items-start justify-start gap-2 rounded-md border border-stroke shadow-sm">
      <div className="w-full flex items-center gap-1 font-light">
        <span>Email:</span>
        <span>{user.email}</span>
      </div>

      {user.role === "ADMIN" && (
        <div className="flex items-center justify-start gap-1 font-light">
          <span>Role:</span>
          <span>{user.role}</span>
        </div>
      )}

      <div className="w-full flex items-center gap-1 font-light">
        <span>Register Date:</span>
        <span>{`${year}-${month}-${day}`}</span>
      </div>

      <div className="w-full flex items-center justify-evenly gap-2 mt-2">
        <Link href="/dashboard/my-music">
          <Button variant="secondary" size="sm" className="font-light">
            My Musics
          </Button>
        </Link>

        {user.role === "ADMIN" && (
          <Link href="/admin">
            <Button variant="secondary" size="sm" className="font-light">
              Admin Page
            </Button>
          </Link>
        )}

        <Link href="/dashboard/liked-music">
          <Button variant="secondary" size="sm" className="font-light">
            Liked Musics
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default InformationSection;
