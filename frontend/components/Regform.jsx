import { useState, React } from "react";
import Link from "next/link";
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
      <form>
        <div className={styles.abovefield}>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Mobile Number" />
          <input type="text" placeholder="Old TUP Student?" />
        </div>
        <div className={styles.belowfield}>
        <input type="text" placeholder="Why do you want to study here?" />
        </div>
        <input type="submit" name="submit" values="Submit" />
      </form>
    </div>
  );
}
