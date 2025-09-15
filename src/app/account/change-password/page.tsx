import dynamic from "next/dynamic";
import ChangePasswordForm from "./ChangePasswordForm";
import RequireAuth from "@/components/auth/RequireAuth";

// This prevents hydration mismatch since the page is a client component
// const ChangePasswordForm = dynamic(() => import("./form"), { ssr: false });

export default async function ChangePasswordPage() {
  return (
    <RequireAuth>
      <ChangePasswordForm />
    </RequireAuth>
  );
}
