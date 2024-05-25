import React, { useState } from "react";

const Route: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = () => {
    // Mock API submission
    console.log("Submitting:", { topic, duration });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Route;
