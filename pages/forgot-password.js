import React, { useState } from "react";
import FormCard from "../components/FormCard";
import Button from "../components/Button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { BsArrowLeft } from "react-icons/bs";
import { newRequest } from "../config/firebase/functions";
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [more, setMore] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) return setEmailError("Email is required");
    setLoading(true);
    try {
      const result = await resetPassword(email);
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
      label: "Account Email",
      value: email,
      setValue: setEmail,
      error: emailError,
      type: "email",
      placeholder: "test@gmail.com",
      minLength: 3,
    },
  ];

  return (
    <div className="center bg-black min-h-screen w-full font-player">
      {submitted ? (
        <FormCard noDark title="Thanks!" elements={[]}>
          <div className=" text-center">
            <h1 className="text-black font-medium text-[1.3em]">
              Check your email for instructions to reset your password!
            </h1>
            <div className="mt-3">
              <Button label="Return" href="/" type="link" />
            </div>
          </div>
        </FormCard>
      ) : (
        <FormCard
          noDark
          title="Forgot Password"
          elements={formElements}
          options={[
            {
              label: "Log in",
              href: "/login",
            },
            {
              label: "Create an account",
              href: "/signup",
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

export default ForgotPass;
