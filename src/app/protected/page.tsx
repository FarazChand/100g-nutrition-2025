import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <div>Access Denied</div>;
  }

  return <div>Hello {session.user.email}, you're signed in!</div>;
}
