/* eslint-disable react/no-unknown-property */
import Header from "@/components/organisms/Header";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";

// const inter = Inter({subsets: ['latin']})
// Dynamicaly import the AuthGuard component.
const AuthGuard = dynamic<{ children: ReactNode; readonly customText: React.ReactNode }>(() => import("../AuthGuard").then((mod) => mod.AuthGuard));


interface IMainLayout {
  children: ReactNode;
  meta: {
    title: string;
    icon: string;
    description: string;
  };
  data?: {
    ranking?: any;
    posts?: any[];
  } | null;
}

const MainLayoutComponent = ({ children, meta, data = null }: IMainLayout)  => {
  
  const { title, icon, description } = meta;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content={description || ""} name="description" />
        <title>BlogApp - {title || ""}</title>
        <link href={icon || "/favicon.ico"} rel="icon" />
      </Head>
      <main>
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
      </main>
      
    </>
  );
};


export default MainLayoutComponent;

MainLayoutComponent.defaultProps = {
  data: null,
};
