import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorLaundryForm() {
  const error = useRouteError();
  console.log("ERROR",error);
  return <div>{error.message}</div>;
}
