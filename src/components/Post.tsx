import Router from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export default Post;
