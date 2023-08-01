import { useState, React } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Regform.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form() {
  const RegisterSchema = yup.object().shape({
    firstname: yup
      .string()
      .label("First Name")
      .required("*")
      .min(2, "* too short")
      .max(20, "* too long"),
    lastname: yup
      .string()
      .label("Last Name")
      .required("*")
      .min(2, "* too short")
      .max(20, "* too short"),
    email: yup
      .string()
      .label("Email Address")
      .required("*")
      .min(10, "* too short")
      .max(150, "* too long")
      .email("*incorrect"),
    address: yup.string().label("Address").required("*"),
    mobile: yup
      .string()
      .label("Mobile")
      .required("*")
      .min(11, "* too short")
      .max(11, "* too long"),
    status: yup.string().label("TUP Student").required("*"),
    message: yup.string().label("Message").required("*"),
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
      <div className={styles.headercontainer}>
        <img src="tuplogo.png" />
        <h1>TUPC Registration Form</h1>
      </div>
      <form
        className={styles.regform}
        onSubmit={handleSubmit((data) => submitForm(data))}
      >
        <div className={"form-group row mb-30"}>
          <div className={"form-group col"}>
            <label for="firstName">
              First Name <span>{errors.firstname?.message}</span>
            </label>
            <input
              className={"form-control form-control-lg"}
              id="firstName"
              type="text"
              {...register("firstname", { required: true })}
            />
          </div>
          <div className={"form-group col"}>
            <label for="lastName">
              Last Name <span>{errors.lastname?.message}</span>
            </label>
            <input
              className={"form-control form-control-lg"}
              id="lastName"
              type="text"
              {...register("lastname", { required: true })}
            />
          </div>
        </div>
        <div className={"form-group"}>
          <label for="email">
            Email Address <span>{errors.email?.message}</span>
          </label>
          <input
            className={"form-control form-control-lg"}
            id="email"
            type="text"
            {...register("email", { required: true })}
          />
        </div>
        <div className={"form-group"}>
          <label for="mobile">
            Mobile # <span>{errors.mobile?.message}</span>
          </label>
          <input
            className={"form-control form-control-lg"}
            id="mobile"
            type="text"
            {...register("mobile", { required: true, maxLength: 10 })}
          />
        </div>
        <div className={"form-group"}>
          <label for="address">
            Address <span>{errors.address?.message}</span>
          </label>
          <input
            className={"form-control form-control-lg"}
            id="address"
            type="text"
            {...register("address", { required: true })}
          />
        </div>
        <div className={"form-group"}>
          <label for="message">
            Message <span>{errors.message?.message}</span>
          </label>
          <textarea
            class="form-control form-control-lg"
            id="message"
            rows={4}
            cols={20}
            type="text"
            {...register("message", { required: true })}
          />
        </div>
        <div className={"form-group"}>
          <label for="selectOption">
            Old TUPC Student? <span>{errors.status?.message}</span>
          </label>
          <select
            className={"form-control form-control-lg w-50"}
            id="selectOption"
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
        <input
          className={"btn btn-primary btn-lg w-50"}
          type="submit"
          name="submit"
          values="Submit"
        />
      </form>
    </div>
  );
}
