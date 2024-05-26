"use client";
import { Tables } from "@/app/supabase";
import { supabase } from "@/app/utils/db";
import React, { useEffect, useState } from "react";
import { Container, Box, Button } from "@mui/material";

interface PageProps {
  params: { requestId: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [request, setRequest] = useState<Tables<"mentor_requests">>();

  useEffect(() => {
    const fetchRequest = async () => {
      const { data, error } = await supabase
        .from("mentor_requests")
        .select("*")
        .eq("connection_id", params.requestId)
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
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Review Request</h1>
        <p>mentee: {request?.mentee_username}</p>
        <p>(socials): {JSON.stringify(request?.mentee_social || {})}</p>
        <p>survey response: {JSON.stringify(request?.mentee_survey || {})}</p>
        <p>Request ID: {params.requestId}</p>
        {request?.request_status === null ? (
          <Box>
            <Button variant="contained" color="primary" onClick={handleApprove}>
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReject}
            >
              Reject
            </Button>
          </Box>
        ) : (
          <p>
            {request?.request_status ? "Request approved" : "Request rejected"}
          </p>
        )}
      </Box>
    </Container>
  );
};

export default Page;
