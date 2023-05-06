import RegisterComponent from "@/components/auth/Register";
import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
// import { useFetchCities } from "@/hooks/useDataFetch";
import { RegistrationFields } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  // const { cities } = useFetchCities();
  const cities: any[] = []; // empty, not used

  const { register, loading: isLoading } = useAuth();

  const onSubmit = async (payload: RegistrationFields) => {
    await register(payload).then((resp) => {
      if (resp) router.push("/");
    });
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Sign Up Page</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <AuthLayoutComponent>
        <RegisterComponent cities={cities} loading={isLoading} onSubmit={onSubmit} />
      </AuthLayoutComponent>
    </>
  );
}
