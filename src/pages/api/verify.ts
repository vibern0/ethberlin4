import { ZKEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";
import { NextApiRequest, NextApiResponse } from "next";
import { isETHBerlinPublicKey } from "../../app/utils/zupassConstants";

/**
 * Verify that the participant is actually a ETH Berlin hacker.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pcd = await ZKEdDSAEventTicketPCDPackage.deserialize(req.body.pcd);

  if (!(await ZKEdDSAEventTicketPCDPackage.verify(pcd))) {
    console.error(`[ERROR] ZK ticket PCD is not valid`);

    return res.status(401).send("ZK ticket PCD is not valid");
  }

  if (!isETHBerlinPublicKey(pcd.claim.signer)) {
    console.error(`[ERROR] PCD is not signed by Zupass`);

    return res.status(401).send("PCD is not signed by ETHBerlin");
  }

  return res.status(200).json({ message: `🎉 PCD verified!` });
}
