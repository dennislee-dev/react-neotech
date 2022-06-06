import React, { useState } from "react";
import { css } from "@emotion/react";
import bgImage from "../../../assets/image/login-bg.png";

const BirthdatePage = () => {
  const [birthday, setBirthday] = useState("");
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value);
  const isBirthdayError = birthday === "";

  const mtCss = css({
    marginTop: "27px",
  });

  const handleCompleteClick = () => {
    localStorage.setItem("birthday", JSON.stringify("birthday"));
    window.location.href = "/dashboard";
  };

  return (
    <>
      <button onClick={() => handleCompleteClick()}>Next</button>
    </>
  );
};

export default BirthdatePage;
