/* eslint-disable react/no-unknown-property */
import Header from "@/components/organisms/Header";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { ReactNode } from "react";

// const inter = Inter({subsets: ['latin']})
// Dynamicaly import the AuthGuard component.
const AuthGuard = dynamic<{ children: ReactNode; readonly customText: React.ReactNode }>(() => import("../AuthGuard").then((mod) => mod.AuthGuard));

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Header />

    <AuthGuard
      // Our custom message to unauthorized users.
      customText={
        <p className="text-72 mb-24">
          You need to &nbsp;{" "}
          <Link className="text-primary underline cursor-pointer" href="/login">
            Login
          </Link>
          &nbsp; to Access This Page
        </p>
      }
    >
      <div className="layout">{children}</div>
    </AuthGuard>

    <style global jsx>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
      }
    `}</style>
  </div>
);

export default Layout;
