"use client";
import React, { useState } from "react";

interface Question {
  id: string;
  label: string;
}

const questions: Question[] = [
  { id: "answer1", label: "Question 1:" },
  { id: "answer2", label: "Question 2:" },
  { id: "answer3", label: "Question 3:" },
];

const Page: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mocked submission logic
    console.log("Answers:", answers);
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <label htmlFor={question.id}>{question.label}</label>
            <input
              type="text"
              id={question.id}
              name={question.id}
              value={answers[question.id] || ""}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
