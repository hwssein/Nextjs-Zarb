import { UserInfo } from "@/types/types";
import InformationSection from "../module/InformationSection";
import AddMusicSection from "../module/AddMusicSection";

function DashboardPage({ user }: { user: UserInfo }) {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <strong className="capitalize font-semibold">Information</strong>
        <InformationSection user={user} />

        <strong className="capitalize font-semibold">Add Music</strong>
        <AddMusicSection />
      </div>
    </>
  );
}

export default DashboardPage;
