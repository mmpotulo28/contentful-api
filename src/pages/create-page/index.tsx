import { managementClient } from "@/lib/contentful";
import React, { useState } from "react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("/");
  const [topNavImage, setTopNavImage] = useState("");
  const [slices, setSlices] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // New state for status message
  const [pages, setPages] = useState<PageData[]>([]);

  interface PageData {
    title: string;
    url: string;
    topNavImage: string;
    slices: string;
  }

  interface ContentfulLink {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  }

  const handleMultipleSubmit = async (pages: PageData[]): Promise<void> => {
    try {
      setStatus("Submitting..."); // Update status to submitting
      const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
      if (!spaceId) {
        setMessage("Contentful Space ID is not defined");
        setStatus(""); // Reset status
        return;
      }
      const space = await managementClient.getSpace(spaceId);
      const environment = await space.getEnvironment("master");

      if (!environment) {
        setMessage("Environment not found");
        setStatus(""); // Reset status
        return;
      }

      const createdPages: string[] = [];
      for (const page of pages) {
        const data = {
          title: page.title,
          url: page.url,
          topNavImage: {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: page.topNavImage.trim(),
            },
          } as ContentfulLink,
          slices: page.slices.split(",")?.map((slice: string) => ({
            sys: {
              type: "Link",
              linkType: "Entry",
              id: slice.trim(),
            },
          })) as ContentfulLink[],
        };

        const entry = await environment.createEntry("CorePage", {
          fields: {
            title: {
              "en-US": data.title,
            },
            url: {
              "en-US": data.url,
            },
            topNavImage: {
              "en-US": data.topNavImage,
            },
            slices: {
              "en-US": data.slices,
            },
          },
        });

        createdPages.push(entry.sys.id);
      }

      setMessage(
        `Pages created successfully with IDs: ${createdPages.join(", ")}`
      );
      setStatus("Submission successful"); // Update status to successful
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error creating pages: ${error.message}`);
      } else {
        setMessage("An unknown error occurred");
      }
      setStatus("Submission failed"); // Update status to failed
    }
  };

  const addPage = () => {
    const newPage: PageData = { title, url, topNavImage, slices };
    setPages([...pages, newPage]);
    setTitle("");
    setUrl("/");
    setTopNavImage("");
    setSlices("");
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    handleMultipleSubmit(pages);
  };

  return (
    <div>
      <h1>Create Core Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPage();
        }}
      >
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Top Nav Image ID</label>
          <input
            type="text"
            value={topNavImage}
            onChange={(e) => setTopNavImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Slices (comma-separated IDs)</label>
          <input
            type="text"
            value={slices}
            onChange={(e) => setSlices(e.target.value)}
          />
        </div>
        <button type="submit">Add Page</button>
      </form>
      <div>
        <h2>Pages to be created:</h2>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              {page.title} - {page.url}
            </li>
          ))}
        </ul>
        {pages.length > 0 && (
          <button onClick={handleSubmitAll}>Submit All Pages</button>
        )}
      </div>
      {message && <p>{message}</p>}
      {status && <p>{status}</p>} {/* Display status message */}
    </div>
  );
};

export default CreatePage;
