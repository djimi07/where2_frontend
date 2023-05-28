import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
const schema = yup
  .object({
    phone: yup
      .string()
      .required("Phone is Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log(data);

    try {
      // const response = await axios("")
      if (data.phone === "1000000000") {
        const response = await axios.post(
          "https://where2llc.app/api/admin/login",
          {
            userMobile: data.phone,
            password: data.password,
          }
        );

        localStorage.setItem("token", response.data.token);

        dispatch(handleLogin(true));
        setTimeout(() => {
          window.location.href = `${window.location.origin}/add-owner`;
        }, 1500);
      } else {
        const response = await axios.post(
          "https://where2llc.app/api/login",
          {
            userMobile: data.phone,
            password: data.password,
          }
        );
        console.log(response);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("id", response.data.data.userId);

        dispatch(handleLogin(true));
        setTimeout(() => {
          // navigate("/profile");
          console.log(window.location)
          window.location.href = `${window.location.origin}/bar`;
        }, 1500);
      }
    } catch (error) {
      console.log("error", error)
      toast.error("Error Logging In", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // if (user) {
    //   console.log(user);
    //   // dispatch(handleLogin(true));
    //   // setTimeout(() => {
    //   //   navigate("/    // const user = users.find(
    //   //   (user) => user.email === data.email && user.password === data.password
    //   // );add-owner");
    //   // }, 1500);
    // } else {
    //   toast.error("Invalid credentials", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="phone"
        label="Phone"
        type="phone"
        placeholder="phone"
        register={register}
        error={errors.phone}
      />
      <Textinput
        name="password"
        label="Passwrod"
        type="password"
        register={register}
        placeholder="password"
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          style={{ color: "#5dba50" }}
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button
        className="btn btn-success block w-full text-center"
        style={{ backgroundColor: "#5dba50" }}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
