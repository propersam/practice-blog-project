import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/dist/client/router";
import React, { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
  readonly customText?: React.ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children, customText }) => {
  const { user: me, loading } = useCurrentUser();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <span className="animate-pulse text-xl">Loading...</span>
      </div>
    );
  }

  // if on login/register page
  if (router.pathname === "/login" || router.pathname === "/register") {
    // if authenticated
    if (me?.id) {
      // redirect to '/'
      router.push("/");
    }
    // else, proced to login/register page
    return <>{children}</>;
  }

  // user authenticated
  if (me?.id) {
    // // user phone not verified
    // if (!!me?.sms_verified_at === false && router.pathname !== "/confirm/sms") {
    //   router.push("/confirm/sms");
    //   return <>{}</>;
    // } else {
    // proceed with user verified
    return <>{children}</>;
    // }
  }
  // else { // this will auto redirect to login page if user is not authenticated
  //   router.push("/login");
  // }

  return (
    <section>
      <h2 className="text-center">Unauthorized</h2>
      <div className="text-center">{customText || "You don't have permission to access this page. Pleae contact an admin if you think something is wrong."}</div>
    </section>
  );
};

AuthGuard.defaultProps = {
  customText: null,
};
