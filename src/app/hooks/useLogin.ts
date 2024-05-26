// hooks/useLogin.ts
import { useCallback } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { ZUAUTH_CONFIG } from "../utils/zupassConstants";
import { useUserContext } from "../../contexts/UserContext";
import { enqueueSnackbar } from "notistack";
import { supabase } from "../utils/db";

// Specify fields to request from Zopass.
const fieldsToReveal = {
  revealAttendeeEmail: true,
  revealAttendeeSemaphoreId: true,
};

export function useLogin() {
  const { loggedIn, setUserId, setUserEmail, setLoggedIn } = useUserContext();

  /**
   * Retrieve the PCD (Proof-Carrying Data) using Zopass Zero Knowledge Proof authentication.
   */
  const getProof = useCallback(async () => {
    const result = await zuAuthPopup({
      fieldsToReveal,
      watermark: BigInt(12345),
      config: ZUAUTH_CONFIG,
    });
    if (result.type === "pcd") {
      const pdc = JSON.parse(result.pcdStr).pcd;
      await sendPCDToServer(pdc);
    } else {
      enqueueSnackbar(
        "ZuPass authentication failed. Please report to the conference organizer.",
        { variant: "error" }
      );
    }
  }, []);

  /**
   * Verify the PCD on the backend.
   */
  const sendPCDToServer = async (pcd: any) => {
    let response;
    try {
      response = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          pcd: pcd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      enqueueSnackbar(`Error: ${e}`, { variant: "error" });
      return;
    }

    const data = await response.json();
    if (response.status !== 200) {
      enqueueSnackbar(`Error: ${data.message}`, { variant: "error" });
      return;
    }
    await supabase.from("app_user").upsert({
      identifier: JSON.parse(pcd).claim.partialTicket.attendeeSemaphoreId,
    });
    setUserId(JSON.parse(pcd).claim.partialTicket.attendeeSemaphoreId);
    setUserEmail(JSON.parse(pcd).claim.partialTicket.attendeeEmail);
    setLoggedIn(true);
  };

  return { login: getProof, loggedIn };
}
