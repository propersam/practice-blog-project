import LoginComponent from "@/components/auth/Login";
import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoginFields } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { login, loading: isLoading } = useAuth();

  const onSubmit = async (payload: LoginFields) => {
    await login(payload).then((resp) => {
      if (resp) router.push("/");
    });
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Login Page</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <AuthLayoutComponent>
        <LoginComponent loading={isLoading} onSubmit={onSubmit} />
      </AuthLayoutComponent>
    </>
  );
}
