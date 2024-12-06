"use client";

import logoutAccount from "@/serverAction/logoutAccount";
import { Button } from "../ui/button";

function LogoutButton() {
  return (
    <>
      <Button size="sm" onClick={() => logoutAccount()}>
        Logout
      </Button>
    </>
  );
}

export default LogoutButton;
