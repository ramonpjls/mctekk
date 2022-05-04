import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  let Component = props.component;
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      console.log("protected was called");
    }
  });

  return (
    <>
      <Component />
    </>
  );
}

export default Protected;
