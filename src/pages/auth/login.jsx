import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

// image import
// import LogoWhite from "@/assets/images/logo/logo.svg";
import Logo from "@/assets/images/logo/logo-white.svg";
import Illustration from "@/assets/images/auth/bar.jpeg";

const login = () => {
  const [isDark] = useDarkMode(true);
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link to="/"></Link>
              <h1 style={{ color: "#5dba50" }}>
                Where2
                <span className="text-slate-800 dark:text-slate-400 font-bold"></span>
              </h1>
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src="https://where2llc.app/where_2/public/assets2/bar_initiate.jpeg"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/"></Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium" style={{ color: "#5dba50" }}>
                    Sign in
                  </h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account to start using Where2
                  </div>
                </div>
                <LoginForm />
              </div>
              <div className="auth-footer text-center">
                Copyright 2023, All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
