/* eslint-disable react/no-unknown-property */
import { postService } from "@/services";
import Router from "next/router";
import React, { ReactFragment, useState } from "react";

import MainLayoutComponent from "../components/layouts/MainLayout";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = { title, content };
    await postService.createData(body).then(async () => {
      await Router.push("/drafts");
    });
  };

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input autoFocus onChange={(e) => setTitle(e.target.value)} placeholder="Title" type="text" value={title} />
          <textarea cols={50} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={8} value={content} />
          <input disabled={!!content == false || !!title == false} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default Create;

Create.getLayout = (page: ReactFragment) => (
  <MainLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Posts-Create",
    }}
  >
    {page}
  </MainLayoutComponent>
);