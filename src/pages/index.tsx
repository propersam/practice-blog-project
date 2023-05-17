/* eslint-disable react/no-unknown-property */
import MainLayoutComponent from "@/components/layouts/MainLayout";
import PostComponent from "@/components/Post";
import { useFetchPosts } from "@/hooks/useDataFetch";
import { Post } from "@/types";
import React, { ReactFragment } from "react";

const Blog = () => {
  const { posts, loading } = useFetchPosts();

  return (
    <>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {loading ? (
            <div className="animate-pulse">Fetching posts...</div>
          ) : (
            (posts as Post[])?.map((post) => (
              <div className="post" key={post.id}>
                <PostComponent post={post} />
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
    </>
  );
};

export default Blog;

Blog.getLayout = (page: ReactFragment) => (
  <MainLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Blog-Feed",
    }}
  >
    {page}
  </MainLayoutComponent>
);
