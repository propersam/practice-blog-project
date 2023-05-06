import { City, RegistrationFields } from "@/types";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";

interface RegisterFormProps {
  onSubmit: (arg0: RegistrationFields) => Promise<void>;
  loading: boolean;
  cities: City[];
}

const RegisterComponent = ({ cities, onSubmit, loading }: RegisterFormProps) => {
  const registerationSchema = yup.object({
    email: yup.string().email("Provide correct e-mail").required("Required"),
    name: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    address: yup.string(),
    // city_id: yup.mixed().required("Required"),
  });

  const initialValues: RegistrationFields = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    // city_id: null,
  };

  const [agreed, setAgreed] = useState<boolean>(false);

  const formik = useFormik({
    validationSchema: registerationSchema,
    initialValues,
    onSubmit: onSubmit,
  });

  return (
    <div className="w-full h-full relative pt-8">
      <div className="w-full h-full flex flex-col items-center px-6 lg:px-0">
        <div>
          <form action="#" className="mt-8" onSubmit={formik.handleSubmit}>
            <h3 className="text-main text-[30px] font-bold mb-4">Registration Page</h3>

            {/** INPUT BOX */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">First Name</label>
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="name"
                name="name"
                onChange={formik.handleChange}
                placeholder="Enter First Name"
                type="text"
                value={formik.values.name}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["name"] && formik.errors["name"] && formik.errors.name} </p>
            </div>

            {/** INPUT BOX */}
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="lastname"
                name="lastname"
                onChange={formik.handleChange}
                placeholder="Enter Last Name"
                type="text"
                value={formik.values.lastname}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["lastname"] && formik.errors["lastname"] && formik.errors.lastname} </p>
            </div>

            {/** INPUT BOX */}
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="email">Email</label>
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="email"
                name="email"
                onChange={formik.handleChange}
                placeholder="Enter valid Email"
                type="text"
                value={formik.values.email}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["email"] && formik.errors["email"] && formik.errors.email} </p>
            </div>

            {/** INPUT BOX */}
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="address">Address</label>
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="address"
                name="address"
                onChange={formik.handleChange}
                placeholder="Enter Address"
                type="text"
                value={formik.values.address}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["address"] && formik.errors["address"] && formik.errors.address} </p>
            </div>

            {/** INPUT BOX */}
            {/* <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="city">City</label>
              <select
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="city_id"
                name="city_id"
                onChange={formik.handleChange}
                placeholder="Внесете го вашиот град на на живеење"
                value={formik.values.city_id ?? ""}
              >
                <option disabled value="">
                  Select a City from list
                </option>
                {cities.map((city) => (
                  <option key={city.id}> {city.name} </option>
                ))}
              </select>

              <p className="text-red-600 ml-1 h-4">{formik.touched["city_id"] && formik.errors["city_id"] && formik.errors.city_id} </p>
            </div> */}

            {/** INPUT BOX */}
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="phone">Phone</label>
              <input
                className="bg-transparent py-2 px-4 border border-borderColor rounded-md placeholder:text-placeholderColor"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                placeholder="Enter Valid Phone"
                type="text"
                value={formik.values.phone}
              />
              <p className="text-red-600 ml-1 h-4">{formik.touched["phone"] && formik.errors["phone"] && formik.errors.phone} </p>
            </div>

            <div className="text-center text-[12px] text-black mt-3 font-medium space-x-1">
              <input checked={agreed} id="agree" name="agree" onChange={($event) => setAgreed($event.target.checked)} type="checkbox" value={agreed ? 1 : 0} />
              <label htmlFor="agree">
                Се согласувам со
                <Link className="underline text-main" href="#">
                  политиката на приватност
                </Link>
                и{" "}
                <Link className="underline text-main" href="#">
                  условите
                </Link>{" "}
                на ЕкоЦентар97
              </label>
            </div>

            {/** SUBMIT BUTTON */}
            <button
              className={`w-full py-2 rounded-full text-white font-semibold mt-4 ${!agreed || loading ? "bg-gray-400 cursor-not-allowed" : "bg-main curosr-pointer"}`}
              disabled={!agreed}
              type="submit"
            >
              {!loading ? "Register" : <span className="animate-pulse">Processing</span>}
            </button>

            <p className="text-center font-semibold mt-6 mb-10">
              Немате акаунт?
              <Link className="text-main duration-300 hover:underline" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
