"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);

      if (res.ok) {
        setStatus("success");
        // Optionally redirect after delay
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router]);

  if (status === "loading") return <p>Verifying email...</p>;
  if (status === "success")
    return <p>Email verified! Redirecting to login...</p>;
  return <p>Invalid or expired verification link.</p>;
}
