import { useState, React } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Regform.module.css";

export default function Form() {
  const errMess = {
    req: "Please fill this out",
  };

  const RegisterSchema = yup.object().shape({
    firstname: yup
      .string()
      .label("First Name")
      .required(errMess.req)
      .min(2)
      .max(20),
    lastname: yup
      .string()
      .label("Last Name")
      .required(errMess.req)
      .min(2)
      .max(20),
    email: yup
      .string()
      .label("Email Address")
      .required(errMess.req)
      .min(10)
      .max(150)
      .email("Invalid Email Address"),
    address: yup
      .string()
      .label("Address")
      .required(errMess.req)
      .min(10)
      .max(150),
    mobile: yup
      .string()
      .label("Mobile")
      .required(errMess.req)
      .matches(/09[0-9]{9}/, "Mobile number is incorrect")
      .max(11, "Mobile number is too long"),
    status: yup
      .string()
      .label("TUP Student")
      .required("Old TUP Student is required"),
    message: yup
      .string()
      .label("Message")
      .required(errMess.req)
      .min(10)
      .max(250, "The max length of 250 characters in Message is reached"),
  });

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const SelectValidator = async (value) => {
    await trigger(["select"]);
  };

  const submitForm = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "http://localhost:3001/register",
      requestOptions
    );
    const jsonData = await response.json();

    alert(JSON.stringify(jsonData));
  };

  return (
    <div className={styles.container}>
      <h1>No recess</h1>
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <div className={styles.abovefield}>
          <div className={styles.inputcontainer}>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && errors.firstname.type === "required" && (
              <span>**</span>
            )}
          </div>
          <div className={styles.inputcontainer}>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && errors.lastname.type === "required" && (
              <span>**</span>
            )}
          </div>
          <div className={styles.inputcontainer}>
            <input type="text" placeholder="Email Address" {...register("email", { required: true })} />
            {errors.email && errors.email.type === "required" && (
              <span>**</span>
            )}
          </div>
          <div className={styles.inputcontainer}>
            <input type="text" placeholder="Address" {...register("address", { required: true })} />
            {errors.address && errors.address.type === "required" && (
              <span>**</span>
            )}
          </div>
          <div className={styles.inputcontainer}>
            <input type="text" placeholder="Mobile Number" {...register("mobile", { required: true })}/>
            {errors.mobile && errors.mobile.type === "required" && (
              <span>**</span>
            )}
          </div>
          <div className={styles.inputcontainer}>
            <select
              defaultValue=""
              {...register("status")}
              onChange={(e) => SelectValidator(e.target.value)}
            >
              <option value="" disabled>
                Old TUP Student?
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <div className={styles.belowfield}>
          <input type="text" placeholder="Why do you want to study here?" {...register("message", { required: true })}/>
          {errors.message && errors.mobile.message === "required" && (
            <span>**</span>
          )}
        </div>
        <input type="submit" name="submit" values="Submit" />
      </form>
    </div>
  );
}
