import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { ReactNode } from "react";

// Dynamicaly import the AuthGuard component.
const AuthGuard = dynamic<{ children: ReactNode; readonly customText: React.ReactNode }>(() => import("../AuthGuard").then((mod) => mod.AuthGuard));

const AuthLayoutComponent = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <section className="w-full h-screen font-body text-textColor">
      {/* <!-- FLEX CONTAINER --> */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-0">
        {/* <!-- RIGHT SECTION --> */}
        <div className="min-h-screen w-full bg-bgImage bg-cover bg-no-repeat">
          <div className="h-full w-full flex justify-center items-center">
            <Image alt="EcoCentar Logo" height="75" src="/assets/images/Logo.svg" width="250" />
          </div>
        </div>
        <AuthGuard
          // Our custom message to unauthorized users.
          customText={
            <p className="text-72 mb-24">
              You need to &nbsp;{" "}
              <span className="text-primary underline cursor-pointer" onClick={() => router.push("/login")}>
                Login
              </span>
              &nbsp; to Access This Page
            </p>
          }
        >
          {children}
        </AuthGuard>
      </div>
    </section>
  );
};

export default AuthLayoutComponent;
