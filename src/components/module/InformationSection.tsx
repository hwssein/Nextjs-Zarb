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
    <section className="w-full bg-secondary py-1 px-2 flex flex-col items-start justify-start gap-1 rounded-md border border-stroke">
      <div className="w-full flex items-center gap-1 font-light">
        <span>Email:</span>
        <span>{user.email}</span>
      </div>
      <div className="w-full flex items-center gap-1 font-light">
        <span>Role:</span>
        <span>{user.role}</span>
      </div>
      <div className="w-full flex items-center gap-1 font-light">
        <span>Register Date:</span>
        <span>{`${year}-${month}-${day}`}</span>
      </div>

      <div className="w-full flex items-center justify-end">
        <Button size="sm">Logout</Button>
      </div>
    </section>
  );
}

export default InformationSection;
