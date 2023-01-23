import { useState, React } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Regform.module.css";

export default function Form() {
  const RegisterSchema = yup.object().shape({
    firstname: yup
      .string()
      .label("First Name")
      .required("***")
      .min(2)
      .max(20),
    lastname: yup
      .string()
      .label("Last Name")
      .required("***")
      .min(2)
      .max(20),
    email: yup
      .string()
      .label("Email Address")
      .required("***")
      .min(10)
      .max(150)
      .email("***"),
    address: yup
      .string()
      .label("Address")
      .required("***")
      .min(10)
      .max(150),
    mobile: yup
      .string()
      .label("Mobile")
      .required("************")
      .matches(/09[0-9]{9}/, "************")
      .max(11, "***********"),
    status: yup
      .string()
      .label("TUP Student")
      .required("***"),
    message: yup
      .string()
      .label("Message")
      .required("***")
      .min(10)
      .max(250, "***"),
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
      "http://localhost:3001/registers",
      requestOptions
    );
    const jsonData = await response.json();

    alert(JSON.stringify(jsonData));
  };

  return (
    <div className={styles.container}>
      <h1>TUP Registration Form</h1>
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <div className={styles.abovefield}>
          <div className={styles.inputcontainerLeft}>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstname", { required: true })}
            />
            <span>{errors.firstname?.message}</span>
          </div>
          <div className={styles.inputcontainerRight}>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
            />
            <span>{errors.lastname?.message}</span>
          </div>
          <div className={styles.inputcontainerLeft}>
            <input type="text" placeholder="Email Address" {...register("email", { required: true })} />
            <span>{errors.email?.message}</span>
          </div>
          <div className={styles.inputcontainerRight}>
            <input type="text" placeholder="Mobile Number" {...register("mobile", { required: true, maxLength: 10})}/>
            <span>{errors.mobile?.message}</span>
          </div>
          <div className={styles.inputcontainerLeft}>
            <input type="text" placeholder="Address" {...register("address", { required: true })} />
            <span>{errors.address?.message}</span>
          </div>
          
          <div className={styles.inputcontainerRight}>
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
            <span>{errors.status?.message}</span>
          </div>
        </div>
        <div className={styles.belowfield}>
          <textarea type="text" placeholder="Why do you want to study here?" {...register("message", { required: true })}/>
          <span>{errors.message?.message}</span>
        </div>
        <input type="submit" name="submit" values="Submit" />
      </form>
    </div>
  );
}
