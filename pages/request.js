import React, { useState } from "react";
import FormCard from "../components/FormCard";
import Button from "../components/Button";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { newRequest } from "../config/firebase/functions";
const Request = () => {
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [more, setMore] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) return setEmailError("Email is required");
    setLoading(true);
    try {
      const result = await newRequest(email, projectName, more);
      if (result?.error) {
        setEmailError("An error has occured");
        setLoading(false);
      } else {
        setLoading(false);
        return setSubmitted(true);
      }
    } catch (err) {
      console.log("Submit request error", err);
    }
  };

  const formElements = [
    {
      label: "Contact Email",
      value: email,
      setValue: setEmail,
      error: emailError,
      type: "email",
      placeholder: "ElonMusk69",
      minLength: 3,
    },
    {
      label: "Project Name",
      value: projectName,
      setValue: setProjectName,
      error: null,
      type: "text",
      placeholder: "BAYC",
    },
    {
      label: "Anything else?",
      value: more,
      setValue: setMore,
      error: null,
      type: "text",
      placeholder: "What's on your mind...",
    },
  ];

  return (
    <div className="center bg-blue-800 min-h-screen w-full">
      {submitted ? (
        <FormCard noDark title="Thanks!" elements={[]}>
          <div className=" text-center">
            <h1 className="text-black font-medium text-[1.3em]">
              Things are moving fast, but we will try our best to get in touch
              within 24 hours
            </h1>
            <div className="mt-3">
              <Button label="Return" href="/" type="link" />
            </div>
          </div>
        </FormCard>
      ) : (
        <FormCard
          noDark
          title="Request Access"
          elements={formElements}
          options={[
            {
              label: "Back Home",
              href: "/",
            },
          ]}
        >
          <div className="mt-3">
            <Button
              label={loading ? "Loading" : "Send"}
              onClick={handleSubmit}
            />
          </div>
        </FormCard>
      )}
      <Link href="/">
        <div className="absolute top-0 left-0 flex items-center text-white mt-4 ml-3 cursor-pointer group">
          <span className="text-[1.5em] mr-4 translate-x-2 group-hover:translate-x-0 transition-all">
            <BsArrowLeft />
          </span>
          <span className="group-hover:underline underline-offset-1">
            Return Home
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Request;
