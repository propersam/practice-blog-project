/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

interface SmsConfirmationPageProps {
  onSubmit: (arg0: { code: string }) => Promise<void>;
  stage: "verified" | "unverified" | "code";
  loading: boolean;
}

const SmsConfirmationComponent = ({ onSubmit, stage, loading }: SmsConfirmationPageProps) => {
  const smsVerifySchema = yup.object({
    code: yup.string().required("Required"),
  });

  const initialValues: { code: string } = {
    code: "",
  };

  const formik = useFormik({
    validationSchema: smsVerifySchema,
    initialValues,
    onSubmit: onSubmit,
  });

  const bgImageLinks: Record<"verified" | "unverified" | "code", string> = {
    code: "/assets/images/svgs/phone.svg",
    verified: "/assets/images/svgs/checked.svg",
    unverified: "/assets/images/svgs/red-circle.svg",
  };

  return (
    <div className="w-full h-full relative pt-8">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="mt-6 text-center">
          <h2 className="text-[30px] text-main font-bold leading-[42px]">Sms Confirmation Page</h2>

          <p className="text-[#272727] px-4">Phone needs to be confirmed</p>

          <div className="my-10 ml-8 relative">
            <img alt="Recycle background" className="" src="/assets/images/svgs/recycle.svg" />

            <div className="absolute top-16 left-28">
              <img alt="" src={bgImageLinks[stage]} />
            </div>
          </div>

          <form className="my-12 px-6" onSubmit={formik.handleSubmit}>
            {/** INPUT BOX */}
            <div className="flex flex-col gap-2">
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor placeholder:text-center"
                id="code"
                name="code"
                onChange={formik.handleChange}
                placeholder="Enter Confirmation code Sent to Phone"
                type="text"
                value={formik.values.code}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["code"] && formik.errors["code"] && formik.errors.code} </p>
            </div>

            {/** SUBMIT BUTTON */}
            <button className={`w-full py-2.5 rounded-full text-white font-semibold mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-main curosr-pointer"}`} type="submit">
              {!loading ? "Submit" : <span className="animate-pulse">Loading...</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SmsConfirmationComponent;
