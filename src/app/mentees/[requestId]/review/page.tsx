"use client";
import { Tables } from "@/app/supabase";
import { supabase } from "@/app/utils/db";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: { requestId: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [request, setRequest] = useState<Tables<"app_user_connections">>();

  useEffect(() => {
    const fetchRequest = async () => {
      const { data, error } = await supabase
        .from("app_user_connections")
        .select("*")
        .eq("id", params.requestId)
        .single();

      if (error) {
        console.error("Error fetching request", error);
        return;
      }

      setRequest(data);
    };

    fetchRequest();
  }, []);

  const handleApprove = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Make a backend request to approve the request with the given ID
      // You can mock this request for testing purposes
      // Example: await axios.post(`/api/requests/${requestId}/approve`);
      console.log(`Approved request with ID: ${params.requestId}`);
      await supabase
        .from("app_user_connections")
        .update({ accepted: true })
        .eq("id", params.requestId);
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleReject = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Make a backend request to reject the request with the given ID
      // You can mock this request for testing purposes
      // Example: await axios.post(`/api/requests/${requestId}/reject`);
      console.log(`Rejected request with ID: ${params.requestId}`);
      await supabase
        .from("app_user_connections")
        .update({ accepted: false })
        .eq("id", params.requestId);
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  return (
    <div>
      <h1>Review Request</h1>
      <p>Request ID: {params.requestId}</p>
      {request?.accepted === null ? (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      ) : (
        <p>{request?.accepted ? "Request approved" : "Request rejected"}</p>
      )}
    </div>
  );
};

export default Page;