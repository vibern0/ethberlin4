import { supabase } from "@/app/utils/db";
import React from "react";

interface PageProps {
  requestId: string;
}

const Page: React.FC<PageProps> = ({ requestId }) => {
  const handleApprove = async () => {
    try {
      // Make a backend request to approve the request with the given ID
      // You can mock this request for testing purposes
      // Example: await axios.post(`/api/requests/${requestId}/approve`);
      console.log(`Approved request with ID: ${requestId}`);
      await supabase
        .from("app_user_connections")
        .update({ accepted: true })
        .eq("id", requestId);
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Make a backend request to reject the request with the given ID
      // You can mock this request for testing purposes
      // Example: await axios.post(`/api/requests/${requestId}/reject`);
      console.log(`Rejected request with ID: ${requestId}`);
      await supabase
        .from("app_user_connections")
        .update({ accepted: false })
        .eq("id", requestId);
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  return (
    <div>
      <h1>Review Request</h1>
      <p>Request ID: {requestId}</p>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default Page;
