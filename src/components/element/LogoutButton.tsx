"use client";

import logoutAccount from "@/serverAction/auth/logoutAccount";
import { Button } from "../ui/button";

function LogoutButton() {
  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => logoutAccount()}>
        Logout
      </Button>
    </>
  );
}

export default LogoutButton;
