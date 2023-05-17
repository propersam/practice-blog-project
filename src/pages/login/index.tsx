import LoginComponent from "@/components/auth/Login";
import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoginFields } from "@/types";
import { useRouter } from "next/router";
import { ReactFragment } from "react";

export default function Login() {
  const router = useRouter();
  const { login, loading: isLoading } = useAuth();

  const onSubmit = async (payload: LoginFields) => {
    await login(payload).then((resp) => {
      if (resp) router.push("/");
    });
  };

  return <LoginComponent loading={isLoading} onSubmit={onSubmit} />
    
}

Login.getLayout = (page: ReactFragment) => (
  <AuthLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Login",
    }}
  >
    {page}
  </AuthLayoutComponent>
);
