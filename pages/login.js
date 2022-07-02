import React, { useState } from "react";
import FormCard from "../components/FormCard";
import Button from "../components/Button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { localizedErrorMessage } from "../config/firebase/ErrorCode";
import { BsArrowLeft } from "react-icons/bs";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result?.error) {
        setEmailError("Email or passowrd incorrect");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setEmailError(localizedErrorMessage(err.code));
      console.log("Log in error", err.code);
    }
  };

  const formElements = [
    {
      label: "Email",
      value: email,
      setValue: setEmail,
      error: emailError,
      type: "email",
      placeholder: "ElonMusk69",
      minLength: 3,
    },
    {
      label: "Password",
      value: password,
      setValue: setPassword,
      error: passwordError,
      type: "password",
      placeholder: "sKu771sH",
    },
  ];

  return (
    <div className="center bg-black min-h-screen w-full font-player">
      <FormCard
        noDark
        title="Login"
        elements={formElements}
        options={[
          { label: "Return Home", href: "/" },
          { label: "Sign up", href: "/signup" },
        ]}
      >
        <div className="mt-3">
          <Button label={loading ? "Loading" : "Login"} onClick={handleLogin} />
        </div>
      </FormCard>
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

export default login;
