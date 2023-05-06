/* eslint-disable react/no-unknown-property */
import Layout from "@/components/layouts/MainLayout";
import Post from "@/components/Post";
import { useFetchPosts } from "@/hooks/useDataFetch";
import React from "react";

const Blog = () => {
  const { posts, loading } = useFetchPosts();

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {loading ? (
            <div className="animate-pulse">Fetching posts...</div>
          ) : (
            posts.map((post) => (
              <div className="post" key={post.id}>
                <Post post={post} />
              </div>
            ))
          )}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
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

export default Blog;
