import { UserInfo } from "@/types/types";
import InformationSection from "../module/InformationSection";

function DashboardPage({ user }: { user: UserInfo }) {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <strong className="capitalize text-primary">Information</strong>
        <InformationSection user={user} />
        <strong className="capitalize text-primary">Your Musics</strong>
        <strong className="capitalize text-primary">Liked Musics</strong>
        <strong className="capitalize text-primary">Add Music</strong>
      </div>
    </>
  );
}

export default DashboardPage;
