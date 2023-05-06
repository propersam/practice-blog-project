import { LoginFields } from "@/types";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

// const inter = Inter({ subsets: ["latin"] });
interface LoginFormProps {
  onSubmit: (arg0: LoginFields) => Promise<void>;
  loading: boolean;
}

export default function Login({ onSubmit, loading }: LoginFormProps) {
  const loginSchema = yup.object({
    email: yup.string().email("Provide correct e-mail").required("Required"),
    password: yup.string().required("Required"),
  });

  const initialValues: LoginFields = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues,
    onSubmit: onSubmit,
  });

  return (
    <div className="w-full h-full relative pt-8">
      <div className="w-full h-5/6 flex flex-col justify-center items-center">
        <div className="w-3/5">
          <h2 className="text-[42px] text-headings font-bold leading-[42px] my-3">Login Page</h2>
          <form className="mt-22 w-full" onSubmit={formik.handleSubmit}>
            <h3 className="text-main text-[30px] font-bold mb-6">Enter Valid User Credentials</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="email"> Email </label>
              <input
                autoComplete={"email"}
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="email"
                name="email"
                onChange={formik.handleChange}
                placeholder={"Enter User Email"}
                type="email"
                value={formik.values.email}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["email"] && formik.errors["email"] && formik.errors.email} </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="password"> Password </label>
              <input
                autoComplete={"current-password"}
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="password"
                name="password"
                onChange={formik.handleChange}
                placeholder={"Enter User Password"}
                type="password"
                value={formik.values.password}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["password"] && formik.errors["password"] && formik.errors.password} </p>
            </div>

            <button className={`w-full py-2.5 rounded-full text-white font-semibold mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-main curosr-pointer"}`} type="submit">
              {!loading ? "Submit" : <span className="animate-pulse">Loading...</span>}
            </button>

            <p className="text-center text-[14px] text-placeholderColor mt-5">
              <Link href="#">Forgot Password ?</Link>
            </p>

            <p className="text-center font-semibold mt-6">
              &nbsp;
              <Link className="text-main duration-300 hover:underline" href="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
