import RegisterComponent from "@/components/auth/Register";
import AuthLayoutComponent from "@/components/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
// import { useFetchCities } from "@/hooks/useDataFetch";
import { RegistrationFields } from "@/types";
import { useRouter } from "next/router";
import { ReactFragment } from "react";


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

  return <RegisterComponent cities={cities} loading={isLoading} onSubmit={onSubmit} />
}

Register.getLayout = (page: ReactFragment) => (
  <AuthLayoutComponent
    meta={{
      description: "",
      icon: "",
      title: "Sign-Up",
    }}
  >
    {page}
  </AuthLayoutComponent>
);
