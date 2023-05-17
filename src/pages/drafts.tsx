/* eslint-disable react/no-unknown-property */
import MainLayoutComponent from "@/components/layouts/MainLayout";
import PostComponent from "@/components/Post";
import { useFetchPosts } from "@/hooks/useDataFetch";
import { Post } from "@/types";
import React, { ReactFragment } from "react";


const Drafts = () => {
  const { posts: drafts } = useFetchPosts("/drafts");

  return (
    <>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {(drafts as Post[]).map((post) => (
            <div className="post" key={post.id}>
              <PostComponent post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default Drafts;

Drafts.getLayout = (page: ReactFragment) => (
  <MainLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Posts-Draft",
    }}
  >
    {page}
  </MainLayoutComponent>
);
