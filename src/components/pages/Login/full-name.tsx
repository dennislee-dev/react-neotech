import React, { useState } from "react";
import { css } from "@emotion/react";

const FullnamePage = () => {
  const [name, setInput] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const isNameError = name === "";

  const mtCss = css({
    marginTop: "27px",
  });

  const handleNextClick = () => {
    localStorage.setItem("name", JSON.stringify("name"));
    window.location.href = "/birth-date";
  };

  return (
    <>
      <button onClick={() =>handleNextClick()}>Next</button>
    </>
  );
};

export default FullnamePage;
