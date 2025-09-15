"use client";

import { useState } from "react";

import { isValidEmail, isStrongPassword } from "@/lib/utils/validation";

type Status = "idle" | "success" | "error" | "loading";

export default function ResendPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage("Please enter a valid password.");
      setStatus("error");

      return;
    }

    setStatus("loading");

    const res = await fetch("/api/auth/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
    } else {
      if (data.error === "No matching pending record found") {
        setErrorMessage("An account with this email does not exist.");
      } else {
        setErrorMessage(data.error || "Something went wrong. Try again.");
      }

      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Resend Verification Email
      </h1>
      <form onSubmit={handleResend} className="space-y-4">
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
        {status === "success" && (
          <p className="text-sm text-green-600">
            Verification email sent! Please check your inbox.
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Resend Email"}
        </button>
      </form>
    </div>
  );
}
