import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactFragment, useState } from "react";


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

  return <SmsConfirmationPage loading={isLoading} onSubmit={onSubmit} stage={stage} />
}

SmsConfirmation.getLayout = (page: ReactFragment) => (
  <AuthLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "SMS-Verification",
    }}
  >
    {page}
  </AuthLayoutComponent>
);
