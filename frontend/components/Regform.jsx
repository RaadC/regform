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
      .required("*enter first name")
      .min(2)
      .max(20),
    lastname: yup
      .string()
      .label("Last Name")
      .required("*enter last name")
      .min(2)
      .max(20),
    email: yup
      .string()
      .label("Email Address")
      .required("*enter email")
      .min(10)
      .max(150)
      .email("enter a correct email"),
    address: yup
      .string()
      .label("Address")
      .required("*enter address"),
    mobile: yup
      .string()
      .label("Mobile")
      .required("*enter mobile number")
      .min(11, "*enter correct mobile number")
      .max(11, "*enter correct mobile number"),
    status: yup.string().label("TUP Student").required("*enter yes or no"),
    message: yup.string().label("Message").required("*enter message"),
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
      <img className= {styles.img} src="tuplogo.png" />
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <h1>TUP Registration Form</h1>
        <div className={styles.row1}>
          <div className={styles.inputcontainerLeft}>
            <input className={styles.holder}
              type="text"
              placeholder="First Name"
              {...register("firstname", { required: true })}
            />
            <span>{errors.firstname?.message}</span>
          </div>
          <div className={styles.inputcontainerRight}>
            <input className={styles.holder}
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
            />
            <span>{errors.lastname?.message}</span>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.row2group}>
            <div className={styles.inputcontainerLeft}>
              <input className={styles.holder}
                type="text"
                placeholder="Email Address"
                {...register("email", { required: true })}
              />
              <span>{errors.email?.message}</span>
            </div>
            <div className={styles.inputcontainerLeft}>
              <input className={styles.holder}
                type="text"
                placeholder="Mobile Number"
                {...register("mobile", { required: true, maxLength: 10 })}
              />
              <span>{errors.mobile?.message}</span>
            </div>
          </div>
          <div className={styles.inputcontainerRight}>
            <textarea
              rows={4}
              cols={20}
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
            />
            <span>{errors.address?.message}</span>
          </div>
        </div>
        <div className={styles.row3}>
          <div className={styles.inputcontainerLeft}>
            <textarea
              rows={4}
              cols={20}
              type="text"
              placeholder="Why do you want to study here?"
              {...register("message", { required: true })}
            />
            <span>{errors.message?.message}</span>
          </div>
          <div className={styles.row3group}>
            <div className={styles.inputcontainerRight}>
              <select className= {styles.old}
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
            <div className={styles.inputcontainerRight}>
              <input
                className={styles.submitBtn}
                type="submit"
                name="submit"
                values="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
