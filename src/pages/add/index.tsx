import React, { useState } from "react";
import client from "../../lib/contentful";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entry = await client.createEntry("page", {
        fields: {
          title: {
            "en-US": title,
          },
          content: {
            "en-US": content,
          },
        },
      });
      setMessage("Page created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      setMessage("Error creating page.");
    }
  };

  return (
    <div>
      <h1>Add Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Page</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPage;
