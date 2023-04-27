import React from "react";
import { isValidNewsletter } from "../utils";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const errors = isValidNewsletter();
  if (Object.keys(errors).length) {
    return errors;
  }

  return "Zapisałeś się na newsletter";
}
export default function Newslleter() {
  return <div>Newslleter</div>;
}
