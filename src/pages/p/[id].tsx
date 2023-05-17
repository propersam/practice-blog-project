/* eslint-disable react/no-unknown-property */
import MainLayoutComponent from "@/components/layouts/MainLayout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFetchPosts } from "@/hooks/useDataFetch";
import { postService } from "@/services";
import { Post } from "@/types";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import React, { ReactFragment } from "react";
import ReactMarkdown from "react-markdown";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log("params");
  const resp = await postService.fetchData(`/${params?.id}`);
  console.log("received post: ", resp.data);

  return {
    props: resp.data,
  };
};

const PostDetail = () => {
  const router = useRouter();
  const { user: userSession, loading } = useCurrentUser();
  async function publishPost(id: string): Promise<void> {
    await postService.updateData(`/publish/${id}`);
    await Router.push("/");
  }
  const postId = router.query["id"];
  console.log("post id: ", postId);

  const { posts } = useFetchPosts(`/${postId}`);
  const post = posts as Post;

  if (loading) {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = () => !!userSession?.id;
  const postBelongsToUser = () => userSession?.id === post?.author?.id;
  let title = post?.title;
  if (!post?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>By {post?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
        {!post?.published && userHasValidSession() && postBelongsToUser() && <button onClick={() => publishPost(post?.id)}>Publish</button>}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default PostDetail;

PostDetail.getLayout = (page: ReactFragment) => (
  <MainLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Posts-Detail",
    }}
  >
    {page}
  </MainLayoutComponent>
);
