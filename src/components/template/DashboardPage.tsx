import { UserInfo } from "@/types/types";
import InformationSection from "../module/InformationSection";
import AddMusicSection from "../module/AddMusicSection";
import LogoutButton from "../element/LogoutButton";

function DashboardPage({ user }: { user: UserInfo }) {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <strong className="capitalize font-semibold">Information</strong>
        <InformationSection user={user} />

        <strong className="capitalize font-semibold">Add Music</strong>
        <AddMusicSection />

        <div className="w-full flex items-center justify-end mt-2">
          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
