import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link to="/add-owner">

    </Link>
  );
};

export default MobileLogo;
