/* eslint-disable react/no-unknown-property */
import Layout from "@/components/layouts/MainLayout";
import Post from "@/components/Post";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFetchPosts } from "@/hooks/useDataFetch";
import React from "react";

const Drafts = () => {
  const { posts: drafts } = useFetchPosts("/drafts");
  const { user: userSession } = useCurrentUser();

  if (!userSession) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div className="post" key={post.id}>
              <Post post={post} />
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
    </Layout>
  );
};

export default Drafts;
