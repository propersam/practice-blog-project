import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SmsConfirmation() {
  const router = useRouter();
  const [stage, setStage] = useState<"verified" | "unverified" | "code">("code");

  const SmsConfirmationPage = dynamic(() => import("../../../components/auth/Confirmation/sms/index"), {
    loading: () => <p>Loading...</p>,
  });

  const { verifySmsCode, loading: isLoading } = useAuth();

  const onSubmit = async (payload: { code: string }) => {
    const resp = await verifySmsCode(payload);
    // if no error
    if (resp) {
      setStage("verified");
      router.push("/");
    } else {
      setStage("unverified");
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title> Sms Confirmation Page </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <AuthLayoutComponent>
        <SmsConfirmationPage loading={isLoading} onSubmit={onSubmit} stage={stage} />
      </AuthLayoutComponent>
    </>
  );
}
