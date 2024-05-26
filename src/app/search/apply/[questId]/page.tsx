"use client";
import { supabase } from "@/app/utils/db";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";

interface Question {
  id: string;
  label: string;
}

const questions: Question[] = [
  { id: "answer1", label: "Question 1:" },
  { id: "answer2", label: "Question 2:" },
  { id: "answer3", label: "Question 3:" },
];

function Page({ params }: { params: { questId: string } }) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase
      .from("app_user_connections")
      .update({ survey: answers })
      .eq("quest_id", params.questId);
    //
    router.push("/search");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <Box key={question.id} marginBottom={2}>
              <TextField
                id={question.id}
                name={question.id}
                label={question.label}
                value={answers[question.id] || ""}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              backgroundColor: "#19473f",
              color: "#fff",
              mt: 2,
              mb: -2,
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Page;
