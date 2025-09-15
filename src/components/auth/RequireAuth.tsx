import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

export default async function RequireAuth({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // Or wherever your login page is
  }

  return <>{children}</>;
}
